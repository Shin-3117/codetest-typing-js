const referenceSolution = `globalThis.floydWarshall = function floydWarshall(graph) {
  const V = graph.length;
  // 기존 그래프 복사 (원본 데이터 보존)
  const dist = Array.from({ length: V }, (_, i) => [...graph[i]]);

  // k: 거쳐가는 노드
  for (let k = 0; k < V; k++) {
    // i: 출발 노드
    for (let i = 0; i < V; i++) {
      // j: 도착 노드
      for (let j = 0; j < V; j++) {
        // i에서 k를 거쳐 j로 가는 경로가 기존 경로보다 짧으면 갱신
        if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
          }
        }
      }
    }
  }

  return dist;
};`;

export default referenceSolution;
