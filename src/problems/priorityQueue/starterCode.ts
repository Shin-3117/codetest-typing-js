const starterCode = `globalThis.Heap = class Heap {
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
    // TODO
  }

  pop() {
    // TODO
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
    // TODO
  }

  _down(i) {
    // TODO
  }
};

globalThis.PriorityQueue = class PriorityQueue {
  constructor(compare = (a, b) => a < b) {
    this.compare = compare;
    this.heap = new globalThis.Heap(compare);
  }

  size() {
    // TODO
  }

  enqueue(value) {
    // TODO
  }

  dequeue() {
    // TODO
  }

  peek() {
    // TODO
  }
};`;

export default starterCode;
