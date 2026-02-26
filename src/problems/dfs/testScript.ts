const testScript = `
const dfs = globalThis.dfs;
assert(typeof dfs === 'function', 'dfs function must exist');

try {
  const graph = {
    A: ['B', 'C'],
    B: ['D', 'E'],
    C: ['F'],
    D: [],
    E: [],
    F: [],
  };
  const out = dfs(graph, 'A');
  assert(safeStringify(out) === '["A","B","D","E","C","F"]', 'DFS order mismatch for deterministic traversal');
  recordResult('dfs normal graph', true);
} catch (err) {
  recordResult('dfs normal graph', false, err instanceof Error ? err.message : String(err));
}

try {
  const out = dfs({}, 'A');
  assert(Array.isArray(out) && out.length === 0, 'Missing start should return empty array');
  recordResult('dfs missing start', true);
} catch (err) {
  recordResult('dfs missing start', false, err instanceof Error ? err.message : String(err));
}
`;

export default testScript;
