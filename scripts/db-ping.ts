import { getDb, getMongoClient } from '../src/lib/mongodb.ts';

async function main() {
  const start = Date.now();
  const db = await getDb();
  const res = await db.command({ ping: 1 });
  const latencyMs = Date.now() - start;
  const collections = await db.listCollections().toArray();
  console.log(`MongoDB ping ok (${latencyMs}ms):`, res);
  console.log('Database:', db.databaseName);
  console.log('Existing collections:', collections.map((c) => c.name));
  const client = await getMongoClient();
  await client.close();
}

main().catch((err) => {
  console.error('MongoDB ping failed:', err);
  process.exit(1);
});

