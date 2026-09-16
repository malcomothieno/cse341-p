const { MongoClient } = require('mongodb');

let db;

async function connectToDatabase() {
  if (db) return db; // Avoid reconnecting if already connected

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    // Uses process.env.DB_NAME if set, otherwise defaults to 'contacts_db'
    db = client.db(process.env.DB_NAME || 'contacts_db'); 
    console.log('Connected to MongoDB successfully');
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    throw error;
  }
}

function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase first.');
  }
  return db;
}

module.exports = { connectToDatabase, getDatabase };