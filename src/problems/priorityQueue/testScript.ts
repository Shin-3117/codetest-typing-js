const testScript = `
const Heap = globalThis.Heap;
const PriorityQueue = globalThis.PriorityQueue;
assert(typeof Heap === 'function', 'Heap class must be defined');
assert(typeof PriorityQueue === 'function', 'PriorityQueue class must be defined');

try {
  const pq = new PriorityQueue();
  [4, 1, 3].forEach((n) => pq.enqueue(n));
  assert(pq.size() === 3, 'size should be 3');
  assert(pq.dequeue() === 1, 'default comparator should prioritize smaller numbers');
  assert(pq.peek() === 3, 'peek should expose current top item');
  assert(pq.heap instanceof Heap, 'PriorityQueue should wrap Heap instance');
  recordResult('default comparator', true);
} catch (err) {
  recordResult('default comparator', false, err instanceof Error ? err.message : String(err));
}

try {
  const pq = new PriorityQueue((a, b) => a.priority > b.priority);
  pq.enqueue({ id: 'a', priority: 1 });
  pq.enqueue({ id: 'b', priority: 9 });
  pq.enqueue({ id: 'c', priority: 4 });
  assert(pq.dequeue().id === 'b', 'custom comparator must be used');
  assert(pq.dequeue().id === 'c', 'ordering should remain valid after pop');
  recordResult('custom comparator', true);
} catch (err) {
  recordResult('custom comparator', false, err instanceof Error ? err.message : String(err));
}
`;

export default testScript;
