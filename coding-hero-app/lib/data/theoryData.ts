// Theory items data extracted from InterviewPrep.tsx
export interface TheoryItem {
  id: string;
  label: string;
  category: string;
  description?: string;
  slug?: string;
}

export const theoryItems: TheoryItem[] = [
  // Core Data Structures
  { id: 'ds-arrays', label: 'Arrays & Strings', category: 'Core Data Structures', description: 'Know common manipulations, slicing, frequency counting.', slug: 'data-structures/arrays-and-strings' },
  { id: 'ds-linkedlists', label: 'Linked Lists', category: 'Core Data Structures', description: 'Reverse, detect cycle, merge, pointer patterns.', slug: 'data-structures/linked-lists' },
  { id: 'ds-stacks-queues', label: 'Stacks & Queues', category: 'Core Data Structures', description: 'Use cases, monotonic stack, BFS queue usage.', slug: 'data-structures/stacks-and-queues' },
  { id: 'ds-trees', label: 'Trees & BST', category: 'Core Data Structures', description: 'Traversals (DFS/BFS), properties, reconstruction.', slug: 'data-structures/binary-trees-and-bst' },
  { id: 'ds-graphs', label: 'Graphs', category: 'Core Data Structures', description: 'Representations, BFS/DFS, topological sort.', slug: 'data-structures/graphs' },
  { id: 'ds-heaps', label: 'Heaps / Priority Queues', category: 'Core Data Structures', description: 'K problems, streaming, custom comparators.', slug: 'data-structures/heaps-and-priority-queues' },
  { id: 'ds-tries', label: 'Tries', category: 'Core Data Structures', description: 'Prefix operations, word search, autocomplete.', slug: 'data-structures/tries' },
  { id: 'ds-hash', label: 'Hash Maps / Sets', category: 'Core Data Structures', description: 'Counting, caching, two-sum style patterns.', slug: 'data-structures/hash-maps-and-sets' },

  // Algorithmic Patterns
  { id: 'alg-two-pointers', label: 'Two Pointers', category: 'Algorithm Patterns', description: 'Converging, sliding, partitioning variations.' },
  { id: 'alg-sliding-window', label: 'Sliding Window', category: 'Algorithm Patterns', description: 'Fixed vs expanding window, optimize with counts.' },
  { id: 'alg-binary-search', label: 'Binary Search Variants', category: 'Algorithm Patterns', description: 'Lower/upper bound, rotated arrays, on answer space.' },
  { id: 'alg-backtracking', label: 'Backtracking', category: 'Algorithm Patterns', description: 'Permutations, combinations, pruning strategies.' },
  { id: 'alg-dp', label: 'Dynamic Programming', category: 'Algorithm Patterns', description: '1D, 2D, subsequences, state compression.' },
  { id: 'alg-graph-traversal', label: 'Graph Traversal & Topo', category: 'Algorithm Patterns', description: 'Cycle detection, ordering, connectivity.' },
  { id: 'alg-greedy', label: 'Greedy Techniques', category: 'Algorithm Patterns', description: 'Intervals, scheduling, local optimal proofs.' },
  { id: 'alg-intervals', label: 'Interval Patterns', category: 'Algorithm Patterns', description: 'Merge, insert, choose non-overlapping.' },
  { id: 'alg-math-bits', label: 'Math & Bit Ops', category: 'Algorithm Patterns', description: 'Bit masking, parity, power checks.' },

  // System Design
  { id: 'sd-scalability', label: 'Scalability & Load', category: 'System Design', description: 'Horizontal vs vertical scaling, throughput vs latency.' },
  { id: 'sd-caching', label: 'Caching Strategies', category: 'System Design', description: 'Eviction policies, layers, consistency.' },
  { id: 'sd-databases', label: 'Database Modeling', category: 'System Design', description: 'Normalization, indexing, query patterns.' },
  { id: 'sd-sharding', label: 'Sharding & Replication', category: 'System Design', description: 'Leader/follower, partition keys, failover.' },
  { id: 'sd-messaging', label: 'Messaging & Queues', category: 'System Design', description: 'Pub/Sub vs queues, ordering, retries.' },
  { id: 'sd-consistency', label: 'Consistency & CAP', category: 'System Design', description: 'Trade-offs, eventual consistency, partition tolerance.' },
  { id: 'sd-availability', label: 'Fault Tolerance', category: 'System Design', description: 'Redundancy, circuit breakers, graceful degradation.' },
  { id: 'sd-observability', label: 'Observability', category: 'System Design', description: 'Metrics, tracing, structured logs.' },

  // Behavioral
  { id: 'beh-star', label: 'STAR Stories Prepared', category: 'Behavioral', description: '5+ concise stories: conflict, leadership, failure.' },
  { id: 'beh-strengths', label: 'Strengths & Weaknesses', category: 'Behavioral', description: 'Authentic, growth-oriented framing.' },
  { id: 'beh-team', label: 'Team Collaboration Example', category: 'Behavioral', description: 'Cross-functional cooperation, communication clarity.' },
  { id: 'beh-ownership', label: 'Ownership Example', category: 'Behavioral', description: 'Initiative, impact metrics, follow-through.' },
  { id: 'beh-failure', label: 'Failure & Learning', category: 'Behavioral', description: 'Resilience, actionable lessons.' },
  { id: 'beh-why-company', label: 'Why Company Answer', category: 'Behavioral', description: 'Tailored to mission, recent product insights.' },
  { id: 'beh-questions', label: 'Good Questions Prepared', category: 'Behavioral', description: 'Role clarity, team culture, success metrics.' },

  // Logistics
  { id: 'log-resume', label: 'Resume Polished', category: 'Logistics', description: 'Impact bullets, metrics, consistent formatting.' },
  { id: 'log-linkedin', label: 'LinkedIn Updated', category: 'Logistics', description: 'Aligned with resume, headline + summary.' },
  { id: 'log-github', label: 'GitHub Repos Clean', category: 'Logistics', description: 'Pinned projects, descriptive READMEs.' },
  { id: 'log-env', label: 'Dev Environment Ready', category: 'Logistics', description: 'Templates, snippets, testing utilities.' },
  { id: 'log-mock', label: 'Mock Interviews Done', category: 'Logistics', description: 'At least 3 technical + 2 behavioral.' },
  { id: 'log-schedule', label: 'Interview Scheduling Strategy', category: 'Logistics', description: 'Batching, buffer days, warm-ups.' },
  { id: 'log-rest', label: 'Sleep & Rest Plan', category: 'Logistics', description: 'Routine for peak cognitive performance.' },
];
