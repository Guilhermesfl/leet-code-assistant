# Heaps and Priority Queues

## Overview

A heap is a specialized tree-based data structure that satisfies the heap property. Priority queues are typically implemented using heaps.

## Heap Types

### Min Heap
- **Property**: Parent ≤ children
- **Root**: Minimum element
- **Use**: Get minimum element quickly

### Max Heap
- **Property**: Parent ≥ children
- **Root**: Maximum element
- **Use**: Get maximum element quickly

## Python Implementation

Python's `heapq` module implements a **min heap**.

```python
import heapq

# Create empty heap
heap = []

# Create heap from list
nums = [3, 1, 4, 1, 5, 9, 2, 6]
heapq.heapify(nums)  # O(n) time

# Push element
heapq.heappush(heap, 5)  # O(log n)

# Pop minimum
min_val = heapq.heappop(heap)  # O(log n)

# Peek at minimum (without removing)
min_val = heap[0]  # O(1)

# Push and pop in one operation
min_val = heapq.heappushpop(heap, 5)  # More efficient than separate calls

# Pop and push in one operation
min_val = heapq.heapreplace(heap, 5)  # Pops before pushing

# Get n smallest/largest
smallest = heapq.nsmallest(3, nums)
largest = heapq.nlargest(3, nums)
```

### Simulating Max Heap

```python
# Negate values for max heap behavior
max_heap = []
heapq.heappush(max_heap, -5)
heapq.heappush(max_heap, -3)
heapq.heappush(max_heap, -7)

max_val = -heapq.heappop(max_heap)  # Returns 7
```

### Custom Objects

```python
import heapq

# Using tuples (compared by first element)
heap = []
heapq.heappush(heap, (priority, item))

# Custom comparison
from dataclasses import dataclass, field
from typing import Any

@dataclass(order=True)
class PriorityItem:
    priority: int
    item: Any = field(compare=False)

heap = []
heapq.heappush(heap, PriorityItem(5, "task1"))
```

## Operations Complexity

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Find min/max | O(1) | O(1) |
| Insert | O(log n) | O(1) |
| Delete min/max | O(log n) | O(1) |
| Heapify | O(n) | O(1) |
| Decrease/Increase key | O(log n) | O(1) |
| Merge | O(n + m) | O(n + m) |

## Common Patterns

### 1. Top K Elements

```python
def top_k_frequent(nums, k):
    from collections import Counter
    count = Counter(nums)
    # Use negative frequency for max heap behavior
    return [num for num, _ in count.most_common(k)]

# Alternative with heap
def top_k_frequent_heap(nums, k):
    from collections import Counter
    count = Counter(nums)
    return heapq.nlargest(k, count.keys(), key=count.get)
```

### 2. Kth Largest Element

```python
def find_kth_largest(nums, k):
    # Min heap of size k
    heap = nums[:k]
    heapq.heapify(heap)
    
    for num in nums[k:]:
        if num > heap[0]:
            heapq.heapreplace(heap, num)
    
    return heap[0]
```

### 3. Merge K Sorted Lists

```python
def merge_k_lists(lists):
    heap = []
    result = []
    
    # Initialize heap with first element from each list
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))
    
    while heap:
        val, list_idx, elem_idx = heapq.heappop(heap)
        result.append(val)
        
        # Add next element from same list
        if elem_idx + 1 < len(lists[list_idx]):
            next_val = lists[list_idx][elem_idx + 1]
            heapq.heappush(heap, (next_val, list_idx, elem_idx + 1))
    
    return result
```

### 4. Running Median (Two Heaps)

```python
class MedianFinder:
    def __init__(self):
        self.small = []  # Max heap (store negatives)
        self.large = []  # Min heap
    
    def add_num(self, num):
        # Add to max heap (small)
        heapq.heappush(self.small, -num)
        
        # Balance: largest in small <= smallest in large
        if self.small and self.large and (-self.small[0] > self.large[0]):
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        
        # Balance sizes
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        if len(self.large) > len(self.small) + 1:
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)
    
    def find_median(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        if len(self.large) > len(self.small):
            return self.large[0]
        return (-self.small[0] + self.large[0]) / 2
```

### 5. Task Scheduler

```python
def least_interval(tasks, n):
    from collections import Counter
    count = Counter(tasks)
    max_heap = [-cnt for cnt in count.values()]
    heapq.heapify(max_heap)
    
    time = 0
    queue = deque()  # (count, idle_time)
    
    while max_heap or queue:
        time += 1
        
        if max_heap:
            cnt = 1 + heapq.heappop(max_heap)
            if cnt:
                queue.append((cnt, time + n))
        
        if queue and queue[0][1] == time:
            heapq.heappush(max_heap, queue.popleft()[0])
    
    return time
```

### 6. Dijkstra's Shortest Path

```python
def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    
    heap = [(0, start)]  # (distance, node)
    visited = set()
    
    while heap:
        curr_dist, node = heapq.heappop(heap)
        
        if node in visited:
            continue
        visited.add(node)
        
        for neighbor, weight in graph[node]:
            distance = curr_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(heap, (distance, neighbor))
    
    return distances
```

## Priority Queue vs Heap

**Priority Queue** is an abstract data type:
- Operations: insert, extract_max/min, peek
- Can be implemented with heap, balanced BST, or array

**Heap** is a concrete data structure:
- Typically used to implement priority queue
- More efficient than other implementations

## When to Use

### Heaps
- Finding top K elements
- Streaming data (running median, etc.)
- Merge K sorted sequences
- Task scheduling by priority
- Graph algorithms (Dijkstra, Prim's MST)
- Event-driven simulation

### Priority Queues
- Job scheduling systems
- Event handling
- A* pathfinding
- Huffman coding
- Load balancing

## Common Pitfalls

1. **Python only has min heap** - Negate values for max heap
2. **heapq modifies in place** - Operates on existing list
3. **Not checking empty heap** - `IndexError` on pop/peek
4. **Assuming sorted order** - Only root is guaranteed min/max
5. **Custom objects** - Need to define comparison or use tuples

## Heap vs Other Structures

| Operation | Heap | Sorted Array | BST |
|-----------|------|--------------|-----|
| Find min/max | O(1) | O(1) | O(log n) |
| Insert | O(log n) | O(n) | O(log n) avg |
| Delete min/max | O(log n) | O(n) | O(log n) avg |
| Search | O(n) | O(log n) | O(log n) avg |
| Build | O(n) | O(n log n) | O(n log n) avg |

## Tips for LeetCode

1. **Top K problems** - Think heap
2. **Running statistics** - Median, percentiles → heap
3. **Merge K sequences** - Min heap tracks smallest
4. **Python min heap** - Remember to negate for max heap
5. **heapify is O(n)** - Faster than n insertions
6. **Tuple comparison** - First element determines priority
7. **Two heaps pattern** - Running median, sliding window median
8. **Don't sort unless needed** - Heap is often more efficient
9. **Stream processing** - Heap maintains partial order efficiently
