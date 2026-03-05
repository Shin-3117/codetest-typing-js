const testScript = `
const kruskalMST = globalThis.kruskalMST;
assert(typeof kruskalMST === 'function', 'kruskalMST function must exist');

function isAcyclic(vertexCount, edges) {
  const parent = Array.from({ length: vertexCount }, (_, i) => i);

  function find(x) {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  }

  for (const [u, v] of edges) {
    const ru = find(u);
    const rv = find(v);
    if (ru === rv) {
      return false;
    }
    parent[ru] = rv;
  }

  return true;
}

try {
  const inputEdges = [
    [0, 1, 10],
    [0, 2, 6],
    [0, 3, 5],
    [1, 3, 15],
    [2, 3, 4],
  ];
  const out = kruskalMST(4, inputEdges);
  assert(out && typeof out === 'object', 'Result must be an object');
  assert(Array.isArray(out.mstEdges), 'mstEdges must be an array');
  assert(out.totalWeight === 19, 'MST totalWeight mismatch');
  assert(out.mstEdges.length === 3, 'Connected graph MST must have V-1 edges');
  assert(isAcyclic(4, out.mstEdges), 'mstEdges must not contain a cycle');
  recordResult('kruskal connected graph', true);
} catch (err) {
  recordResult('kruskal connected graph', false, err instanceof Error ? err.message : String(err));
}

try {
  const inputEdges = [
    [0, 1, 1],
    [1, 2, 2],
    [3, 4, 3],
  ];
  const out = kruskalMST(5, inputEdges);
  assert(out.totalWeight === 6, 'Disconnected graph should return minimum spanning forest weight');
  assert(out.mstEdges.length === 3, 'Expected 3 forest edges for disconnected case');
  assert(isAcyclic(5, out.mstEdges), 'Forest must remain acyclic');
  recordResult('kruskal disconnected graph', true);
} catch (err) {
  recordResult('kruskal disconnected graph', false, err instanceof Error ? err.message : String(err));
}

try {
  const inputEdges = [
    [0, 1, 1],
    [1, 2, 1],
    [2, 3, 1],
    [0, 3, 1],
    [0, 2, 2],
  ];
  const out = kruskalMST(4, inputEdges);
  assert(out.totalWeight === 3, 'Equal-weight case should still build minimum cost MST');
  assert(out.mstEdges.length === 3, 'MST must have V-1 edges');
  assert(isAcyclic(4, out.mstEdges), 'MST must not contain a cycle');
  recordResult('kruskal tie weights', true);
} catch (err) {
  recordResult('kruskal tie weights', false, err instanceof Error ? err.message : String(err));
}

try {
  const inputEdges = [
    [0, 1, 3],
    [1, 2, 1],
  ];
  const snapshot = safeStringify(inputEdges);
  kruskalMST(3, inputEdges);
  assert(safeStringify(inputEdges) === snapshot, 'Input edges must not be mutated');
  recordResult('kruskal does not mutate input', true);
} catch (err) {
  recordResult('kruskal does not mutate input', false, err instanceof Error ? err.message : String(err));
}

try {
  const out = kruskalMST(0, []);
  assert(out.totalWeight === 0, 'Empty graph total weight should be 0');
  assert(Array.isArray(out.mstEdges) && out.mstEdges.length === 0, 'Empty graph should return empty mstEdges');
  recordResult('kruskal empty graph', true);
} catch (err) {
  recordResult('kruskal empty graph', false, err instanceof Error ? err.message : String(err));
}
`;

export default testScript;
