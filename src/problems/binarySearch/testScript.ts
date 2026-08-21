const testScript = `
const binarySearch = globalThis.binarySearch;
assert(typeof binarySearch === 'function', 'binarySearch function must exist');

try {
  const arr = [1, 3, 5, 7, 9, 11, 13];
  assert(binarySearch(arr, 1) === 0, 'binarySearch should find first element');
  assert(binarySearch(arr, 7) === 3, 'binarySearch should find middle element');
  assert(binarySearch(arr, 13) === 6, 'binarySearch should find last element');
  recordResult('find existing elements', true);
} catch (err) {
  recordResult('find existing elements', false, err instanceof Error ? err.message : String(err));
}

try {
  const arr = [1, 3, 5, 7, 9, 11, 13];
  assert(binarySearch(arr, 0) === -1, 'binarySearch should return -1 if target is smaller than min');
  assert(binarySearch(arr, 6) === -1, 'binarySearch should return -1 if target is between elements');
  assert(binarySearch(arr, 15) === -1, 'binarySearch should return -1 if target is greater than max');
  recordResult('not found cases', true);
} catch (err) {
  recordResult('not found cases', false, err instanceof Error ? err.message : String(err));
}

try {
  assert(binarySearch([], 5) === -1, 'binarySearch should return -1 for empty array');
  assert(binarySearch([42], 42) === 0, 'binarySearch should find element in single element array');
  assert(binarySearch([42], 10) === -1, 'binarySearch should return -1 if single element does not match');
  recordResult('edge cases (empty / single item)', true);
} catch (err) {
  recordResult('edge cases (empty / single item)', false, err instanceof Error ? err.message : String(err));
}

try {
  const arr = [-10, -5, 0, 2, 8, 15, 20];
  assert(binarySearch(arr, -10) === 0, 'binarySearch should handle negative numbers');
  assert(binarySearch(arr, -5) === 1, 'binarySearch should handle negative numbers');
  assert(binarySearch(arr, 0) === 2, 'binarySearch should handle zero');
  recordResult('array with negative numbers', true);
} catch (err) {
  recordResult('array with negative numbers', false, err instanceof Error ? err.message : String(err));
}
`;

export default testScript;
