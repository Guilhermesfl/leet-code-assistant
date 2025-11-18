# Hash Maps and Hash Sets

## Overview

Hash-based data structures provide average O(1) time complexity for insertions, deletions, and lookups using hash functions to map keys to indices.

## Hash Maps (Dictionaries in Python)

### Characteristics
- **Key-value pairs** storage
- **Unordered** (ordered by insertion in Python 3.7+)
- **Unique keys** (duplicate keys overwrite)
- **O(1) average** time for basic operations
- **Dynamic sizing** with automatic rehashing

### Common Operations

| Operation | Average Time | Worst Case | Notes |
|-----------|--------------|------------|-------|
| Insert/Update | O(1) | O(n) | Hash collision |
| Access by key | O(1) | O(n) | Hash collision |
| Delete by key | O(1) | O(n) | Hash collision |
| Search for key | O(1) | O(n) | Hash collision |
| Iterate all items | O(n) | O(n) | Visit each element |

### Space Complexity
- **O(n)** where n is the number of key-value pairs

## Hash Sets

### Characteristics
- **Unique elements** only
- **Unordered** collection
- **O(1) average** time for operations
- Similar to hash map but stores only keys (no values)

### Common Operations

| Operation | Average Time | Worst Case | Notes |
|-----------|--------------|------------|-------|
| Add element | O(1) | O(n) | Hash collision |
| Remove element | O(1) | O(n) | Hash collision |
| Check membership | O(1) | O(n) | Hash collision |
| Iterate all elements | O(n) | O(n) | Visit each element |

### Space Complexity
- **O(n)** where n is the number of elements

## Common Patterns

### 1. Frequency Counter
Count occurrences of elements.

```python
from collections import Counter

# Manual approach
def count_frequencies(arr):
    freq = {}
    for num in arr:
        freq[num] = freq.get(num, 0) + 1
    return freq

# Using Counter
def count_frequencies_counter(arr):
    return Counter(arr)
```

### 2. Two Sum Pattern
Find pairs that satisfy a condition.

```python
def two_sum(nums, target):
    seen = {}  # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
```

### 3. Grouping/Categorization
Group elements by some property.

```python
from collections import defaultdict

def group_anagrams(words):
    groups = defaultdict(list)
    for word in words:
        key = ''.join(sorted(word))
        groups[key].append(word)
    return list(groups.values())
```

### 4. Tracking Seen Elements
Detect duplicates or check uniqueness.

```python
def contains_duplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False
```

### 5. Set Operations
Union, intersection, difference.

```python
# Intersection of two arrays
def intersection(nums1, nums2):
    set1 = set(nums1)
    set2 = set(nums2)
    return list(set1 & set2)  # & is intersection operator
```

## Python-Specific Collections

### defaultdict
Provides default values for missing keys.

```python
from collections import defaultdict

# Default to empty list
graph = defaultdict(list)
graph[1].append(2)  # No KeyError

# Default to 0
counter = defaultdict(int)
counter['a'] += 1  # No KeyError
```

### Counter
Specialized dict for counting.

```python
from collections import Counter

counts = Counter([1, 2, 2, 3, 3, 3])
# Counter({3: 3, 2: 2, 1: 1})

# Most common elements
top_2 = counts.most_common(2)  # [(3, 3), (2, 2)]
```

### OrderedDict
Maintains insertion order (less needed in Python 3.7+).

```python
from collections import OrderedDict

od = OrderedDict()
od['first'] = 1
od['second'] = 2
# Maintains order: 'first', 'second'
```

## When to Use

### Hash Maps
- Need to associate keys with values
- Counting frequencies
- Caching/memoization
- Quick lookups by key
- Grouping data

### Hash Sets
- Need unique elements only
- Membership testing
- Removing duplicates
- Set operations (union, intersection, difference)
- Tracking visited/seen elements

## Common Pitfalls

1. **Unhashable types** - Lists and dicts can't be set/dict keys; use tuples or frozensets
2. **Mutable keys** - Don't modify objects used as keys
3. **Hash collisions** - Rare but possible; worst case is O(n)
4. **Memory usage** - Hash tables use more memory than arrays
5. **Iteration order** - Don't rely on order unless using OrderedDict or Python 3.7+

## Tips for LeetCode

1. **Consider hash maps first** - Many problems become O(n) with a hash map
2. **Trade space for time** - Hash maps trade memory for speed
3. **Use Counter** - Built-in frequency counting is cleaner
4. **Check for duplicates** - Sets make this O(n) instead of O(n²)
5. **Two sum variants** - Hash map is the classic approach
6. **Complement patterns** - Store what you need to find later
7. **Tuple keys** - Use tuples for multi-dimensional keys: `(row, col)`
