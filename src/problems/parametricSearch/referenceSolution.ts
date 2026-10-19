const referenceSolution = `globalThis.parametricSearch = function parametricSearch(left, right, check) {
  let answer = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (check(mid)) {
      answer = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return answer;
};`;

export default referenceSolution;
