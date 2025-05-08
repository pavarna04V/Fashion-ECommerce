const fs = require('fs');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// MongoDB connection URI from .env file
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function importData() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');
    
    // Get database name from connection string
    const dbName = uri.split('/').pop().split('?')[0];
    const db = client.db(dbName);
    
    // Read the db.json file
    const rawData = fs.readFileSync('db.json', 'utf8');
    const data = JSON.parse(rawData);
    
    // Create collections
    const collectionsToImport = ['products', 'orders', 'users'];
    
    for (const collectionName of collectionsToImport) {
      if (data[collectionName] && Array.isArray(data[collectionName])) {
        // Drop collection if it exists
        try {
          await db.collection(collectionName).drop();
          console.log(`Dropped existing ${collectionName} collection`);
        } catch (err) {
          // Collection might not exist, which is fine
          console.log(`Creating new ${collectionName} collection`);
        }
        
        // Insert data
        const result = await db.collection(collectionName).insertMany(data[collectionName]);
        console.log(`✅ ${result.insertedCount} ${collectionName} imported successfully`);
      } else {
        console.log(`⚠️ No ${collectionName} data found or data is not an array`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error importing data:', error);
  } finally {
    // Close the connection
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the import
importData();