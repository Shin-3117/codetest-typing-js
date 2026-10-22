const referenceSolution = `globalThis.Heap = class {
  constructor(compare = (a, b) => a - b) {
    this.cmp = compare;
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  push(value) {
    const h = this.heap;
    h.push(value);

    let i = h.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.cmp(h[i], h[p]) >= 0) break;
      [h[i], h[p]] = [h[p], h[i]];
      i = p;
    }
  }

  pop() {
    const h = this.heap;
    if (h.length === 0) return undefined;
    if (h.length === 1) return h.pop();

    const top = h[0];
    h[0] = h.pop();

    let i = 0;
    while (true) {
      let p = i;
      const l = i * 2 + 1;
      const r = i * 2 + 2;

      if (l < h.length && this.cmp(h[l], h[p]) < 0) p = l;
      if (r < h.length && this.cmp(h[r], h[p]) < 0) p = r;
      if (p === i) break;

      [h[i], h[p]] = [h[p], h[i]];
      i = p;
    }

    return top;
  }
};`

export default referenceSolution;
