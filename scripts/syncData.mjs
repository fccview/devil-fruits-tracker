import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ObjectId } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const FRUITS_FILE = path.join(DATA_DIR, 'fruits.json');
const CHAPTERS_FILE = path.join(DATA_DIR, 'chapters.json');
const EPISODES_FILE = path.join(DATA_DIR, 'episodes.json');

const ONEPIECE_QL_URL = 'https://onepieceql.up.railway.app/graphql';
const ONEPIECE_API_URL = 'https://api.api-onepiece.com/v2';

async function fetchFromQL(query) {
    const response = await fetch(ONEPIECE_QL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
    });
    if (!response.ok) throw new Error(`QL API failed: ${response.status}`);
    return await response.json();
}

function extractChapterNumber(usageDebut) {
    const match = usageDebut.match(/Chapter (\d+)/);
    return match ? parseInt(match[1]) : 0;
}

async function syncFruits() {
    console.log('\n=== Syncing Fruits ===');
    const localData = JSON.parse(fs.readFileSync(FRUITS_FILE, 'utf8'));
    const maxLocalChapter = Math.max(...localData.map(f => extractChapterNumber(f.usageDebut)));
    console.log(`Latest fruit chapter in local data: ${maxLocalChapter}`);

    let page = 1;
    let hasNext = true;
    const newFruits = [];

    while (hasNext) {
        const query = `
            query {
                devilFruits(page: ${page}) {
                    info { next }
                    results {
                        englishName japaneseName type description 
                        usageDebut avatarSrc currentOwner previousOwner
                    }
                }
            }
        `;
        const data = await fetchFromQL(query);
        const results = data.data.devilFruits.results;

        for (const fruit of results) {
            const fruitChapter = extractChapterNumber(fruit.usageDebut || '');

            if (fruitChapter > maxLocalChapter && fruitChapter > 0) {
                newFruits.push({
                    _id: { $oid: new ObjectId().toString() },
                    avatarSrc: fruit.avatarSrc || "/images/fruits/default.jpg",
                    currentOwner: fruit.currentOwner || "N/A",
                    description: fruit.description || "",
                    englishName: fruit.englishName,
                    japaneseName: fruit.japaneseName || "",
                    previousOwner: fruit.previousOwner || "N/A",
                    type: fruit.type,
                    usageDebut: fruit.usageDebut || ""
                });
            }
        }

        hasNext = !!data.data.devilFruits.info.next;
        page = data.data.devilFruits.info.next || page + 1;
    }

    if (newFruits.length > 0) {
        newFruits.sort((a, b) => extractChapterNumber(a.usageDebut) - extractChapterNumber(b.usageDebut));

        const updatedData = [...localData, ...newFruits];
        fs.writeFileSync(FRUITS_FILE, JSON.stringify(updatedData, null, 2));
        console.log(`✓ Added ${newFruits.length} new fruits`);
        newFruits.forEach(f => console.log(`  - ${f.englishName} (${f.usageDebut})`));
    } else {
        console.log('✓ No new fruits found');
    }
}

async function syncChapters() {
    console.log('\n=== Syncing Chapters ===');
    const localData = JSON.parse(fs.readFileSync(CHAPTERS_FILE, 'utf8'));
    const latestLocalId = Math.max(...localData.map(c => c.id));
    console.log(`Latest local chapter: ${latestLocalId}`);

    try {
        const response = await fetch(`${ONEPIECE_API_URL}/chapters/en`);
        if (!response.ok) throw new Error(`API failed: ${response.status}`);

        const allChapters = await response.json();
        const newChapters = allChapters.filter(c => c.id > latestLocalId);

        if (newChapters.length > 0) {
            const updatedData = [...localData, ...newChapters];
            fs.writeFileSync(CHAPTERS_FILE, JSON.stringify(updatedData, null, 2));
            console.log(`✓ Added ${newChapters.length} new chapters (${latestLocalId + 1} to ${Math.max(...newChapters.map(c => c.id))})`);
        } else {
            console.log('✓ No new chapters found');
        }
    } catch (e) {
        console.error('✗ Chapter sync failed:', e.message);
    }
}

async function syncEpisodes() {
    console.log('\n=== Syncing Episodes ===');
    const localData = JSON.parse(fs.readFileSync(EPISODES_FILE, 'utf8'));
    const latestLocalId = Math.max(...localData.map(e => e.id));
    console.log(`Latest local episode: ${latestLocalId}`);

    try {
        const response = await fetch(`${ONEPIECE_API_URL}/episodes/en`);
        if (!response.ok) throw new Error(`API failed: ${response.status}`);

        const allEpisodes = await response.json();
        const newEpisodes = allEpisodes.filter(e => e.id > latestLocalId);

        if (newEpisodes.length > 0) {
            const updatedData = [...localData, ...newEpisodes];
            fs.writeFileSync(EPISODES_FILE, JSON.stringify(updatedData, null, 2));
            console.log(`✓ Added ${newEpisodes.length} new episodes (${latestLocalId + 1} to ${Math.max(...newEpisodes.map(e => e.id))})`);
        } else {
            console.log('✓ No new episodes found');
        }
    } catch (e) {
        console.error('✗ Episode sync failed:', e.message);
    }
}

async function main() {
    console.log('╔════════════════════════════════════════════════════════════╗');
    console.log('║                        One Piece Data Sync                 ║');
    console.log('╚════════════════════════════════════════════════════════════╝');

    try {
        await syncFruits();
        await syncChapters();
        await syncEpisodes();

        console.log('\n╔════════════════════════════════════════════════════════════╗');
        console.log('║                    ✓ Sync Complete!                       ║');
        console.log('╚════════════════════════════════════════════════════════════╝');
        console.log('\nNext steps:');
        console.log('  1. Run: yarn populate:fruits');
        console.log('  2. Run: yarn download:images (or handle manually)');
    } catch (error) {
        console.error('\n✗ Sync failed:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

main();
