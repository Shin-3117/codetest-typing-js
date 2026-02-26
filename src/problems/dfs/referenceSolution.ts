const referenceSolution = `globalThis.dfs = function dfs(graph, start) {
  if (!graph[start]) return [];
  const visited = new Set();
  const order = [];

  function walk(node) {
    visited.add(node);
    order.push(node);
    for (const next of graph[node] || []) {
      if (!visited.has(next)) {
        walk(next);
      }
    }
  }

  walk(start);
  return order;
};`;

export default referenceSolution;
