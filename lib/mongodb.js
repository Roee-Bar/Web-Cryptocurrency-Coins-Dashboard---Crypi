import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

let mongoClient;
let isMongoClientConnected = false;

const client = new MongoClient(process.env.MONGO_URI);

export const connectToDatabase = async () => {
  if (process.env.USE_MONGOOSE === 'true') {
    // Use Mongoose connection
    if (mongoose.connections[0].readyState) {
      return;
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } else {
    // Use MongoClient connection (for raw MongoDB queries)
    if (isMongoClientConnected) {
      return;
    }

    await client.connect();
    isMongoClientConnected = true;
  }
};
