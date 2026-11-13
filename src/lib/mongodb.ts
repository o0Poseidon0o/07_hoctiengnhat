import { MongoClient, type Db } from 'mongodb';
import { attachDatabasePool } from '@vercel/functions';

const dbName = process.env.MONGODB_DB || 'tiengnhat';

declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * Lazy-initialized MongoDB client attached to Vercel Fluid Compute's pool
 * lifecycle so serverless instances reuse sockets and close idle ones cleanly.
 */
export function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Missing MONGODB_URI environment variable.');
  }

  if (!globalThis.__mongoClientPromise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
    attachDatabasePool(client);
    globalThis.__mongoClientPromise = client.connect();
  }

  return globalThis.__mongoClientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(dbName);
}

