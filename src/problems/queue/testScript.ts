const testScript = `
const Queue = globalThis.Queue;
assert(typeof Queue === 'function', 'Queue class must exist');

try {
  const q = new Queue();
  q.enqueue(10);
  q.enqueue(20);
  q.enqueue(30);
  assert(q.dequeue() === 10, 'FIFO violation at first dequeue');
  assert(q.peek() === 20, 'peek should return next element');
  assert(q.size() === 2, 'size should reflect live items');
  assert(q.dequeue() === 20 && q.dequeue() === 30, 'ordering mismatch');
  assert(q.dequeue() === undefined, 'dequeue on empty queue should return undefined');
  recordResult('queue FIFO behavior', true);
} catch (err) {
  recordResult('queue FIFO behavior', false, err instanceof Error ? err.message : String(err));
}
`;

export default testScript;
