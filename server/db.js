// server/db.js
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = "eventApp";

let db;
async function connectDB() {
    await client.connect();
    db = client.db(dbName);
    console.log("✅ Connected to MongoDB");
}

function getDB() {
    return db;
}

module.exports = { connectDB, getDB };
