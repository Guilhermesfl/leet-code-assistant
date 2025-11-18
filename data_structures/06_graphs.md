# Graphs

## Overview

A graph is a collection of nodes (vertices) connected by edges. Graphs can represent networks, relationships, dependencies, and many other real-world structures.

## Types of Graphs

### By Edge Direction
- **Undirected** - Edges have no direction (bidirectional)
- **Directed (Digraph)** - Edges have direction (one-way)

### By Edge Weights
- **Weighted** - Edges have associated weights/costs
- **Unweighted** - All edges are equal

### By Connectivity
- **Connected** - Path exists between any two vertices
- **Disconnected** - Some vertices are unreachable
- **Strongly Connected** (directed) - Path exists in both directions between any two vertices

### Special Types
- **Cyclic** - Contains at least one cycle
- **Acyclic** - No cycles (DAG = Directed Acyclic Graph)
- **Tree** - Connected acyclic graph

## Graph Representations

### 1. Adjacency List
Most common for sparse graphs.

```python
# Dictionary-based
graph = {
    0: [1, 2],
    1: [0, 2, 3],
    2: [0, 1],
    3: [1]
}

# Using defaultdict
from collections import defaultdict
graph = defaultdict(list)
graph[0].append(1)
graph[0].append(2)

# List of lists (for numbered vertices)
n = 4
graph = [[] for _ in range(n)]
graph[0] = [1, 2]
graph[1] = [0, 2, 3]
```

**Space**: O(V + E) where V = vertices, E = edges

### 2. Adjacency Matrix
Better for dense graphs or when need O(1) edge lookup.

```python
n = 4
graph = [[0] * n for _ in range(n)]
graph[0][1] = 1  # Edge from 0 to 1
graph[0][2] = 1  # Edge from 0 to 2

# For weighted graphs
graph[0][1] = 5  # Edge with weight 5
```

**Space**: O(V²)

### 3. Edge List
Simple but less efficient for traversal.

```python
edges = [(0, 1), (0, 2), (1, 2), (1, 3)]

# For weighted graphs
edges = [(0, 1, 5), (0, 2, 3), (1, 2, 2)]
```

## Graph Traversals

### 1. Depth-First Search (DFS)

#### Recursive

```python
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(start)
    print(start)  # Process node
    
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    
    return visited
```

#### Iterative (using stack)

```python
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            print(node)  # Process node
            
            # Add neighbors in reverse to maintain order
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    stack.append(neighbor)
    
    return visited
```

**Time**: O(V + E)  
**Space**: O(V)

### 2. Breadth-First Search (BFS)

```python
from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    
    while queue:
        node = queue.popleft()
        print(node)  # Process node
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return visited
```

**Time**: O(V + E)  
**Space**: O(V)

## Common Patterns

### 1. Connected Components

```python
def count_components(n, edges):
    # Build adjacency list
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
    
    visited = set()
    count = 0
    
    def dfs(node):
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)
    
    for node in range(n):
        if node not in visited:
            dfs(node)
            count += 1
    
    return count
```

### 2. Cycle Detection

#### Undirected Graph

```python
def has_cycle_undirected(graph):
    visited = set()
    
    def dfs(node, parent):
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                if dfs(neighbor, node):
                    return True
            elif neighbor != parent:
                return True
        return False
    
    for node in graph:
        if node not in visited:
            if dfs(node, -1):
                return True
    return False
```

#### Directed Graph

```python
def has_cycle_directed(graph):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = defaultdict(int)
    
    def dfs(node):
        color[node] = GRAY
        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                return True
            if color[neighbor] == WHITE and dfs(neighbor):
                return True
        color[node] = BLACK
        return False
    
    for node in graph:
        if color[node] == WHITE:
            if dfs(node):
                return True
    return False
```

### 3. Topological Sort

Only for DAGs (Directed Acyclic Graphs).

#### Using DFS

```python
def topological_sort(graph):
    visited = set()
    result = []
    
    def dfs(node):
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)
        result.append(node)
    
    for node in graph:
        if node not in visited:
            dfs(node)
    
    return result[::-1]  # Reverse order
```

#### Using Kahn's Algorithm (BFS)

```python
from collections import deque

def topological_sort_kahn(graph, n):
    indegree = [0] * n
    for node in graph:
        for neighbor in graph[node]:
            indegree[neighbor] += 1
    
    queue = deque([i for i in range(n) if indegree[i] == 0])
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)
    
    return result if len(result) == n else []  # Empty if cycle
```

### 4. Shortest Path (Unweighted)

```python
from collections import deque

def shortest_path_bfs(graph, start, end):
    queue = deque([(start, [start])])
    visited = {start}
    
    while queue:
        node, path = queue.popleft()
        
        if node == end:
            return path
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return []  # No path found
```

### 5. Dijkstra's Algorithm (Weighted, Non-negative)

```python
import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]  # (distance, node)
    
    while pq:
        curr_dist, node = heapq.heappop(pq)
        
        if curr_dist > distances[node]:
            continue
        
        for neighbor, weight in graph[node]:
            distance = curr_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances
```

### 6. Union-Find (Disjoint Set)

Efficient for connectivity queries.

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]
    
    def union(self, x, y):
        root_x, root_y = self.find(x), self.find(y)
        
        if root_x == root_y:
            return False
        
        # Union by rank
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        
        return True
    
    def connected(self, x, y):
        return self.find(x) == self.find(y)
```

## Common Graph Problems

### 1. Clone Graph
```python
def clone_graph(node):
    if not node:
        return None
    
    clones = {}
    
    def dfs(node):
        if node in clones:
            return clones[node]
        
        clone = Node(node.val)
        clones[node] = clone
        
        for neighbor in node.neighbors:
            clone.neighbors.append(dfs(neighbor))
        
        return clone
    
    return dfs(node)
```

### 2. Number of Islands
```python
def num_islands(grid):
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        if (r < 0 or r >= rows or c < 0 or c >= cols or
            grid[r][c] == '0'):
            return
        grid[r][c] = '0'  # Mark as visited
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                dfs(r, c)
                count += 1
    
    return count
```

### 3. Course Schedule (Cycle Detection)
```python
def can_finish(num_courses, prerequisites):
    graph = defaultdict(list)
    for course, prereq in prerequisites:
        graph[prereq].append(course)
    
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * num_courses
    
    def has_cycle(node):
        color[node] = GRAY
        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                return True
            if color[neighbor] == WHITE and has_cycle(neighbor):
                return True
        color[node] = BLACK
        return False
    
    for course in range(num_courses):
        if color[course] == WHITE:
            if has_cycle(course):
                return False
    return True
```

## When to Use

- **DFS**: Pathfinding, cycle detection, topological sort, strongly connected components
- **BFS**: Shortest path (unweighted), level-order processing, connected components
- **Union-Find**: Dynamic connectivity, Kruskal's MST, detecting cycles in undirected graphs
- **Dijkstra**: Shortest path in weighted graphs (non-negative weights)

## Common Pitfalls

1. **Forgetting visited set** - Causes infinite loops
2. **Modifying graph during traversal** - Copy if needed
3. **Directed vs undirected** - Add edges carefully
4. **0-indexed vs 1-indexed** - Check problem constraints
5. **Not handling disconnected graphs** - Loop through all nodes

## Tips for LeetCode

1. **Identify graph structure** - Is it explicit or implicit (grid, tree)?
2. **Choose representation** - Adjacency list for sparse, matrix for dense
3. **DFS or BFS?** - DFS for paths/cycles, BFS for shortest path
4. **Track visited** - Set or array, depending on node type
5. **Handle disconnected** - Iterate all nodes, not just one start
6. **Grid = graph** - Treat 2D arrays as implicit graphs
7. **Consider Union-Find** - For dynamic connectivity problems
8. **Edge cases** - Empty graph, single node, no edges
