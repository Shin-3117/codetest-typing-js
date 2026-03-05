const referenceSolution = `globalThis.kruskalMST = function kruskalMST(vertexCount, edges) {
  if (vertexCount <= 0) {
    return { totalWeight: 0, mstEdges: [] };
  }

  const parent = Array.from({ length: vertexCount }, (_, i) => i);
  const rank = Array(vertexCount).fill(0);

  function find(x) {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]); // path compression
    }
    return parent[x];
  }

  function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA === rootB) {
      return false;
    }

    // union by rank
    if (rank[rootA] < rank[rootB]) {
      parent[rootA] = rootB;
    } else if (rank[rootA] > rank[rootB]) {
      parent[rootB] = rootA;
    } else {
      parent[rootB] = rootA;
      rank[rootA] += 1;
    }

    return true;
  }

  const sortedEdges = [...edges].sort((a, b) => a[2] - b[2]);
  const mstEdges = [];
  let totalWeight = 0;

  for (const [u, v, weight] of sortedEdges) {
    if (union(u, v)) {
      mstEdges.push([u, v, weight]);
      totalWeight += weight;

      if (mstEdges.length === vertexCount - 1) {
        break;
      }
    }
  }

  return { totalWeight, mstEdges };
};`;

export default referenceSolution;
