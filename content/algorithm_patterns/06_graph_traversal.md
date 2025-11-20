# Graph Traversal & Topological Sort

## Pattern Overview

Graph traversal explores nodes and edges in a graph using BFS or DFS. Topological sort orders nodes in a directed acyclic graph (DAG) based on dependencies.

## When to Use

- Explore all nodes or paths in a graph
- Detect cycles or connectivity
- Order tasks with dependencies

## Key Variations

- **Breadth-first search (BFS):** Level-order, shortest path
- **Depth-first search (DFS):** Explore as deep as possible
- **Topological sort:** Order nodes in DAG

## Example Problems

- Number of Islands
- Course Schedule
- Clone Graph
- Word Ladder

## Template

```python
# BFS
from collections import deque
dq = deque([start])
visited = set([start])
while dq:
    node = dq.popleft()
    for neighbor in graph[node]:
        if neighbor not in visited:
            visited.add(neighbor)
            dq.append(neighbor)

# DFS
visited = set()
def dfs(node):
    visited.add(node)
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs(neighbor)
```

## Tips

- Use visited set to avoid cycles
- BFS for shortest path, DFS for connectivity
- Topological sort for dependency resolution

## Practice

Try BFS/DFS for island counting, graph cloning, and topological sorting.
