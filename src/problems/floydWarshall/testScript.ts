const testScript = `
const floydWarshall = globalThis.floydWarshall;
assert(typeof floydWarshall === 'function', 'floydWarshall function must exist');

try {
  const INF = Infinity;
  const graph = [
    [0, 5, INF, 10],
    [INF, 0, 3, INF],
    [INF, INF, 0, 1],
    [INF, INF, INF, 0],
  ];
  const out = floydWarshall(graph);
  assert(out[0][0] === 0, 'Distance 0 -> 0 should be 0');
  assert(out[0][1] === 5, 'Distance 0 -> 1 should be 5');
  assert(out[0][2] === 8, 'Distance 0 -> 2 should be 8 (0->1->2)');
  assert(out[0][3] === 9, 'Distance 0 -> 3 should be 9 (0->1->2->3)');
  assert(out[1][3] === 4, 'Distance 1 -> 3 should be 4 (1->2->3)');
  recordResult('floydWarshall basic graph', true);
} catch (err) {
  recordResult('floydWarshall basic graph', false, err instanceof Error ? err.message : String(err));
}

try {
  const INF = Infinity;
  const graph = [
    [0, 3, INF],
    [INF, 0, INF],
    [INF, 7, 0],
  ];
  const out = floydWarshall(graph);
  assert(out[0][2] === INF, 'Unreachable node 0 -> 2 should be Infinity');
  assert(out[1][0] === INF, 'Unreachable node 1 -> 0 should be Infinity');
  assert(out[2][1] === 7, 'Distance 2 -> 1 should be 7');
  recordResult('floydWarshall unreachable nodes', true);
} catch (err) {
  recordResult('floydWarshall unreachable nodes', false, err instanceof Error ? err.message : String(err));
}

try {
  const out = floydWarshall([[0]]);
  assert(out.length === 1 && out[0][0] === 0, 'Single node graph should return [[0]]');
  recordResult('floydWarshall single node', true);
} catch (err) {
  recordResult('floydWarshall single node', false, err instanceof Error ? err.message : String(err));
}

try {
  const INF = Infinity;
  const graph = [
    [0, 2],
    [INF, 0],
  ];
  const snapshot = safeStringify(graph);
  floydWarshall(graph);
  assert(safeStringify(graph) === snapshot, 'Input graph must not be mutated');
  recordResult('floydWarshall does not mutate input', true);
} catch (err) {
  recordResult('floydWarshall does not mutate input', false, err instanceof Error ? err.message : String(err));
}
`;

export default testScript;
