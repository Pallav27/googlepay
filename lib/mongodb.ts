import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in your .env file");
}

// Global cache for mongoose connection
const globalWithMongoose = global as unknown as {
    mongoose?: {
        conn: mongoose.Connection | null;
        promise: Promise<mongoose.Mongoose> | null;
    };
};

const cached = globalWithMongoose.mongoose ?? (globalWithMongoose.mongoose = { conn: null, promise: null });

export async function connectMongoDB() {
    if (cached.conn) {
        return cached.conn; // Return cached connection if it exists
    }

    if (!cached.promise) {
        // Create a new connection promise if it doesn't exist
        cached.promise = mongoose.connect(MONGODB_URI, {
            dbName: "authDB", // Specify the database name
        }).then((mongooseInstance) => {
            return mongooseInstance;
        });
    }

    // Await the connection promise and extract the connection object
    cached.conn = await cached.promise.then((mongooseInstance) => mongooseInstance.connection);
    return cached.conn;
}
