import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Load .env.local file
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}

async function populateFruits() {
    const client = new MongoClient(process.env.MONGODB_URI);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('devil-fruits');
        const collection = db.collection('fruits');
        const dataPath = path.join(__dirname, 'data', 'fruits.json');
        const fruitsData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        const cleanedFruitsData = fruitsData.map(fruit => {
            const cleanedFruit = { ...fruit };
            if (cleanedFruit._id && cleanedFruit._id.$oid) {
                delete cleanedFruit._id; // Option 1: Remove _id
                // OR
                // cleanedFruit._id = cleanedFruit._id.$oid; // Option 2: Convert to string
            }
            return cleanedFruit;
        });

        // Clear existing data
        await collection.deleteMany({});

        // Insert new data
        const result = await collection.insertMany(cleanedFruitsData);
        console.log(`Successfully inserted ${result.insertedCount} fruits`);

    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    } finally {
        await client.close();
    }
}

populateFruits(); 