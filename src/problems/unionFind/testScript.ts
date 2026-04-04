const testScript = `
const UnionFind = globalThis.UnionFind;
assert(typeof UnionFind === 'function', 'UnionFind class must exist');

try {
  const uf = new UnionFind(5);
  for (let i = 0; i < 5; i++) {
    assert(uf.find(i) === i, 'Initially each element must be its own parent');
  }
  recordResult('unionFind init', true);
} catch (err) {
  recordResult('unionFind init', false, err instanceof Error ? err.message : String(err));
}

try {
  const uf = new UnionFind(6);
  assert(uf.union(0, 1) === true, 'First union(0,1) should merge');
  assert(uf.union(1, 2) === true, 'union(1,2) should merge');
  assert(uf.union(0, 2) === false, 'union(0,2) should detect same set');
  assert(uf.find(0) === uf.find(2), '0 and 2 must be connected');
  recordResult('unionFind basic union/find', true);
} catch (err) {
  recordResult('unionFind basic union/find', false, err instanceof Error ? err.message : String(err));
}

try {
  const uf = new UnionFind(8);
  uf.union(0, 1);
  uf.union(1, 2);
  uf.union(2, 3);

  const rootBefore = uf.find(0);
  uf.find(3); // trigger compression along chain if any
  const rootAfter = uf.find(3);

  assert(rootBefore === rootAfter, 'Path compression should keep same representative root');
  assert(uf.find(0) === uf.find(3), 'Nodes in same set must share root');
  recordResult('unionFind path compression', true);
} catch (err) {
  recordResult('unionFind path compression', false, err instanceof Error ? err.message : String(err));
}

try {
  const uf = new UnionFind(7);
  uf.union(0, 1);
  uf.union(2, 3);
  uf.union(4, 5);
  uf.union(1, 3);

  assert(uf.find(0) === uf.find(2), 'Sets {0,1} and {2,3} should merge');
  assert(uf.find(4) !== uf.find(0), '{4,5} should still be separate before final union');
  uf.union(3, 4);
  assert(uf.find(5) === uf.find(0), 'After final union all 0..5 should connect');
  assert(uf.find(6) !== uf.find(0), 'Unrelated singleton should remain separate');
  recordResult('unionFind multiple components', true);
} catch (err) {
  recordResult('unionFind multiple components', false, err instanceof Error ? err.message : String(err));
}
`;

export default testScript;
