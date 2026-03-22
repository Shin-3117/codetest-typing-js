const testScript = `
const permute = globalThis.permute;
assert(typeof permute === 'function', 'permute function must exist');

try {
  const out = permute([1, 2, 3]);
  assert(
    safeStringify(out) === '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]',
    'Permutation order mismatch for [1, 2, 3]'
  );
  recordResult('backtracking permutations of 3', true);
} catch (err) {
  recordResult('backtracking permutations of 3', false, err instanceof Error ? err.message : String(err));
}

try {
  const out = permute([7]);
  assert(safeStringify(out) === '[[7]]', 'Single-element input should return one permutation');
  recordResult('backtracking single element', true);
} catch (err) {
  recordResult('backtracking single element', false, err instanceof Error ? err.message : String(err));
}

try {
  const out = permute([]);
  assert(safeStringify(out) === '[[]]', 'Empty input should return one empty permutation');
  recordResult('backtracking empty input', true);
} catch (err) {
  recordResult('backtracking empty input', false, err instanceof Error ? err.message : String(err));
}

try {
  const nums = [4, 5, 6];
  const snapshot = safeStringify(nums);
  permute(nums);
  assert(safeStringify(nums) === snapshot, 'Input array must not be mutated');
  recordResult('backtracking does not mutate input', true);
} catch (err) {
  recordResult('backtracking does not mutate input', false, err instanceof Error ? err.message : String(err));
}
`;

export default testScript;
