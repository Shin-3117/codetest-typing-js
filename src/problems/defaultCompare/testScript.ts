const testScript = `
const defaultCompare = globalThis.defaultCompare;
assert(typeof defaultCompare === "function", "defaultCompare function must exist");

const cases = [
  ["number 비교", [[-3, 2], [10, 2], [0, 0], [1.5, 1.25]], (a, b) => a - b],
  ["string 비교", [["apple", "banana"], ["banana", "apple"], ["same", "same"], ["", "a"], ["가", "나"]], (a, b) => a.localeCompare(b)],
  ["bigint 비교", [[1n, 2n], [2n, 1n], [3n, 3n], [9007199254740993n, 9007199254740992n], [-5n, -2n]], (a, b) => a < b ? -1 : a > b ? 1 : 0],
  ["Date 비교", [[new Date(0), new Date(1000)], [new Date(1000), new Date(0)], [new Date(0), new Date(0)]], (a, b) => a.getTime() - b.getTime()],
];

for (const [name, pairs, compare] of cases) {
  try {
    for (const [a, b] of pairs) {
      const actual = defaultCompare(a, b);
      assert(typeof actual === "number", "비교 결과는 number여야 합니다");
      assert(Math.sign(actual) === Math.sign(compare(a, b)), "비교 결과의 부호가 올바르지 않습니다");
    }
    recordResult(name, true);
  } catch (err) {
    recordResult(name, false, err instanceof Error ? err.message : String(err));
  }
}

try {
  const unsupportedPairs = [
    [1, "1"], ["1", 1], [1n, 1], [1, 1n],
    [new Date(0), 0], [0, new Date(0)],
    [true, false], [null, null], [undefined, undefined],
    [{}, {}], [[], []], [Symbol("a"), Symbol("b")],
  ];
  for (const [a, b] of unsupportedPairs) {
    let error;
    try {
      defaultCompare(a, b);
    } catch (err) {
      error = err;
    }
    assert(error instanceof TypeError, "지원하지 않거나 서로 다른 타입이면 TypeError를 던져야 합니다");
    assert(error.message === "Unsupported compare types", "오류 메시지가 올바르지 않습니다");
  }
  recordResult("지원하지 않는 타입 및 혼합 타입", true);
} catch (err) {
  recordResult("지원하지 않는 타입 및 혼합 타입", false, err instanceof Error ? err.message : String(err));
}
`;

export default testScript;
