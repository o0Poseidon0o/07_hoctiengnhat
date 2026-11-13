import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET() {
  const start = Date.now();
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    return NextResponse.json({
      ok: true,
      db: db.databaseName,
      latencyMs: Date.now() - start,
    });
  } catch (err) {
    console.error('[GET /api/health] MongoDB ping failed:', err);
    return NextResponse.json(
      { ok: false, error: 'Database unavailable' },
      { status: 500 },
    );
  }
}

