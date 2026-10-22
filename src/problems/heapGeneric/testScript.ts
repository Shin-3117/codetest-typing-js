const testScript = `
const Heap = globalThis.Heap;
assert(typeof Heap === 'function', 'Heap class must be defined on globalThis');

try {
  const h = new Heap((a, b) => a - b);
  [5, 1, 3, 8, 2].forEach((v) => h.push(v));
  const out = [h.pop(), h.pop(), h.pop(), h.pop(), h.pop()];
  assert(safeStringify(out) === '[1,2,3,5,8]', 'Min-heap ordering mismatch');
  recordResult('min-heap ordering', true);
} catch (err) {
  recordResult('min-heap ordering', false, err instanceof Error ? err.message : String(err));
}

try {
  const h = new Heap((a, b) => b - a);
  [5, 1, 3, 8, 2].forEach((v) => h.push(v));
  assert(h.peek() === 8, 'peek() should return highest-priority element');
  const out = [h.pop(), h.pop(), h.pop()];
  assert(safeStringify(out) === '[8,5,3]', 'Max-heap ordering mismatch');
  recordResult('max-heap ordering', true);
} catch (err) {
  recordResult('max-heap ordering', false, err instanceof Error ? err.message : String(err));
}

try {
  const h = new Heap();
  assert(h.size() === 0, 'new heap should be empty');
  assert(h.peek() === undefined, 'empty peek() should return undefined');
  assert(h.pop() === undefined, 'empty pop() should return undefined');
  const values = [0, -3, 5, -3, 2, 0];
  values.forEach((v) => h.push(v));
  assert(h.size() === values.length, 'size() should include duplicate values');
  const out = values.map(() => h.pop());
  assert(safeStringify(out) === safeStringify(values.sort((a, b) => a - b)), 'Default comparator should match numeric sort');
  assert(h.size() === 0 && h.pop() === undefined, 'heap should be empty after draining');
  h.push(7);
  assert(h.peek() === 7 && h.pop() === 7 && h.size() === 0, 'heap should support reuse after draining');
  recordResult('default comparator and edge cases', true);
} catch (err) {
  recordResult('default comparator and edge cases', false, err instanceof Error ? err.message : String(err));
}

try {
  const compare = (a, b) => a.priority - b.priority;
  const h = new Heap(compare);
  const items = [{ priority: 4 }, { priority: 1 }, { priority: 1 }, { priority: 9 }];
  items.forEach((item) => h.push(item));
  const out = items.map(() => h.pop());
  assert(safeStringify(out.map((item) => item.priority)) === '[1,1,4,9]', 'Object comparator should order by priority');
  assert(new Set(out).size === items.length && out.every((item) => items.includes(item)), 'Equal-priority items should all be preserved');
  recordResult('object comparator and equal priorities', true);
} catch (err) {
  recordResult('object comparator and equal priorities', false, err instanceof Error ? err.message : String(err));
}
`;

export default testScript;
