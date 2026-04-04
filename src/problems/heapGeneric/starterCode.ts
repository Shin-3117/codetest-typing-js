const starterCode = `globalThis.Heap = class Heap {
  constructor(compare = (a, b) => a < b) {
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
    // TODO
  }

  pop() {
    // TODO
  }
};`;

export default starterCode;
