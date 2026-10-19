const testScript = `
const parametricSearch = globalThis.parametricSearch;
assert(typeof parametricSearch === 'function', 'parametricSearch function must exist');

try {
  assert(parametricSearch(1, 20, (value) => value >= 7) === 7, 'should find the smallest satisfying value');
  assert(parametricSearch(1, 20, (value) => value >= 14) === 14, 'should search above the initial midpoint when needed');
  recordResult('minimum satisfying value', true);
} catch (err) {
  recordResult('minimum satisfying value', false, err instanceof Error ? err.message : String(err));
}

try {
  assert(parametricSearch(3, 20, () => true) === 3, 'should return left when every value satisfies check');
  assert(parametricSearch(3, 20, (value) => value >= 20) === 20, 'should include the right boundary');
  recordResult('inclusive boundaries', true);
} catch (err) {
  recordResult('inclusive boundaries', false, err instanceof Error ? err.message : String(err));
}

try {
  assert(parametricSearch(1, 20, () => false) === -1, 'should return -1 when no value satisfies check');
  assert(parametricSearch(1, 20, (value) => value >= 21) === -1, 'should not search outside the given range');
  recordResult('no satisfying value', true);
} catch (err) {
  recordResult('no satisfying value', false, err instanceof Error ? err.message : String(err));
}

try {
  assert(parametricSearch(5, 5, () => true) === 5, 'should handle a satisfying single value');
  assert(parametricSearch(5, 5, () => false) === -1, 'should handle an unsatisfying single value');
  let calls = 0;
  const result = parametricSearch(5, 4, () => {
    calls += 1;
    return true;
  });
  assert(result === -1, 'should return -1 for an empty range');
  assert(calls === 0, 'should not call check for an empty range');
  recordResult('single value and empty range', true);
} catch (err) {
  recordResult('single value and empty range', false, err instanceof Error ? err.message : String(err));
}

try {
  assert(parametricSearch(-20, 20, (value) => value >= -6) === -6, 'should handle negative answers');
  assert(parametricSearch(-20, 20, (value) => value >= 0) === 0, 'should handle zero as the answer');
  assert(parametricSearch(0, 0, (value) => value >= 0) === 0, 'should handle a single zero');
  recordResult('negative values and zero', true);
} catch (err) {
  recordResult('negative values and zero', false, err instanceof Error ? err.message : String(err));
}

try {
  const weights = [7, 2, 5, 10, 8];
  const canShip = (capacity) => {
    let days = 1;
    let load = 0;
    for (const weight of weights) {
      if (weight > capacity) return false;
      if (load + weight > capacity) {
        days += 1;
        load = 0;
      }
      load += weight;
    }
    return days <= 2;
  };
  assert(parametricSearch(0, 32, canShip) === 18, 'should find the minimum capacity to ship within two days');
  recordResult('capacity decision problem', true);
} catch (err) {
  recordResult('capacity decision problem', false, err instanceof Error ? err.message : String(err));
}

try {
  let calls = 0;
  const result = parametricSearch(0, 1000000000, (value) => {
    calls += 1;
    assert(calls <= 31, 'should use logarithmically many check calls');
    assert(Number.isInteger(value) && value >= 0 && value <= 1000000000, 'should check integers within the given range');
    return value >= 765432109;
  });
  assert(result === 765432109, 'should find the answer in a large range');
  recordResult('large range with logarithmic checks', true);
} catch (err) {
  recordResult('large range with logarithmic checks', false, err instanceof Error ? err.message : String(err));
}
`;

export default testScript;
