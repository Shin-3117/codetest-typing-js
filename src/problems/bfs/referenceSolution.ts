const referenceSolution = `globalThis.bfs = function bfs(graph, start) {
  if (!graph[start]) return [];
  const q = [start];
  const visited = new Set([start]);
  const order = [];

  while (q.length) {
    const node = q.shift();
    order.push(node);
    for (const next of graph[node] || []) {
      if (!visited.has(next)) {
        visited.add(next);
        q.push(next);
      }
    }
  }

  return order;
};`;

export default referenceSolution;
