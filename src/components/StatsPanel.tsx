import type { LiveMetrics } from '../typingEngine';

type Props = {
  metrics: LiveMetrics;
  running: boolean;
};

export default function StatsPanel({ metrics, running }: Props) {
  return (
    <section className="rounded border border-slate-200 bg-white p-3">
      <h2 className="text-sm font-bold text-slate-800">Live Stats {running ? '(running)' : '(idle)'}</h2>
      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-700 md:grid-cols-3">
        <div>Elapsed: {(metrics.elapsedMs / 1000).toFixed(1)}s</div>
        <div>Typed: {metrics.typedLen}</div>
        <div>WPM: {metrics.wpm.toFixed(1)}</div>
        <div>CPM: {metrics.cpm.toFixed(1)}</div>
        <div>Backspaces: {metrics.backspaces}</div>
        <div>Paste: {metrics.pasteDetected ? 'Detected' : 'No'}</div>
      </div>
    </section>
  );
}
