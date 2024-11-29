// Importing MongoClient from MongoDB
import { MongoClient } from 'mongodb';

// Get the Mongo URI from environment variables
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('MONGO_URI is not defined in the environment variables');
  process.exit(1);
}

// Set up the MongoDB client
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('crypto');
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

const insertCoinData = async () => {
  const db = await connectToDatabase();
  const coinsCollection = db.collection('coins');

  const coinData = {
    symbol: 'BTCUSDT',
    name: 'Bitcoin USDT',
    description: 'A stablecoin pegged to the US Dollar.',
    price: 50000,
    marketCap: 900000000000,
    volume: 50000000000,
    supply: 19000000,
  };

  try {
    const result = await coinsCollection.insertOne(coinData);
    console.log('Data inserted successfully:', result);
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

insertCoinData();
