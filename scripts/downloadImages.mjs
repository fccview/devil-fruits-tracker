import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create downloads directory if it doesn't exist
const downloadDir = path.join(__dirname, '..', 'public', 'images');
fs.mkdirSync(downloadDir, { recursive: true });

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        // Skip if file already exists and has content
        if (fs.existsSync(filepath)) {
            const stats = fs.statSync(filepath);
            if (stats.size > 0) {
                console.log(`Skipping existing file: ${filepath}`);
                resolve(false); // Return false to indicate no new download
                return;
            }
        }

        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }

            const fileStream = fs.createWriteStream(filepath);
            response.pipe(fileStream);

            fileStream.on('finish', () => {
                fileStream.close();
                console.log(`Downloaded: ${filepath}`);
                resolve(true); // Return true to indicate successful download
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { }); // Delete the file if download failed
            reject(err);
        });
    });
}

async function fetchFromAPI(query) {
    const response = await fetch("https://onepieceql.up.railway.app/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    return await response.json();
}

async function downloadAllImages() {
    try {
        // Create subdirectories
        const fruitsDir = path.join(downloadDir, 'fruits');
        const charactersDir = path.join(downloadDir, 'characters');
        fs.mkdirSync(fruitsDir, { recursive: true });
        fs.mkdirSync(charactersDir, { recursive: true });

        let newDownloads = 0;
        let skipped = 0;
        let errors = 0;

        // Set to store unique owner names
        const owners = new Set();

        // Fetch fruits data and collect owners
        let page = 1;
        let hasNext = true;
        while (hasNext) {
            const query = `
        query {
          devilFruits(page: ${page}) {
            info {
              next
            }
            results {
              avatarSrc
              englishName
              currentOwner
              previousOwner
            }
          }
        }
      `;

            const data = await fetchFromAPI(query);
            const fruits = data.data.devilFruits.results;

            // Download fruit images and collect owners
            for (const fruit of fruits) {
                if (fruit.avatarSrc) {
                    const filename = path.basename(new URL(fruit.avatarSrc).pathname);
                    try {
                        const downloaded = await downloadImage(fruit.avatarSrc, path.join(fruitsDir, filename));
                        if (downloaded) {
                            newDownloads++;
                        } else {
                            skipped++;
                        }
                    } catch (err) {
                        console.error(`Error downloading fruit image: ${fruit.englishName}`, err);
                        errors++;
                    }
                }

                // Add owners to set
                if (fruit.currentOwner && fruit.currentOwner !== 'N/A') {
                    owners.add(fruit.currentOwner);
                }
                if (fruit.previousOwner && fruit.previousOwner !== 'N/A' && fruit.previousOwner !== 'Unknown') {
                    owners.add(fruit.previousOwner);
                }
            }

            hasNext = !!data.data.devilFruits.info.next;
            page++;
        }

        // Fetch and download character images only for Devil Fruit owners
        console.log(`\nFetching images for ${owners.size} Devil Fruit owners...`);
        for (const ownerName of owners) {
            const query = `
        query {
          characters(filter: { name: "${ownerName}" }) {
            results {
              avatarSrc
              englishName
            }
          }
        }
      `;

            const data = await fetchFromAPI(query);
            const characters = data.data.characters.results;

            for (const character of characters) {
                if (character.avatarSrc) {
                    const filename = path.basename(new URL(character.avatarSrc).pathname);
                    try {
                        const downloaded = await downloadImage(character.avatarSrc, path.join(charactersDir, filename));
                        if (downloaded) {
                            newDownloads++;
                        } else {
                            skipped++;
                        }
                    } catch (err) {
                        console.error(`Error downloading character image: ${ownerName}`, err);
                        errors++;
                    }
                }
            }
        }

        console.log('\nDownload Summary:');
        console.log(`New downloads: ${newDownloads}`);
        console.log(`Skipped (already exists): ${skipped}`);
        console.log(`Errors: ${errors}`);
        console.log(`Total Devil Fruit owners processed: ${owners.size}`);
        console.log('\nProcess completed!');

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

downloadAllImages(); 