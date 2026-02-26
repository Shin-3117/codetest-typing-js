import type { AttemptRecord, BestStats } from '../storage/attempts';

type Props = {
  bestStats: BestStats;
  attempts: AttemptRecord[];
  onClearProblem: () => void;
  onClearAll: () => void;
};

export default function AttemptsPanel({ bestStats, attempts, onClearProblem, onClearAll }: Props) {
  return (
    <section className="rounded border border-slate-200 bg-white p-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-slate-800">Attempts</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClearProblem}
            className="rounded border border-slate-300 px-2 py-1 text-xs hover:bg-slate-100"
          >
            Clear Problem
          </button>
          <button
            type="button"
            onClick={onClearAll}
            className="rounded border border-rose-300 px-2 py-1 text-xs text-rose-700 hover:bg-rose-50"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="mt-2 text-xs text-slate-700">
        <p>Best time: {bestStats.bestTimeMs === null ? '-' : `${bestStats.bestTimeMs}ms`}</p>
        <p>Best WPM: {bestStats.bestWpm === null ? '-' : bestStats.bestWpm.toFixed(1)}</p>
      </div>

      <ul className="mt-3 max-h-56 space-y-1 overflow-auto text-xs">
        {attempts.map((attempt) => (
          <li key={attempt.id} className="rounded border border-slate-100 bg-slate-50 p-2 text-slate-700">
            {new Date(attempt.dateISO).toLocaleString()} | {attempt.passed ? 'PASS' : 'FAIL'} | {attempt.durationMs}ms |
            WPM {attempt.wpm.toFixed(1)}{attempt.invalidAttempt ? ' | INVALID(paste)' : ''}
          </li>
        ))}
        {attempts.length === 0 ? <li className="text-slate-500">No attempts yet.</li> : null}
      </ul>
    </section>
  );
}
