const testScript = `
const dijkstra = globalThis.dijkstra;
assert(typeof dijkstra === 'function', 'dijkstra function must exist');

try {
  const graph = {
    A: [['B', 4], ['C', 1]],
    B: [['D', 1]],
    C: [['B', 2], ['D', 5]],
    D: [],
  };
  const out = dijkstra(graph, 'A');
  assert(out.A === 0, 'Distance A should be 0');
  assert(out.B === 3, 'Distance B mismatch');
  assert(out.C === 1, 'Distance C mismatch');
  assert(out.D === 4, 'Distance D mismatch');
  recordResult('dijkstra basic graph', true);
} catch (err) {
  recordResult('dijkstra basic graph', false, err instanceof Error ? err.message : String(err));
}

try {
  const graph = {
    A: [['B', 2]],
    B: [],
    C: [['D', 1]],
    D: [],
  };
  const out = dijkstra(graph, 'A');
  assert(out.A === 0, 'Distance A should be 0');
  assert(out.B === 2, 'Distance B mismatch');
  assert(out.C === Infinity, 'Unreachable C should be Infinity');
  assert(out.D === Infinity, 'Unreachable D should be Infinity');
  recordResult('dijkstra unreachable nodes', true);
} catch (err) {
  recordResult('dijkstra unreachable nodes', false, err instanceof Error ? err.message : String(err));
}

try {
  const out = dijkstra({ A: [['B', 1]], B: [] }, 'Z');
  assert(safeStringify(out) === '{}', 'Missing start should return empty object');
  recordResult('dijkstra missing start', true);
} catch (err) {
  recordResult('dijkstra missing start', false, err instanceof Error ? err.message : String(err));
}

try {
  const graph = {
    A: [['B', 1]],
    B: [],
  };
  const snapshot = safeStringify(graph);
  dijkstra(graph, 'A');
  assert(safeStringify(graph) === snapshot, 'Input graph must not be mutated');
  recordResult('dijkstra does not mutate input', true);
} catch (err) {
  recordResult('dijkstra does not mutate input', false, err instanceof Error ? err.message : String(err));
}
`;

export default testScript;
