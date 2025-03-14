'use server'

export async function fetchCharacter(name) {
  if (!name) return null;

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
    return data.data.characters.results[0] || null;
  } catch (error) {
    console.error('Error fetching character:', error);
    return null;
  }
} 