"use server";
import clientPromise from "@/app/lib/mongodb";
import { DevilFruit, ServerCache, ViewType } from "@/app/types";

// Declare global augmentation for serverCache
declare global {
  var serverCache: ServerCache;
}

// Server-side cache object
if (!global.serverCache) {
  global.serverCache = {
    chapter: {},
    episode: {},
  };
}

const LATEST_CHAPTER = process.env.LATEST_CHAPTER
  ? Number(process.env.LATEST_CHAPTER)
  : 1142;

export async function fetchDevilFruits(
  number: number,
  type: ViewType
): Promise<DevilFruit[]> {
  const limitedNumber = Math.min(
    number,
    type === "chapter" ? LATEST_CHAPTER : Infinity
  );

  /**
   *  @todo: enable this in case you need to debug the cache.
   *  console.log('Cache status:', {
   *      cacheExists: !!global.serverCache[type][limitedNumber],
   *      requestedType: type,
   *      requestedNumber: limitedNumber,
   *      currentCache: global.serverCache
   *  });
   */

  // Check exact cache match first
  if (global.serverCache[type][limitedNumber]) {
    return global.serverCache[type][limitedNumber];
  }

  // Find nearest higher cached number
  const cachedNumbers = Object.keys(global.serverCache[type])
    .map(Number)
    .sort((a, b) => a - b);
  const nearestHigherNumber = cachedNumbers.find((n) => n >= limitedNumber);

  // If we find a higher cached number, we can use its data
  if (nearestHigherNumber) {
    // Filter the cached data to only include fruits up to the requested number
    const filteredFruits = global.serverCache[type][nearestHigherNumber].filter(
      (df) => {
        const match = df.usageDebut.match(/Chapter (\d+)/);
        if (!match) return false;
        const fruitChapter = parseInt(match[1], 10);
        return fruitChapter <= limitedNumber;
      }
    );

    // Cache the filtered results
    global.serverCache[type][limitedNumber] = filteredFruits;
    return filteredFruits;
  }

  try {
    const client = await clientPromise;
    const db = client.db("devil-fruits");
    const collection = db.collection("fruits");

    // Create a regex pattern for chapter number extraction
    const regexPattern =
      type === "chapter" ? `Chapter (\\d+)` : `Episode (\\d+)`;

    // Query fruits from MongoDB with chapter/episode filter
    let fruits = await collection
      .find({
        usageDebut: {
          $regex: regexPattern,
          $exists: true,
        },
      })
      .toArray();

    let fruitsArray: DevilFruit[] = fruits
      .map((fruit) => ({
        avatarSrc: fruit.avatarSrc,
        currentOwner: fruit.currentOwner,
        description: fruit.description,
        englishName: fruit.englishName,
        japaneseName: fruit.japaneseName,
        previousOwner: fruit.previousOwner,
        type: fruit.type,
        usageDebut: fruit.usageDebut,
        id: fruit._id.toString(),
        spoilers: fruit.spoilers,
        seraphim: fruit.seraphim,
      }))
      .filter((df) => {
        const match = df.usageDebut.match(new RegExp(regexPattern));
        if (!match) return false;
        const number = parseInt(match[1], 10);
        return number <= limitedNumber;
      });

    // Check if we need to fetch new data from API
    if (type === "chapter" && limitedNumber > LATEST_CHAPTER) {
      const requestedChapterExists = fruitsArray.some((f) => {
        const match = f.usageDebut.match(/Chapter (\d+)/);
        const chapterNum = match ? parseInt(match[1], 10) : 0;
        return chapterNum === limitedNumber;
      });

      if (!requestedChapterExists) {
        const newFruits = await fetchFromAPI(limitedNumber);
        if (newFruits.length > 0) {
          await collection.insertMany(newFruits, { ordered: false });
          fruitsArray = [...fruitsArray, ...newFruits];
        }
      }
    }

    const sortedFruits: DevilFruit[] = fruitsArray.sort((a, b) => {
      const getChapterNumber = (fruit) => {
        if (!fruit?.usageDebut) return Infinity;
        const match = fruit.usageDebut.match(/Chapter (\d+)/);
        return match ? parseInt(match[1], 10) : Infinity;
      };

      return getChapterNumber(a) - getChapterNumber(b);
    });

    // Store in server cache
    global.serverCache[type][limitedNumber] = sortedFruits;

    return sortedFruits;
  } catch (error) {
    console.error("Database operation failed:", error);
    return [];
  }
}

async function fetchFromAPI(number: number) {
  let page = 1;
  let fruits = [];
  let hasNext = true;

  while (hasNext) {
    const query = `
            query {
                devilFruits(page: ${page}) {
                    info {
                        next
                    }
                    results {
                        englishName
                        type
                        usageDebut
                        avatarSrc
                        description
                        currentOwner
                        previousOwner
                        japaneseName
                    }
                }
            }
        `;
    ``;

    const response = await fetch("https://onepieceql.up.railway.app/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();

    if (!data.data?.devilFruits?.results) {
      console.error("Invalid API response:", data);
      throw new Error("Unexpected API response structure");
    }

    const fetchedFruits = data.data.devilFruits.results.filter((df) => {
      if (!df.usageDebut) return false;
      const chapterMatch = df.usageDebut.match(/Chapter (\d+)/);
      if (!chapterMatch) return false;
      const chapterNumber = parseInt(chapterMatch[1], 10);
      return chapterNumber <= number;
    });

    fruits = fruits.concat(fetchedFruits);
    hasNext = !!data.data.devilFruits.info.next;
    page = data.data.devilFruits.info.next || page + 1;
  }

  return fruits;
}

export const returnLatestChapter = async (): Promise<string | undefined> => {
  return process.env.LATEST_CHAPTER;
};

export const returnLatestEpisode = async (): Promise<string | undefined> => {
  return process.env.LATEST_EPISODE;
};
