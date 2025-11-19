# Python Collections Module

The `collections` module provides specialized container datatypes that are incredibly useful for LeetCode problems.

## Counter

A dict subclass for counting hashable objects.

### Basic Usage

```python
from collections import Counter

# Create Counter
count = Counter([1, 2, 2, 3, 3, 3])
# Counter({3: 3, 2: 2, 1: 1})

count = Counter("abracadabra")
# Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})

count = Counter(a=4, b=2, c=0)
# Counter({'a': 4, 'b': 2, 'c': 0})
```

### Methods

```python
c = Counter(['a', 'b', 'c', 'a', 'b', 'b'])

# Most common elements
c.most_common()      # [('b', 3), ('a', 2), ('c', 1)]
c.most_common(2)     # [('b', 3), ('a', 2)]

# Access count
c['a']               # 2
c['z']               # 0 (missing keys return 0)

# Update counts
c.update(['a', 'd'])  # Add counts
c.subtract(['a', 'b']) # Subtract counts

# Elements (repeat each element by its count)
list(c.elements())   # ['a', 'a', 'b', 'b', 'b', 'c']

# Arithmetic operations
c1 = Counter(a=3, b=1)
c2 = Counter(a=1, b=2)
c1 + c2              # Counter({'a': 4, 'b': 3})
c1 - c2              # Counter({'a': 2}) - removes non-positive
c1 & c2              # Intersection: min(c1[x], c2[x])
c1 | c2              # Union: max(c1[x], c2[x])
```

### Common Patterns

```python
# Check if anagram
def is_anagram(s, t):
    return Counter(s) == Counter(t)

# Top K frequent elements
def top_k_frequent(nums, k):
    count = Counter(nums)
    return [num for num, _ in count.most_common(k)]

# Find all anagrams
def group_anagrams(words):
    from collections import defaultdict
    groups = defaultdict(list)
    for word in words:
        key = tuple(sorted(word))
        groups[key].append(word)
    return list(groups.values())

# Character frequency difference
def find_difference(s, t):
    count = Counter(t)
    count.subtract(Counter(s))
    return list(count.elements())[0]
```

## defaultdict

Dict subclass that calls a factory function to supply missing values.

### Basic Usage

```python
from collections import defaultdict

# Default to list
graph = defaultdict(list)
graph[1].append(2)  # No KeyError
graph[1].append(3)

# Default to int (useful for counting)
count = defaultdict(int)
count['a'] += 1     # No KeyError, starts at 0

# Default to set
groups = defaultdict(set)
groups[1].add(2)

# Custom default
def default_value():
    return "N/A"
d = defaultdict(default_value)
```

### Common Patterns

```python
# Build adjacency list
def build_graph(edges):
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)  # For undirected graph
    return graph

# Group by property
def group_by_length(words):
    groups = defaultdict(list)
    for word in words:
        groups[len(word)].append(word)
    return dict(groups)

# Index mapping
def create_index(arr):
    index = defaultdict(list)
    for i, val in enumerate(arr):
        index[val].append(i)
    return index

# Frequency counter
def count_frequencies(arr):
    count = defaultdict(int)
    for item in arr:
        count[item] += 1
    return dict(count)
```

## deque

Double-ended queue with O(1) operations at both ends.

### Basic Usage

```python
from collections import deque

# Create deque
dq = deque([1, 2, 3])
dq = deque(maxlen=3)  # Fixed size, drops from opposite end

# Add elements
dq.append(4)       # Add to right - O(1)
dq.appendleft(0)   # Add to left - O(1)

# Remove elements
dq.pop()           # Remove from right - O(1)
dq.popleft()       # Remove from left - O(1)

# Extend
dq.extend([5, 6])       # Extend right
dq.extendleft([1, 0])   # Extend left (reverses order)

# Rotate
dq.rotate(1)       # Rotate right
dq.rotate(-1)      # Rotate left

# Access
dq[0]              # First element - O(1)
dq[-1]             # Last element - O(1)
```

### Common Patterns

```python
# BFS queue
from collections import deque

def bfs(graph, start):
    queue = deque([start])
    visited = {start}
    
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

# Sliding window maximum
def max_sliding_window(nums, k):
    dq = deque()  # Store indices
    result = []
    
    for i, num in enumerate(nums):
        # Remove indices outside window
        while dq and dq[0] <= i - k:
            dq.popleft()
        
        # Remove smaller elements
        while dq and nums[dq[-1]] < num:
            dq.pop()
        
        dq.append(i)
        
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result

# Recent counter
class RecentCounter:
    def __init__(self):
        self.queue = deque()
    
    def ping(self, t):
        self.queue.append(t)
        while self.queue[0] < t - 3000:
            self.queue.popleft()
        return len(self.queue)
```

## OrderedDict

Dict that remembers insertion order. (Less needed in Python 3.7+)

### Basic Usage

```python
from collections import OrderedDict

# Create
od = OrderedDict()
od['a'] = 1
od['b'] = 2
od['c'] = 3

# Move to end
od.move_to_end('a')  # Move 'a' to end
od.move_to_end('b', last=False)  # Move 'b' to beginning

# Pop items in order
od.popitem(last=True)   # Pop from end (LIFO)
od.popitem(last=False)  # Pop from beginning (FIFO)
```

### Common Patterns

```python
# LRU Cache
class LRUCache:
    def __init__(self, capacity):
        self.cache = OrderedDict()
        self.capacity = capacity
    
    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]
    
    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)
```

## namedtuple

Create tuple subclasses with named fields.

### Basic Usage

```python
from collections import namedtuple

# Define
Point = namedtuple('Point', ['x', 'y'])
Person = namedtuple('Person', 'name age city')

# Create
p = Point(10, 20)
person = Person('Alice', 30, 'NYC')

# Access
p.x              # 10
p[0]             # 10 (also supports index)
person.name      # 'Alice'

# Convert from dict
data = {'x': 5, 'y': 10}
p = Point(**data)

# Convert to dict
p._asdict()      # OrderedDict([('x', 10), ('y', 20)])
```

### Common Patterns

```python
# Coordinates
Point = namedtuple('Point', ['x', 'y'])

def manhattan_distance(p1, p2):
    return abs(p1.x - p2.x) + abs(p1.y - p2.y)

# Graph edges
Edge = namedtuple('Edge', ['src', 'dst', 'weight'])

def build_graph(edges):
    graph = defaultdict(list)
    for edge in edges:
        graph[edge.src].append((edge.dst, edge.weight))
    return graph

# Event with priority
Event = namedtuple('Event', ['time', 'priority', 'data'])
```

## ChainMap

Group multiple dicts into single view.

### Basic Usage

```python
from collections import ChainMap

# Create
dict1 = {'a': 1, 'b': 2}
dict2 = {'b': 3, 'c': 4}
chain = ChainMap(dict1, dict2)

chain['a']       # 1 (from dict1)
chain['b']       # 2 (from dict1, takes first match)
chain['c']       # 4 (from dict2)

# Update (updates first dict)
chain['d'] = 5
dict1['d']       # 5
```

## When to Use Each

| Type | Use When |
|------|----------|
| **Counter** | Counting frequencies, finding most common |
| **defaultdict** | Building graphs, grouping, avoiding KeyError |
| **deque** | Need O(1) operations at both ends (queue, sliding window) |
| **OrderedDict** | Need to maintain and manipulate insertion order |
| **namedtuple** | Want named access to tuple elements |
| **ChainMap** | Combining multiple dicts (rare in LeetCode) |

## Performance Comparison

```python
# Queue operations
list_queue = []
deque_queue = deque()

# Append (both O(1))
list_queue.append(1)
deque_queue.append(1)

# Pop from front
list_queue.pop(0)      # O(n) - BAD
deque_queue.popleft()  # O(1) - GOOD

# Conclusion: Use deque for queue operations
```

## Quick Reference

```python
from collections import Counter, defaultdict, deque, OrderedDict, namedtuple

# Counter
count = Counter(arr)
top_k = count.most_common(k)

# defaultdict
graph = defaultdict(list)
counts = defaultdict(int)

# deque (for queue/stack)
queue = deque()
queue.append(x)
queue.popleft()

# OrderedDict (LRU cache)
cache = OrderedDict()
cache.move_to_end(key)
cache.popitem(last=False)

# namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(1, 2)
```

## Common Patterns Summary

```python
# Frequency counting
from collections import Counter
count = Counter(arr)

# Graph building
from collections import defaultdict
graph = defaultdict(list)
for u, v in edges:
    graph[u].append(v)

# BFS
from collections import deque
queue = deque([start])
while queue:
    node = queue.popleft()
    # process...

# LRU Cache
from collections import OrderedDict
cache = OrderedDict()
cache.move_to_end(key)
if len(cache) > capacity:
    cache.popitem(last=False)
```
