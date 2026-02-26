# Codex Task: Build a React+TS "Coding Test Practice" app (from-scratch problems)

You are a senior frontend engineer. Build a GitHub Pages–deployable static web app for practicing JavaScript coding-test implementations (data structures & algorithms) quickly from scratch.

## Goal / Product Behavior

- The user selects a problem (e.g., generic Heap, BFS, DFS).
- The user writes the solution code from scratch (starter template only).
- The app runs tests in-browser and shows PASS/FAIL + failure details.
- The app records attempts locally (IndexedDB) with timing + typing metrics.
- Reference/Hint panel exists but can be toggled hidden.
- Deployment must be easy on GitHub Pages (Vite base path + GitHub Actions workflow).

## Tech Constraints

- React 18 + TypeScript
- Vite
- TailwindCSS (minimal UI is fine)
- Editor:
  - Prefer Monaco via @monaco-editor/react.
  - If Monaco workers/build become problematic in Vite/GitHub Pages, switch to CodeMirror 6 (React wrapper).
  - Provide two panes: left (reference/hints read-only viewer) and right (editable code editor).
- Must be static-site deployable on GitHub Pages.

## IMPORTANT: 코테형(from-scratch) 기준

This is NOT a typing game that matches typed text to a reference string.
Primary evaluation is TEST PASS/FAIL.
Typing metrics are secondary and used for training/analytics only.

## Project Structure (Required)

- index.html
- vite.config.ts (base: '/REPO_NAME/')
- src/
  - main.tsx
  - App.tsx
  - problems.ts // problem definitions (starterCode, tests, hints)
  - typingEngine.ts // typing/timing metrics engine (pure functions where possible)
  - runner/
    - worker.ts // web worker that executes submitted code + runs tests
    - runnerTypes.ts // types for messages/results
  - storage/
    - db.ts // IndexedDB setup (use idb or minimal wrapper)
    - attempts.ts // CRUD: save attempt, list attempts, clear per problem/all
  - components/
    - ProblemSelector.tsx
    - Editors.tsx // left hints viewer + right editor
    - StatsPanel.tsx
    - AttemptsPanel.tsx
    - ResultPanel.tsx
- .github/workflows/deploy.yml
- README.md
- tailwind.config.ts, postcss.config.cjs, etc. as needed

## Core Features (Must Have)

### 1) Problem selection

- Header dropdown to select a problem.
- Problems live in src/problems.ts (easy to add/replace).
- Include at least these keys (with meaningful starter templates + tests):
  Data Structures:
  - heapGeneric (generic comparator heap)
  - priorityQueue (wraps the generic heap)
  - queue
  - stack
    Algorithms:
  - bfs
  - dfs

You can add more, but at minimum these.

### 2) Heap requirement (VERY IMPORTANT)

In problems.ts, the heap solution must be generic:

- class Heap { constructor(compare) { ... } }
- compare(a,b) returns true when a has higher priority than b
- methods: size, peek, push, pop
- internals: \_up, \_down, \_swap, \_parent/\_left/\_right
  This Heap must work as min-heap or max-heap depending on compare.

PriorityQueue problem must wrap Heap:

- enqueue(value), dequeue(), peek(), size()
- allow passing comparator, and provide a default comparator.

### 3) Runner / Tests (Core)

- Execute user code and run tests in a Web Worker.
- Implement a robust timeout (e.g., 2000ms). If timeout, return a clear error.
- Tests must not require network.
- Use a simple assertion helper with readable failure messages.

#### Execution model (MANDATORY)

To avoid module/import issues, enforce global exports in starterCode:

- For each problem, the required symbol must be assigned to globalThis:
  Example:
  - globalThis.Heap = class Heap { ... }
  - globalThis.PriorityQueue = class PriorityQueue { ... }
  - globalThis.bfs = function bfs(...) { ... }

Runner will evaluate code, then read required symbol(s) from globalThis and run tests.

### 4) Typing / Timing Metrics (Secondary)

Implement src/typingEngine.ts:

- Start timer on first edit after pressing "Start"
- Track:
  - elapsedMs
  - typedLen (current code length)
  - WPM = (typedLen/5) / minutes
  - CPM = typedLen / minutes
  - backspaces count (capture via keydown in editor wrapper)
  - pasteDetected (detect paste event OR sudden large delta in editor change)
- Paste must NOT be blocked; but set invalidAttempt=true if detected.
- On submit, create an attempt record containing metrics + pass/fail.

Accuracy (코테형 정책):

- If a problem has referenceSolution, compute diff-based accuracy at submit:
  - correctChars = count where submitted[i] === reference[i] for i < min(len)
  - errors = count where submitted[i] exists and differs
  - accuracy = correctChars / max(submittedLen,1) \* 100
- If no referenceSolution, set accuracy=null and errors=null.

### 5) Local persistence (IndexedDB, NOT localStorage)

- Save attempt on each SUBMIT:
  - id (timestamp)
  - dateISO
  - problemKey
  - durationMs
  - wpm, cpm, backspaces
  - invalidAttempt (pasteDetected)
  - passed (boolean)
  - optional: accuracy/errors if referenceSolution exists
- Keep last 50 attempts per problemKey (delete older).
- UI shows:
  - best time (passed + valid only)
  - best WPM (passed + valid only)
  - recent attempts list (10 items)
- Provide “Clear Records” (per problem and/or all).

### 6) Minimal UI requirements (Tailwind OK)

Layout:

- Header: problem selector + Start/Reset + Submit
- Body: two columns
  - Left: Hints/Requirements panel (toggle show/hide)
  - Right: Editor (editable)
- Below or side:
  - Stats panel (live)
  - Result panel (PASS/FAIL + failure detail)
  - Attempts panel (best + recent + clear)

No fancy per-character coloring required.

### 7) Editor settings

For editable editor:

- disable autocomplete/suggestions as much as possible
- tab inserts 2 spaces
- monospaced font
- (optional) auto close brackets is OK

Monaco configuration:

- minimize “quick suggestions”, “parameter hints”, etc.
- ensure it works in Vite build + GH Pages.
  If Monaco workers become complex, switch to CodeMirror 6 and document the change.

### 8) GitHub Pages Deployment

- Vite config must use base: '/REPO_NAME/'
- Provide .github/workflows/deploy.yml to deploy dist on push to main using:
  - actions/setup-node
  - actions/configure-pages
  - actions/upload-pages-artifact
  - actions/deploy-pages
- README must explain:
  - set REPO_NAME in vite.config.ts
  - in GitHub repo Settings → Pages → Source: GitHub Actions
  - npm install / dev / build commands

## Quality Bar

- Code must run:
  - npm install
  - npm run dev
  - npm run build
- Keep code clean, typed, and modular.
- Ensure worker messaging types are correct.
- Provide meaningful sample tests (not trivial).
- Make problems easy to add: clear schema in problems.ts.

## Deliverable

Generate the complete project code for every file, with exact contents.
No pseudocode.
