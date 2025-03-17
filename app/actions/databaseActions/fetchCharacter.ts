"use server";
import clientPromise from "@/app/lib/mongodb";
import { Character } from "@/app/types";

export async function fetchCharacter(name: string): Promise<Character | null> {
  if (!name) return null;

  try {
    const client = await clientPromise;
    const db = client.db("devil-fruits");
    const collection = db.collection("owners");

    const character = await collection.findOne({
      $or: [{ englishName: name }, { japaneseName: name }],
    });

    if (character) {
      const characterData = {
        affiliations: character.affiliations,
        age: character.age,
        avatarSrc: character.avatarSrc,
        birthday: character.birthday,
        bloodType: character.bloodType,
        bounty: character.bounty,
        debut: character.debut,
        description: character.description,
        devilFruitName: character.devilFruitName,
        englishName: character.englishName,
        japaneseName: character.japaneseName,
        origin: character.origin,
      };
      return characterData as Character;
    }

    const apiCharacter = await fetchCharacterFromAPI(name);
    if (apiCharacter) {
      // Remove any potential _id field before insertion
      const { _id, ...cleanApiCharacter } = apiCharacter;
      await collection.insertOne(cleanApiCharacter);
      return cleanApiCharacter;
    }

    return null;
  } catch (error) {
    console.error("Database operation failed:", error);
    return null;
  }
}

async function fetchCharacterFromAPI(name: string) {
  const query = `
    query {
      characters(filter: { name: "${name}" }) {
        results {
          affiliations
          age
          avatarSrc
          birthday
          bloodType
          bounty
          debut
          description
          devilFruitName
          englishName
          japaneseName
          origin
        }
      }
    }
  `;

  try {
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
    return data.data.characters.results[0] || null;
  } catch (error) {
    console.error("Error fetching character:", error);
    return null;
  }
}
