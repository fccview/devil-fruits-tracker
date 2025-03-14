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

      console.log('Fetched fruits:', data.data.devilFruits.results);

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
  return fruits.sort((a, b) => {
    const chapterA = parseInt(a.usageDebut.replace('Chapter ', ''), 10);
    const chapterB = parseInt(b.usageDebut.replace('Chapter ', ''), 10);
    return chapterA - chapterB;
  });
}
