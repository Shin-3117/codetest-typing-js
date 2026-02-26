export type TypingSession = {
  armed: boolean;
  firstEditAt: number | null;
  typedLen: number;
  backspaces: number;
  pasteDetected: boolean;
  previousCode: string;
};

export type LiveMetrics = {
  elapsedMs: number;
  typedLen: number;
  wpm: number;
  cpm: number;
  backspaces: number;
  pasteDetected: boolean;
};

export type AccuracyMetrics = {
  accuracy: number | null;
  errors: number | null;
};

export function createSession(initialCode: string): TypingSession {
  return {
    armed: false,
    firstEditAt: null,
    typedLen: initialCode.length,
    backspaces: 0,
    pasteDetected: false,
    previousCode: initialCode,
  };
}

export function startSession(session: TypingSession): TypingSession {
  return {
    ...session,
    armed: true,
    firstEditAt: null,
  };
}

export function resetSession(initialCode: string): TypingSession {
  return createSession(initialCode);
}

export function applyEditorChange(
  session: TypingSession,
  nextCode: string,
  nowMs: number,
  isPasteEvent: boolean,
): TypingSession {
  const prevLen = session.previousCode.length;
  const nextLen = nextCode.length;
  const delta = nextLen - prevLen;
  const detectedPaste = isPasteEvent || delta >= 20;

  return {
    ...session,
    firstEditAt: session.armed && session.firstEditAt === null ? nowMs : session.firstEditAt,
    typedLen: nextLen,
    pasteDetected: session.pasteDetected || detectedPaste,
    previousCode: nextCode,
  };
}

export function computeLiveMetrics(session: TypingSession, nowMs: number): LiveMetrics {
  const elapsedMs = session.firstEditAt === null ? 0 : Math.max(0, nowMs - session.firstEditAt);
  const minutes = elapsedMs / 60000;
  const wpm = minutes > 0 ? (session.typedLen / 5) / minutes : 0;
  const cpm = minutes > 0 ? session.typedLen / minutes : 0;

  return {
    elapsedMs,
    typedLen: session.typedLen,
    wpm,
    cpm,
    backspaces: session.backspaces,
    pasteDetected: session.pasteDetected,
  };
}

export function computeAccuracy(submittedCode: string, referenceSolution?: string): AccuracyMetrics {
  if (!referenceSolution) {
    return { accuracy: null, errors: null };
  }

  const minLen = Math.min(submittedCode.length, referenceSolution.length);
  let correctChars = 0;
  let errors = 0;

  for (let i = 0; i < minLen; i += 1) {
    if (submittedCode[i] === referenceSolution[i]) {
      correctChars += 1;
    } else {
      errors += 1;
    }
  }

  if (submittedCode.length > referenceSolution.length) {
    errors += submittedCode.length - referenceSolution.length;
  }

  const accuracy = (correctChars / Math.max(submittedCode.length, 1)) * 100;
  return { accuracy, errors };
}
