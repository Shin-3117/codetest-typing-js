const referenceSolution = `globalThis.UnionFind = class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(a, b) {
    a = this.find(a);
    b = this.find(b);

    if (a === b) {
      return false;
    }

    if (this.rank[a] < this.rank[b]) {
      [a, b] = [b, a];
    }

    this.parent[b] = a;
    if (this.rank[a] === this.rank[b]) {
      this.rank[a] += 1;
    }

    return true;
  }
};`;

export default referenceSolution;
