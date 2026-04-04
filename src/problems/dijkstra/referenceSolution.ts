const referenceSolution = `globalThis.dijkstra = function dijkstra(graph, start) {
  if (!(start in graph)) {
    return {};
  }

  const distances = {};
  for (const node of Object.keys(graph)) {
    distances[node] = Infinity;
  }
  distances[start] = 0;

  const pq = [[0, start]];

  while (pq.length > 0) {
    let minIndex = 0;
    for (let i = 1; i < pq.length; i += 1) {
      if (pq[i][0] < pq[minIndex][0]) {
        minIndex = i;
      }
    }

    const [currentDist, node] = pq.splice(minIndex, 1)[0];
    if (currentDist !== distances[node]) {
      continue;
    }

    for (const [next, weight] of graph[node] || []) {
      if (!(next in distances)) {
        distances[next] = Infinity;
      }

      const candidate = currentDist + weight;
      if (candidate < distances[next]) {
        distances[next] = candidate;
        pq.push([candidate, next]);
      }
    }
  }

  return distances;
};`;

export default referenceSolution;
