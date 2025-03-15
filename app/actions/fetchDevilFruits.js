'use server'

// Server-side cache object
let serverCache = {
  chapter: {},
  episode: {}
};

export async function fetchDevilFruits(number, type) {
  // Add more detailed logging
  console.log('Cache status:', {
    cacheExists: !!serverCache[type][number],
    requestedType: type,
    requestedNumber: number,
    currentCache: serverCache
  });

  // Check exact cache match first
  if (serverCache[type][number]) {
    console.log('Cache hit for', type, number);
    return serverCache[type][number];
  }

  // Find nearest higher cached number
  const cachedNumbers = Object.keys(serverCache[type])
    .map(Number)
    .sort((a, b) => a - b);
  const nearestHigherNumber = cachedNumbers.find(n => n >= number);

  // If we find a higher cached number, we can use its data
  // since it contains all fruits up to that point
  if (nearestHigherNumber) {
    // Filter the cached data to only include fruits up to the requested number
    const filteredFruits = serverCache[type][nearestHigherNumber].filter(df => {
      const match = df.usageDebut.match(/Chapter (\d+)/);
      if (!match) return false;
      const fruitChapter = parseInt(match[1], 10);
      return fruitChapter <= number;
    });

    // Cache the filtered results
    serverCache[type][number] = filteredFruits;
    return filteredFruits;
  }

  // If we get here, we need to make an API call
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

    try {
      const response = await fetch('https://onepieceql.up.railway.app/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();

      if (!data.data?.devilFruits?.results) {
        console.error('Invalid API response:', data);
        throw new Error('Unexpected API response structure');
      }

      const fetchedFruits = data.data.devilFruits.results.filter(df => {
        if (!df.usageDebut) return false;

        // Extract chapter and episode numbers
        const chapterMatch = df.usageDebut.match(/Chapter (\d+)/);
        const episodeMatch = df.usageDebut.match(/Episode (\d+)/);

        if (!chapterMatch) return false;
        const chapterNumber = parseInt(chapterMatch[1], 10);

        if (type === 'chapter') {
          return chapterNumber <= number;
        } else {
          // Use actual episode number if available, otherwise skip
          if (!episodeMatch) return false;
          const episodeNumber = parseInt(episodeMatch[1], 10);
          return episodeNumber <= number;
        }
      });

      fruits = fruits.concat(fetchedFruits);
      hasNext = !!data.data.devilFruits.info.next;
      page = data.data.devilFruits.info.next || page + 1;

    } catch (error) {
      console.error('API fetch error:', error);
      break;
    }
  }

  // Sort fruits by debut chapter before returning
  const sortedFruits = fruits.sort((a, b) => {
    const chapterA = parseInt(a.usageDebut.replace('Chapter ', ''), 10);
    const chapterB = parseInt(b.usageDebut.replace('Chapter ', ''), 10);
    return chapterA - chapterB;
  });

  // Store in server cache
  serverCache[type][number] = sortedFruits;
  console.log('Updated cache with new data for', type, number);

  return sortedFruits;
}

// Optional: Add a function to clear cache if needed
export async function clearCache() {
  serverCache = {
    chapter: {},
    episode: {}
  };
}
