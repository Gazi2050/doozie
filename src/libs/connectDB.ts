import { MongoClient, ServerApiVersion, Db } from "mongodb";

let db: Db | null = null;

export const connectDB = async (): Promise<Db> => {
    if (db) return db;

    const uri = process.env.NEXT_PUBLIC_DB_URL;
    if (!uri) throw new Error("NEXT_PUBLIC_DB_URL is not defined");

    try {
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });

        await client.connect();
        db = client.db("doozie");
        return db;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw new Error("Database connection failed");
    }
};