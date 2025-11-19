# Python List and String Operations

Essential Python operations for arrays, lists, and strings commonly used in LeetCode problems.

## List Operations

### Creation

```python
# Empty list
arr = []

# With initial values
arr = [1, 2, 3, 4, 5]

# List comprehension
arr = [i for i in range(10)]           # [0, 1, 2, ..., 9]
arr = [i*2 for i in range(5)]          # [0, 2, 4, 6, 8]
arr = [i for i in range(10) if i % 2 == 0]  # [0, 2, 4, 6, 8]

# 2D array
matrix = [[0] * cols for _ in range(rows)]

# Copy
shallow = arr.copy()  # or arr[:]
import copy
deep = copy.deepcopy(arr)
```

### Access and Modification

```python
# Access
first = arr[0]
last = arr[-1]
second_last = arr[-2]

# Slicing [start:end:step]
arr[1:4]      # Elements at indices 1, 2, 3
arr[:3]       # First 3 elements
arr[2:]       # From index 2 to end
arr[-3:]      # Last 3 elements
arr[::2]      # Every other element
arr[::-1]     # Reverse list

# Modify
arr[0] = 10
arr[1:3] = [20, 30]
```

### Common Methods

```python
# Append (O(1) amortized)
arr.append(5)

# Insert at position (O(n))
arr.insert(0, 10)  # Insert 10 at index 0

# Extend (O(k) where k is length of extension)
arr.extend([6, 7, 8])
arr += [6, 7, 8]  # Equivalent

# Remove (O(n))
arr.remove(5)     # Remove first occurrence of 5
item = arr.pop()  # Remove and return last element
item = arr.pop(0) # Remove and return element at index 0

# Clear
arr.clear()

# Count
count = arr.count(5)  # Number of occurrences

# Index
idx = arr.index(5)     # First index of 5
idx = arr.index(5, 2)  # First index of 5 starting from index 2

# Reverse (in-place)
arr.reverse()

# Sort (in-place)
arr.sort()                    # Ascending
arr.sort(reverse=True)        # Descending
arr.sort(key=lambda x: -x)    # Custom sort

# Sorted (returns new list)
sorted_arr = sorted(arr)
sorted_arr = sorted(arr, reverse=True)
sorted_arr = sorted(arr, key=lambda x: (x[0], -x[1]))  # Sort by multiple keys
```

### Useful Functions

```python
# Length
length = len(arr)

# Sum
total = sum(arr)

# Min/Max
minimum = min(arr)
maximum = max(arr)
min_idx = arr.index(min(arr))

# All/Any
all([True, True, True])   # True if all elements are True
any([False, True, False]) # True if any element is True

# Enumerate
for i, val in enumerate(arr):
    print(f"Index {i}: {val}")

for i, val in enumerate(arr, start=1):  # Start from 1
    print(f"Position {i}: {val}")

# Zip
list1 = [1, 2, 3]
list2 = ['a', 'b', 'c']
for num, char in zip(list1, list2):
    print(num, char)

# Map
squared = list(map(lambda x: x**2, arr))

# Filter
evens = list(filter(lambda x: x % 2 == 0, arr))
```

## String Operations

### Creation

```python
s = "hello"
s = 'hello'
s = """multi
line
string"""

# String formatting
s = f"Value: {x}"
s = "Value: {}".format(x)
s = "Values: {0} {1}".format(x, y)
```

### Access

```python
# Indexing (same as lists)
first_char = s[0]
last_char = s[-1]

# Slicing (same as lists)
substring = s[1:4]
reversed_s = s[::-1]
```

### Common Methods

```python
# Case conversion
s.lower()         # "hello world"
s.upper()         # "HELLO WORLD"
s.capitalize()    # "Hello world"
s.title()         # "Hello World"
s.swapcase()      # Swap case of all chars

# Checking
s.isalpha()       # All alphabetic
s.isdigit()       # All digits
s.isalnum()       # Alphanumeric
s.isspace()       # All whitespace
s.islower()       # All lowercase
s.isupper()       # All uppercase

# Search
s.find('lo')      # Index of first occurrence, -1 if not found
s.rfind('lo')     # Index of last occurrence
s.index('lo')     # Like find, but raises ValueError if not found
s.count('l')      # Number of occurrences

# Check prefix/suffix
s.startswith('he')  # True
s.endswith('lo')    # True

# Replace
s.replace('l', 'L')          # Replace all occurrences
s.replace('l', 'L', 1)       # Replace first occurrence

# Strip whitespace
s.strip()         # Remove leading and trailing whitespace
s.lstrip()        # Remove leading whitespace
s.rstrip()        # Remove trailing whitespace
s.strip('.,')     # Remove specific characters

# Split and Join
words = s.split()           # Split on whitespace
words = s.split(',')        # Split on comma
words = s.split(',', 2)     # Split on comma, max 2 splits

result = ' '.join(words)    # Join with space
result = ','.join(words)    # Join with comma
```

### String Building

**Important**: Strings are immutable. Building with `+=` is O(n²).

```python
# BAD (O(n²))
result = ""
for char in chars:
    result += char

# GOOD (O(n))
result = ''.join(chars)

# Using list as string builder
chars = []
for i in range(10):
    chars.append(str(i))
result = ''.join(chars)
```

## List Comprehensions (Advanced)

```python
# Basic
squares = [x**2 for x in range(10)]

# With condition
evens = [x for x in range(10) if x % 2 == 0]

# Nested
matrix = [[i+j for j in range(3)] for i in range(3)]

# Flatten 2D list
flat = [item for row in matrix for item in row]

# Multiple conditions
result = [x for x in range(20) if x % 2 == 0 if x % 3 == 0]

# If-else in comprehension
result = [x if x % 2 == 0 else -x for x in range(10)]

# Dictionary comprehension
d = {i: i**2 for i in range(5)}

# Set comprehension
unique = {x % 5 for x in range(20)}
```

## Common Patterns

### Two Pointers

```python
# Reverse array
def reverse(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1

# Remove duplicates from sorted array
def remove_duplicates(nums):
    if not nums:
        return 0
    write = 1
    for read in range(1, len(nums)):
        if nums[read] != nums[read-1]:
            nums[write] = nums[read]
            write += 1
    return write
```

### Sliding Window

```python
# Maximum sum of k consecutive elements
def max_sum_k_consecutive(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i-k]
        max_sum = max(max_sum, window_sum)
    
    return max_sum
```

### Prefix Sum

```python
# Build prefix sum
prefix = [0] * (len(arr) + 1)
for i in range(len(arr)):
    prefix[i+1] = prefix[i] + arr[i]

# Range sum [i, j]
range_sum = prefix[j+1] - prefix[i]
```

## Performance Tips

### Time Complexity

| Operation | Time | Notes |
|-----------|------|-------|
| `arr[i]` | O(1) | Index access |
| `arr.append(x)` | O(1) | Amortized |
| `arr.insert(0, x)` | O(n) | Shift all elements |
| `arr.pop()` | O(1) | Remove last |
| `arr.pop(0)` | O(n) | Shift all elements |
| `x in arr` | O(n) | Linear search |
| `arr.sort()` | O(n log n) | Timsort |
| `''.join(arr)` | O(n) | Concatenate strings |
| `s += char` | O(n) | Creates new string |

### Space Optimization

```python
# Modify in-place when possible
arr.sort()  # Instead of: arr = sorted(arr)
arr.reverse()  # Instead of: arr = arr[::-1]

# Use generators for large sequences
sum(x**2 for x in range(1000000))  # Generator, low memory
# vs
sum([x**2 for x in range(1000000)])  # List, high memory

# Use set for membership testing
s = set(arr)
if x in s:  # O(1) instead of O(n)
    pass
```

## Common Gotchas

```python
# 1. Mutable default arguments
def bad(arr=[]):  # DON'T DO THIS
    arr.append(1)
    return arr

def good(arr=None):  # DO THIS
    if arr is None:
        arr = []
    arr.append(1)
    return arr

# 2. List multiplication
arr = [[0] * 3] * 3  # BAD: All rows are same object
arr = [[0] * 3 for _ in range(3)]  # GOOD: Separate objects

# 3. Modifying list during iteration
for x in arr:
    if x % 2 == 0:
        arr.remove(x)  # BAD: Skips elements

arr = [x for x in arr if x % 2 != 0]  # GOOD: Create new list

# 4. String concatenation in loop
s = ""
for i in range(n):
    s += str(i)  # BAD: O(n²)

s = ''.join(str(i) for i in range(n))  # GOOD: O(n)
```

## Quick Reference

```python
# Common idioms
arr = arr or []           # Default to empty list
s = s.strip() or "default"  # Default value

# Swap
a, b = b, a

# Multiple assignment
x, y, z = 1, 2, 3

# Unpacking
first, *rest = arr
*init, last = arr
first, *middle, last = arr

# Ternary operator
value = x if condition else y

# Check empty
if not arr:  # Preferred over len(arr) == 0
    pass

# Check non-empty
if arr:
    pass
```
