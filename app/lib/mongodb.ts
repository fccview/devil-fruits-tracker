import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

const uri: string = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise: Promise<MongoClient>
}



client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;