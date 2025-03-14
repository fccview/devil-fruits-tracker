'use server'

export async function fetchDevilFruits(number, type) {
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
      
      console.log('API Response:', data);

      if (!data.data?.devilFruits?.results) {
        console.error('Invalid API response:', data);
        throw new Error('Unexpected API response structure');
      }

      const fetchedFruits = data.data.devilFruits.results.filter(df => {
        if (!df.usageDebut) return false;
        const debutNumber = parseInt(df.usageDebut.replace('Chapter ', ''), 10);
        if (isNaN(debutNumber)) return false;

        if (type === 'chapter') {
          return debutNumber <= number;
        } else {
          // Rough conversion from chapter to episode (approximate)
          const estimatedEpisode = Math.floor(debutNumber * 0.8); // Rough conversion rate
          return estimatedEpisode <= number;
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
  return fruits.sort((a, b) => {
    const chapterA = parseInt(a.usageDebut.replace('Chapter ', ''), 10);
    const chapterB = parseInt(b.usageDebut.replace('Chapter ', ''), 10);
    return chapterA - chapterB;
  });
}
