export type TestCaseResult = {
  name: string;
  passed: boolean;
  detail?: string;
};

export type RunRequest = {
  type: 'RUN';
  requestId: string;
  problemKey: string;
  code: string;
  requiredGlobals: string[];
  testScript: string;
  timeoutMs: number;
};

export type RunResponse = {
  type: 'RUN_RESULT';
  requestId: string;
  problemKey: string;
  passed: boolean;
  durationMs: number;
  results: TestCaseResult[];
  error?: string;
};
