import { getDB } from './db';

export type AttemptRecord = {
  id: number;
  dateISO: string;
  problemKey: string;
  durationMs: number;
  wpm: number;
  cpm: number;
  backspaces: number;
  invalidAttempt: boolean;
  passed: boolean;
  accuracy: number | null;
  errors: number | null;
};

export type BestStats = {
  bestTimeMs: number | null;
  bestWpm: number | null;
};

const MAX_PER_PROBLEM = 50;

export async function saveAttempt(record: AttemptRecord): Promise<void> {
  const db = await getDB();
  await db.put('attempts', record);
  await trimProblemAttempts(record.problemKey);
}

async function trimProblemAttempts(problemKey: string): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('attempts', 'readwrite');
  const index = tx.store.index('problemKey');
  const items = await index.getAll(problemKey);
  const sorted = [...items].sort((a, b) => b.id - a.id);

  const stale = sorted.slice(MAX_PER_PROBLEM);
  await Promise.all(stale.map((item) => tx.store.delete(item.id)));
  await tx.done;
}

export async function listRecentAttempts(problemKey: string, limit = 10): Promise<AttemptRecord[]> {
  const db = await getDB();
  const index = db.transaction('attempts').store.index('problemKey');
  const items = await index.getAll(problemKey);
  return items.sort((a, b) => b.id - a.id).slice(0, limit);
}

export async function getBestStats(problemKey: string): Promise<BestStats> {
  const db = await getDB();
  const index = db.transaction('attempts').store.index('problemKey');
  const items = await index.getAll(problemKey);

  const validPasses = items.filter((item) => item.passed && !item.invalidAttempt);
  if (validPasses.length === 0) {
    return { bestTimeMs: null, bestWpm: null };
  }

  const bestTimeMs = validPasses.reduce((best, item) => Math.min(best, item.durationMs), Number.POSITIVE_INFINITY);
  const bestWpm = validPasses.reduce((best, item) => Math.max(best, item.wpm), 0);
  return { bestTimeMs, bestWpm };
}

export async function clearProblemAttempts(problemKey: string): Promise<void> {
  const db = await getDB();
  const tx = db.transaction('attempts', 'readwrite');
  const index = tx.store.index('problemKey');
  let cursor = await index.openCursor(problemKey);

  while (cursor) {
    await cursor.delete();
    cursor = await cursor.continue();
  }

  await tx.done;
}

export async function clearAllAttempts(): Promise<void> {
  const db = await getDB();
  await db.clear('attempts');
}
