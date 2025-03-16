import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import path from 'path';
import fs from 'fs';
config({ path: '.env.local' });
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}

async function populateOwners() {
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('devil-fruits');
        const collection = db.collection('owners');
        const dataPath = path.join(__dirname, 'data', 'owners.json');
        const ownersData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        const cleanedOwnersData = ownersData.map(owner => {
            const cleanedOwner = { ...owner };
            if (cleanedOwner._id && cleanedOwner._id.$oid) {
                delete cleanedOwner._id;
            }
            return cleanedOwner;
        });

        // Clear existing data
        await collection.deleteMany({});

        // Insert new data
        const result = await collection.insertMany(cleanedOwnersData);
        console.log(`Successfully inserted ${result.insertedCount} owners`);

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    } finally {
        await client.close();
    }
}

populateOwners(); 