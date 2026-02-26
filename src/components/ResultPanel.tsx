import type { RunResponse } from '../runner/runnerTypes';

type Props = {
  result: RunResponse | null;
};

export default function ResultPanel({ result }: Props) {
  if (!result) {
    return (
      <section className="rounded border border-slate-200 bg-white p-3">
        <h2 className="text-sm font-bold text-slate-800">Result</h2>
        <p className="mt-2 text-xs text-slate-600">No submission yet.</p>
      </section>
    );
  }

  return (
    <section className="rounded border border-slate-200 bg-white p-3">
      <h2 className="text-sm font-bold text-slate-800">Result</h2>
      <p className={`mt-2 text-sm font-bold ${result.passed ? 'text-emerald-700' : 'text-rose-700'}`}>
        {result.passed ? 'PASS' : 'FAIL'} ({result.durationMs}ms)
      </p>
      {result.error ? <p className="mt-1 text-xs text-rose-700">{result.error}</p> : null}
      <ul className="mt-2 space-y-1 text-xs text-slate-700">
        {result.results.map((item) => (
          <li key={item.name}>
            [{item.passed ? 'PASS' : 'FAIL'}] {item.name}
            {item.detail ? ` - ${item.detail}` : ''}
          </li>
        ))}
      </ul>
    </section>
  );
}
