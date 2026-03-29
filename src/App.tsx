import { useEffect, useMemo, useState } from 'react';
import ProblemSelector from './components/ProblemSelector';
import Editors from './components/Editors';
import StatsPanel from './components/StatsPanel';
import ResultPanel from './components/ResultPanel';
import AttemptsPanel from './components/AttemptsPanel';
import { problems, problemMap } from './problems';
import type { RunRequest, RunResponse } from './runner/runnerTypes';
import {
  applyEditorChange,
  computeAccuracy,
  computeLiveMetrics,
  createSession,
  resetSession,
  startSession,
} from './typingEngine';
import { clearAllAttempts, clearProblemAttempts, getBestStats, listRecentAttempts, saveAttempt, type AttemptRecord, type BestStats } from './storage/attempts';

const DEFAULT_TIMEOUT = 2000;

async function runWithWorker(request: Omit<RunRequest, 'type'>): Promise<RunResponse> {
  const worker = new Worker(new URL('./runner/worker.ts', import.meta.url), { type: 'module' });

  return new Promise<RunResponse>((resolve) => {
    const timeoutId = window.setTimeout(() => {
      worker.terminate();
      resolve({
        type: 'RUN_RESULT',
        requestId: request.requestId,
        problemKey: request.problemKey,
        passed: false,
        durationMs: request.timeoutMs,
        results: [{ name: 'Timeout', passed: false, detail: `Execution timed out after ${request.timeoutMs}ms` }],
        error: `Execution timed out after ${request.timeoutMs}ms`,
      });
    }, request.timeoutMs);

    worker.onmessage = (event: MessageEvent<RunResponse>) => {
      const response = event.data;
      if (response.requestId !== request.requestId) return;
      window.clearTimeout(timeoutId);
      worker.terminate();
      resolve(response);
    };

    worker.postMessage({ ...request, type: 'RUN' satisfies RunRequest['type'] });
  });
}

function formatRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function App() {
  const [selectedProblemKey, setSelectedProblemKey] = useState(problems[0].key);
  const selectedProblem = problemMap[selectedProblemKey] ?? problems[0];

  const [code, setCode] = useState(selectedProblem.starterCode);
  const [session, setSession] = useState(createSession(selectedProblem.starterCode));
  const [result, setResult] = useState<RunResponse | null>(null);
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [bestStats, setBestStats] = useState<BestStats>({ bestTimeMs: null, bestWpm: null });
  const [showHints, setShowHints] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [clock, setClock] = useState(Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setClock(Date.now()), 400);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setCode(selectedProblem.starterCode);
    setSession(createSession(selectedProblem.starterCode));
    setResult(null);
  }, [selectedProblem]);

  async function refreshAttempts(problemKey: string): Promise<void> {
    const [recent, best] = await Promise.all([listRecentAttempts(problemKey, 10), getBestStats(problemKey)]);
    setAttempts(recent);
    setBestStats(best);
  }

  useEffect(() => {
    void refreshAttempts(selectedProblem.key);
  }, [selectedProblem.key]);

  const liveMetrics = useMemo(() => computeLiveMetrics(session, clock), [session, clock]);

  const onStart = () => {
    setSession((prev) => startSession(prev));
  };

  const onReset = () => {
    setCode(selectedProblem.starterCode);
    setSession(resetSession(selectedProblem.starterCode));
    setResult(null);
  };

  const onSubmit = async () => {
    setSubmitting(true);
    const response = await runWithWorker({
      requestId: formatRequestId(),
      problemKey: selectedProblem.key,
      code,
      requiredGlobals: selectedProblem.requiredGlobals,
      testScript: selectedProblem.testScript,
      timeoutMs: DEFAULT_TIMEOUT,
    });
    setResult(response);

    const now = Date.now();
    const metrics = computeLiveMetrics(session, now);
    const accuracyInfo = computeAccuracy(code, selectedProblem.referenceSolution);
    const record: AttemptRecord = {
      id: now,
      dateISO: new Date(now).toISOString(),
      problemKey: selectedProblem.key,
      durationMs: metrics.elapsedMs,
      wpm: metrics.wpm,
      cpm: metrics.cpm,
      backspaces: metrics.backspaces,
      invalidAttempt: metrics.pasteDetected,
      passed: response.passed,
      accuracy: accuracyInfo.accuracy,
      errors: accuracyInfo.errors,
    };

    await saveAttempt(record);
    await refreshAttempts(selectedProblem.key);
    setSubmitting(false);
  };

  const onClearProblem = async () => {
    await clearProblemAttempts(selectedProblem.key);
    await refreshAttempts(selectedProblem.key);
  };

  const onClearAll = async () => {
    await clearAllAttempts();
    await refreshAttempts(selectedProblem.key);
  };

  return (
    <main className="min-h-screen bg-slate-50 p-4 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-3">
        <header className="rounded border border-slate-200 bg-white p-3">
          <div className="flex flex-wrap items-center gap-2">
            <ProblemSelector problems={problems} selectedKey={selectedProblemKey} onSelect={setSelectedProblemKey} />
            <button
              type="button"
              onClick={onStart}
              className="rounded bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              Start
            </button>
            <button
              type="button"
              onClick={onReset}
              className="rounded border border-slate-300 px-3 py-1 text-xs font-semibold hover:bg-slate-100"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => void onSubmit()}
              disabled={submitting}
              className="rounded bg-blue-600 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {submitting ? 'Running...' : 'Submit'}
            </button>
          </div>
        </header>

        <Editors
          title={selectedProblem.title}
          description={selectedProblem.description}
          tags={selectedProblem.tags}
          hints={selectedProblem.hints}
          referenceSolution={selectedProblem.referenceSolution}
          code={code}
          showHints={showHints}
          onToggleHints={() => setShowHints((prev) => !prev)}
          onChangeCode={(next) => {
            setCode(next);
            setSession((prev) => applyEditorChange(prev, next, Date.now(), false));
          }}
          onBackspace={(count) => {
            if (count <= 0) return;
            setSession((prev) => ({ ...prev, backspaces: prev.backspaces + count }));
          }}
          onPaste={() => {
            setSession((prev) => ({ ...prev, pasteDetected: true }));
          }}
        />

        <section className="grid gap-3 lg:grid-cols-3">
          <StatsPanel metrics={liveMetrics} running={session.armed} />
          <ResultPanel result={result} />
          <AttemptsPanel
            bestStats={bestStats}
            attempts={attempts}
            onClearProblem={() => void onClearProblem()}
            onClearAll={() => void onClearAll()}
          />
        </section>
      </div>
    </main>
  );
}
