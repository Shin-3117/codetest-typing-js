const testScript = `
const Heap = globalThis.Heap;
assert(typeof Heap === 'function', 'Heap class must be defined on globalThis');

try {
  const h = new Heap((a, b) => a < b);
  [5, 1, 3, 8, 2].forEach((v) => h.push(v));
  const out = [h.pop(), h.pop(), h.pop(), h.pop(), h.pop()];
  assert(safeStringify(out) === '[1,2,3,5,8]', 'Min-heap ordering mismatch');
  recordResult('min-heap ordering', true);
} catch (err) {
  recordResult('min-heap ordering', false, err instanceof Error ? err.message : String(err));
}

try {
  const h = new Heap((a, b) => a > b);
  [5, 1, 3, 8, 2].forEach((v) => h.push(v));
  assert(h.peek() === 8, 'peek() should return highest-priority element');
  const out = [h.pop(), h.pop(), h.pop()];
  assert(safeStringify(out) === '[8,5,3]', 'Max-heap ordering mismatch');
  recordResult('max-heap ordering', true);
} catch (err) {
  recordResult('max-heap ordering', false, err instanceof Error ? err.message : String(err));
}
`;

export default testScript;
