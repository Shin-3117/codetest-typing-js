const testScript = `
const gcd = globalThis.gcd;
const lcm = globalThis.lcm;

assert(typeof gcd === "function", "gcd function must exist");
assert(typeof lcm === "function", "lcm function must exist");

try {
  assert(gcd(48, 18) === 6, "gcd(48, 18) should be 6");
  assert(gcd(18, 48) === 6, "gcd should be commutative");
  assert(gcd(0, 15) === 15, "gcd(0, 15) should be 15");
  assert(gcd(0, 0) === 0, "gcd(0, 0) should be 0");
  assert(gcd(-24, 18) === 6, "gcd should return a non-negative value");
  recordResult("gcd cases", true);
} catch (err) {
  recordResult("gcd cases", false, err instanceof Error ? err.message : String(err));
}

try {
  assert(lcm(4, 6) === 12, "lcm(4, 6) should be 12");
  assert(lcm(21, 6) === 42, "lcm(21, 6) should be 42");
  assert(lcm(0, 9) === 0, "lcm with zero should be 0");
  assert(lcm(-8, 12) === 24, "lcm should return a non-negative value");
  assert(lcm(13, 17) === 221, "coprime numbers should multiply");
  recordResult("lcm cases", true);
} catch (err) {
  recordResult("lcm cases", false, err instanceof Error ? err.message : String(err));
}

try {
  assert(lcm(18, 24) === 72, "lcm should reuse gcd logic correctly");
  assert(gcd(18, 24) * lcm(18, 24) === Math.abs(18 * 24), "gcd*lcm identity mismatch");
  recordResult("gcd and lcm relationship", true);
} catch (err) {
  recordResult("gcd and lcm relationship", false, err instanceof Error ? err.message : String(err));
}
`;

export default testScript;
