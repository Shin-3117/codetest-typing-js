# Coding Test Practice (React + TypeScript)

Static web app for coding-test practice with from-scratch implementations.

## Features

- Problem selector with data structure and algorithm tasks
- In-browser test runner on Web Worker (PASS/FAIL + details)
- Start/Reset/Submit workflow with timing/typing metrics
- Local attempt history in IndexedDB (per-problem cap: 50)
- Monaco editor first, CodeMirror fallback when Monaco cannot load
- GitHub Pages deployment workflow included

## Security Model

This app executes user code in a browser Web Worker with a timeout. It is not a strong sandbox.

- Intended for local learning use
- Worker isolation + execution timeout (default 2000ms)
- Tests are offline and do not require network
- No sensitive credentials should be entered

## Setup

```bash
npm install
npm run dev
npm run build
```

## GitHub Pages Deployment

1. Update `vite.config.ts` base from `/REPO_NAME/` to your repository path (for example `/data-structor_typing/`).
2. Push to `main` branch.
3. In GitHub repository settings:
   - Go to **Pages**
   - Set **Source** to **GitHub Actions**
4. Workflow `.github/workflows/deploy.yml` builds and deploys `dist` automatically.

## Monaco fallback

The editor tries Monaco first (`@monaco-editor/react`). If Monaco import fails in the runtime environment, UI switches to CodeMirror fallback automatically.
