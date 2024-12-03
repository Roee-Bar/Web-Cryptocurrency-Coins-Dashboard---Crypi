from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables from .env.local
load_dotenv(".env.local")

# Get the MONGO_URI from the environment
MONGO_URI = os.getenv("MONGO_URI")
USE_MONGOOSE = os.getenv("USE_MONGOOSE")  # Not directly used in this script but available

# Connect to MongoDB
try:
    client = MongoClient(MONGO_URI)
    db = client.get_database("Crypto")  # Specify your database name
    collection = db['coins']  # Collection name (matches Mongoose schema)

    # Example data to insert
    coin_data = {
        "symbol": "DOTUSDT",
        "name": "Polkadot",
        "description": "Polkadot is a next-generation blockchain platform that enables interoperability between different blockchains. Its unique architecture allows multiple blockchains to transfer messages and transactions seamlessly. DOT, its native cryptocurrency, is used for governance, staking, and bonding.",
    }

    # Insert the document
    result = collection.insert_one(coin_data)
    print(f"Data inserted with ID: {result.inserted_id}")
except Exception as e:
    print(f"Error: {e}")
finally:
    client.close()
