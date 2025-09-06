// /lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // add this in .env.local
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Reuse connection in dev to avoid multiple connections
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In prod, create new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
