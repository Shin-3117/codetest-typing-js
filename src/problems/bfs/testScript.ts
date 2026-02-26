const testScript = `
const bfs = globalThis.bfs;
assert(typeof bfs === 'function', 'bfs function must exist');

try {
  const graph = {
    A: ['B', 'C'],
    B: ['D'],
    C: ['E'],
    D: [],
    E: ['F'],
    F: [],
  };
  const out = bfs(graph, 'A');
  assert(safeStringify(out) === '["A","B","C","D","E","F"]', 'BFS order mismatch');
  recordResult('bfs normal graph', true);
} catch (err) {
  recordResult('bfs normal graph', false, err instanceof Error ? err.message : String(err));
}

try {
  const out = bfs({}, 'X');
  assert(Array.isArray(out) && out.length === 0, 'Missing start should return empty array');
  recordResult('bfs missing start', true);
} catch (err) {
  recordResult('bfs missing start', false, err instanceof Error ? err.message : String(err));
}
`;

export default testScript;
