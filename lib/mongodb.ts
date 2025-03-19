import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in your .env file");
}

// Global cache for mongoose connection
let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectMongoDB() {
    if (cached.conn) {
        return cached.conn; // Return cached connection if it exists
    }

    if (!cached.promise) {
        // Create a new connection promise if it doesn't exist
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: "authDB", // Specify the database name
        }).then((mongoose) => {
            return mongoose;
        });
    }

    // Await the connection promise and cache the connection
    cached.conn = await cached.promise;
    return cached.conn;
}