# Arrays and Strings

## Overview

Arrays and strings are fundamental sequential data structures that store elements in contiguous memory locations.

## Arrays

### Characteristics
- **Fixed or dynamic size** (lists in Python are dynamic)
- **Contiguous memory** allocation
- **Direct access** via index in O(1) time
- **Homogeneous** elements (in most languages, but Python lists are flexible)

### Common Operations

| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| Access by index | O(1) | Direct memory access |
| Search (unsorted) | O(n) | Linear scan required |
| Search (sorted) | O(log n) | Binary search |
| Insert at end | O(1) amortized | May require resize |
| Insert at position | O(n) | Shift elements required |
| Delete at end | O(1) | Simple removal |
| Delete at position | O(n) | Shift elements required |

### Space Complexity
- **O(n)** where n is the number of elements

## Strings

### Characteristics
- **Immutable** in Python (creates new string on modification)
- **Sequence of characters**
- **Iterable** like arrays

### Common Operations

| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| Access character | O(1) | Direct index access |
| Concatenation | O(n + m) | Creates new string |
| Substring | O(k) | k = length of substring |
| Search substring | O(n * m) | Naive approach |
| Split | O(n) | Creates list of strings |
| Join | O(n) | n = total chars in result |

## Common Patterns

### 1. Two Pointers
Used for problems involving pairs, reversing, or partitioning.

```python
# Example: Reverse array in place
def reverse_array(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
```

### 2. Sliding Window
Used for contiguous subarray/substring problems.

```python
# Example: Maximum sum of k consecutive elements
def max_sum_k_consecutive(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    
    return max_sum
```

### 3. Prefix Sum
Used for range sum queries.

```python
# Build prefix sum array
def build_prefix_sum(arr):
    prefix = [0] * (len(arr) + 1)
    for i in range(len(arr)):
        prefix[i + 1] = prefix[i] + arr[i]
    return prefix

# Query sum from index i to j (inclusive)
def range_sum(prefix, i, j):
    return prefix[j + 1] - prefix[i]
```

### 4. Fast and Slow Pointers
Used for cycle detection or finding middle element.

```python
# Example: Find middle of array
def find_middle(arr):
    slow = fast = 0
    while fast < len(arr) - 1:
        slow += 1
        fast += 2
    return arr[slow]
```

## When to Use

### Arrays
- Need random access to elements
- Fixed or predictable size
- Sequential data processing
- Sorting or searching operations
- Mathematical operations on collections

### Strings
- Text processing and manipulation
- Pattern matching
- Parsing and tokenization
- Character-level operations

## Common Pitfalls

1. **Index out of bounds** - Always check array bounds
2. **String immutability** - Remember strings are immutable in Python; use lists for frequent modifications
3. **Negative indices** - Python allows negative indexing; be careful with edge cases
4. **Empty arrays/strings** - Always handle empty input cases

## Tips for LeetCode

1. **Check constraints** - Array size, element range, sorted/unsorted
2. **Consider edge cases** - Empty, single element, duplicates
3. **In-place vs extra space** - Clarify space complexity requirements
4. **Sorted arrays** - Consider binary search or two pointers
5. **String building** - Use lists and `join()` instead of concatenation for efficiency
