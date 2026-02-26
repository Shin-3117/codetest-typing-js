const testScript = `
const Stack = globalThis.Stack;
assert(typeof Stack === 'function', 'Stack class must exist');

try {
  const s = new Stack();
  s.push('a');
  s.push('b');
  s.push('c');
  assert(s.peek() === 'c', 'peek should return last pushed item');
  assert(s.pop() === 'c', 'first pop should return c');
  assert(s.pop() === 'b', 'second pop should return b');
  assert(s.size() === 1, 'size should be 1 after two pops');
  recordResult('stack LIFO behavior', true);
} catch (err) {
  recordResult('stack LIFO behavior', false, err instanceof Error ? err.message : String(err));
}
`;

export default testScript;
