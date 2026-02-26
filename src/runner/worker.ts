/// <reference lib="webworker" />

import type { RunRequest, RunResponse, TestCaseResult } from './runnerTypes';

const ctx: DedicatedWorkerGlobalScope = self as DedicatedWorkerGlobalScope;

function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

ctx.onmessage = (event: MessageEvent<RunRequest>) => {
  const request = event.data;
  if (request.type !== 'RUN') {
    return;
  }

  const start = performance.now();
  const results: TestCaseResult[] = [];

  const recordResult = (name: string, passed: boolean, detail?: string) => {
    results.push({ name, passed, detail });
  };

  const assert = (condition: boolean, message: string) => {
    if (!condition) {
      throw new Error(message);
    }
  };

  let error: string | undefined;

  try {
    const evaluator = new Function(`"use strict";\n${request.code}`);
    evaluator();

    for (const symbol of request.requiredGlobals) {
      if (!(symbol in globalThis)) {
        throw new Error(`Required global symbol missing: globalThis.${symbol}`);
      }
    }

    const testExecutor = new Function('assert', 'recordResult', 'safeStringify', `"use strict";\n${request.testScript}`);
    testExecutor(assert, recordResult, safeStringify);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown execution error';
    error = message;
    if (results.length === 0) {
      results.push({ name: 'Runtime', passed: false, detail: message });
    }
  } finally {
    for (const symbol of request.requiredGlobals) {
      try {
        Reflect.deleteProperty(globalThis, symbol);
      } catch {
        // noop
      }
    }
  }

  const durationMs = Math.round(performance.now() - start);
  const passed = !error && results.length > 0 && results.every((result) => result.passed);

  const response: RunResponse = {
    type: 'RUN_RESULT',
    requestId: request.requestId,
    problemKey: request.problemKey,
    passed,
    durationMs,
    results,
    error,
  };

  ctx.postMessage(response);
};
