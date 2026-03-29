const referenceSolution = `// 최대공약수 (GCD) - 유클리드 호제법
globalThis.gcd = function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  return b === 0 ? a : gcd(b, a % b);
};

// 최소공배수 (LCM)
globalThis.lcm = function lcm(a, b) {
  const x = Math.abs(a);
  const y = Math.abs(b);
  if (x === 0 || y === 0) return 0;
  return (x * y) / gcd(x, y);
};`;

export default referenceSolution;
