const referenceSolution = `globalThis.Queue = class Queue {
  constructor() {
    this.items = [];
    this.head = 0;
  }

  enqueue(value) {
    this.items.push(value);
  }

  dequeue() {
    if (this.head >= this.items.length) return undefined;
    const value = this.items[this.head];
    this.head += 1;
    if (this.head > 32 && this.head * 2 > this.items.length) {
      this.items = this.items.slice(this.head);
      this.head = 0;
    }
    return value;
  }

  peek() {
    return this.head < this.items.length ? this.items[this.head] : undefined;
  }

  size() {
    return this.items.length - this.head;
  }
};`;

export default referenceSolution;
