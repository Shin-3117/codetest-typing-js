import {
  starterCode as heapStarterCode,
  testScript as heapTestScript,
  referenceSolution as heapReferenceSolution,
} from "./problems/heapGeneric";
import {
  starterCode as priorityQueueStarterCode,
  testScript as priorityQueueTestScript,
  referenceSolution as priorityQueueReferenceSolution,
} from "./problems/priorityQueue";
import {
  starterCode as queueStarterCode,
  testScript as queueTestScript,
  referenceSolution as queueReferenceSolution,
} from "./problems/queue";
import {
  starterCode as stackStarterCode,
  testScript as stackTestScript,
  referenceSolution as stackReferenceSolution,
} from "./problems/stack";
import {
  starterCode as bfsStarterCode,
  testScript as bfsTestScript,
  referenceSolution as bfsReferenceSolution,
} from "./problems/bfs";
import {
  starterCode as dfsStarterCode,
  testScript as dfsTestScript,
  referenceSolution as dfsReferenceSolution,
} from "./problems/dfs";
import {
  starterCode as kruskalStarterCode,
  testScript as kruskalTestScript,
  referenceSolution as kruskalReferenceSolution,
} from "./problems/kruskal";
import {
  starterCode as unionFindStarterCode,
  testScript as unionFindTestScript,
  referenceSolution as unionFindReferenceSolution,
} from "./problems/unionFind";

export type ProblemDefinition = {
  key: string;
  title: string;
  description: string;
  hints: string[];
  starterCode: string;
  requiredGlobals: string[];
  testScript: string;
  referenceSolution?: string;
};

export const problems: ProblemDefinition[] =
  [
    {
      key: "heapGeneric",
      title: "Generic Heap",
      description:
        "Implement a generic binary heap with comparator. Must support min-heap and max-heap.",
      hints: [
        "Use compare(a,b) to decide priority. compare=true means a should be above b.",
        "push: append + bubble up, pop: swap root with last + bubble down.",
        "Maintain helpers _parent/_left/_right/_swap for clarity.",
      ],
      starterCode: heapStarterCode,
      requiredGlobals: ["Heap"],
      testScript: heapTestScript,
      referenceSolution:
        heapReferenceSolution,
    },
    {
      key: "queue",
      title: "Queue",
      description:
        "Implement FIFO queue with enqueue/dequeue/peek/size.",
      hints: [
        "Use array + head index for O(1) dequeue.",
        "Return undefined when removing from empty queue.",
      ],
      starterCode: queueStarterCode,
      requiredGlobals: ["Queue"],
      testScript: queueTestScript,
      referenceSolution:
        queueReferenceSolution,
    },
    {
      key: "priorityQueue",
      title: "Priority Queue via Heap",
      description:
        "Wrap generic Heap and expose enqueue/dequeue/peek/size.",
      hints: [
        "Implement Heap first or paste a working heap inside this file.",
        "PriorityQueue should compose Heap instead of reimplementing heap operations.",
        "Allow custom comparator in constructor and define a safe default comparator.",
      ],
      starterCode:
        priorityQueueStarterCode,
      requiredGlobals: [
        "Heap",
        "PriorityQueue",
      ],
      testScript:
        priorityQueueTestScript,
      referenceSolution:
        priorityQueueReferenceSolution,
    },
    {
      key: "stack",
      title: "Stack",
      description:
        "Implement LIFO stack with push/pop/peek/size.",
      hints: [
        "Array push/pop gives O(1) average stack operations.",
        "Return undefined when empty.",
      ],
      starterCode: stackStarterCode,
      requiredGlobals: ["Stack"],
      testScript: stackTestScript,
      referenceSolution:
        stackReferenceSolution,
    },
    {
      key: "bfs",
      title: "BFS Traversal",
      description:
        "Implement BFS for an adjacency-list graph. Return visit order array.",
      hints: [
        "Use queue and visited set.",
        "When start is missing in graph, return empty array.",
        "Process neighbors in listed order for deterministic result.",
      ],
      starterCode: bfsStarterCode,
      requiredGlobals: ["bfs"],
      testScript: bfsTestScript,
      referenceSolution:
        bfsReferenceSolution,
    },
    {
      key: "dfs",
      title: "DFS Traversal",
      description:
        "Implement DFS (iterative or recursive) for adjacency-list graph. Return visit order array.",
      hints: [
        "Use stack or recursion with visited set.",
        "For deterministic order, follow neighbor list left-to-right.",
      ],
      starterCode: dfsStarterCode,
      requiredGlobals: ["dfs"],
      testScript: dfsTestScript,
      referenceSolution:
        dfsReferenceSolution,
    },
    {
      key: "kruskal",
      title: "Kruskal MST (Union by Rank)",
      description:
        "Implement Kruskal's algorithm for MST using Union-Find with union by rank.",
      hints: [
        "Sort edges by weight ascending and add only edges that do not create a cycle.",
        "Use parent/rank arrays and path compression in find().",
        "Return both total weight and selected MST edges.",
      ],
      starterCode: kruskalStarterCode,
      requiredGlobals: ["kruskalMST"],
      testScript: kruskalTestScript,
      referenceSolution:
        kruskalReferenceSolution,
    },
    {
      key: "unionFind",
      title: "Union-Find (Disjoint Set Union)",
      description:
        "Implement Union-Find with path compression and union by rank.",
      hints: [
        "Initialize parent[i] = i and rank[i] = 0.",
        "find(x) should compress path to flatten trees.",
        "union(a, b) should merge by rank and return false when already connected.",
      ],
      starterCode: unionFindStarterCode,
      requiredGlobals: ["UnionFind"],
      testScript: unionFindTestScript,
      referenceSolution:
        unionFindReferenceSolution,
    },
  ];

export const problemMap =
  Object.fromEntries(
    problems.map((problem) => [
      problem.key,
      problem,
    ])
  );
