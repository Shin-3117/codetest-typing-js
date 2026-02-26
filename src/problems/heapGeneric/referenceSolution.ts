const referenceSolution = `globalThis.Heap = class Heap {
  constructor(compare) {
    this.compare = compare;
    this.data = [];
  }

  size() {
    return this.data.length;
  }

  peek() {
    return this.data[0];
  }

  push(value) {
    this.data.push(value);
    this._up(this.data.length - 1);
  }

  pop() {
    if (this.data.length === 0) return undefined;
    if (this.data.length === 1) return this.data.pop();
    const top = this.data[0];
    this.data[0] = this.data.pop();
    this._down(0);
    return top;
  }

  _parent(i) {
    return (i - 1) >> 1;
  }

  _left(i) {
    return i * 2 + 1;
  }

  _right(i) {
    return i * 2 + 2;
  }

  _swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }

  _up(i) {
    while (i > 0) {
      const p = this._parent(i);
      if (!this.compare(this.data[i], this.data[p])) break;
      this._swap(i, p);
      i = p;
    }
  }

  _down(i) {
    const n = this.data.length;
    while (true) {
      let best = i;
      const l = this._left(i);
      const r = this._right(i);
      if (l < n && this.compare(this.data[l], this.data[best])) best = l;
      if (r < n && this.compare(this.data[r], this.data[best])) best = r;
      if (best === i) break;
      this._swap(i, best);
      i = best;
    }
  }
};`;

export default referenceSolution;
