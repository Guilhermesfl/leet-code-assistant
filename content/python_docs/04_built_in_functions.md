# Built-in Functions and Utilities

Essential Python built-in functions and utilities for competitive programming.

## Numeric Functions

### Basic Math

```python
# Absolute value
abs(-5)              # 5

# Power
pow(2, 3)            # 8
pow(2, 3, 5)         # (2^3) % 5 = 3 (efficient for large numbers)
2 ** 3               # 8

# Division
5 / 2                # 2.5 (float division)
5 // 2               # 2 (floor division)
-5 // 2              # -3 (floor, not truncate)
divmod(5, 2)         # (2, 1) = (quotient, remainder)

# Rounding
round(3.7)           # 4
round(3.14159, 2)    # 3.14

import math
math.floor(3.7)      # 3
math.ceil(3.2)       # 4
math.trunc(-3.7)     # -3 (toward zero)

# Min/Max
min(1, 2, 3)         # 1
max(1, 2, 3)         # 3
min([1, 2, 3])       # 1
max([1, 2, 3])       # 3
min([1, 2, 3], key=lambda x: -x)  # 3 (custom comparison)
```

### Math Module

```python
import math

# Constants
math.pi              # 3.141592653589793
math.e               # 2.718281828459045
math.inf             # Infinity
-math.inf            # Negative infinity

# Logarithms
math.log(8, 2)       # 3.0 (log base 2)
math.log2(8)         # 3.0
math.log10(100)      # 2.0
math.log(math.e)     # 1.0 (natural log)

# Square root
math.sqrt(16)        # 4.0
math.isqrt(16)       # 4 (integer sqrt, Python 3.8+)

# GCD and LCM
math.gcd(12, 18)     # 6
math.lcm(12, 18)     # 36 (Python 3.9+)

# Factorial
math.factorial(5)    # 120

# Combinations and Permutations
math.comb(5, 2)      # 10 (C(5,2) = 5!/(2!*3!))
math.perm(5, 2)      # 20 (P(5,2) = 5!/(5-2)!)
```

## Sequence Functions

### Basic Operations

```python
# Length
len([1, 2, 3])       # 3
len("hello")         # 5

# Sum
sum([1, 2, 3])       # 6
sum([1, 2, 3], 10)   # 16 (start value)

# Range
list(range(5))       # [0, 1, 2, 3, 4]
list(range(2, 5))    # [2, 3, 4]
list(range(0, 10, 2)) # [0, 2, 4, 6, 8]
list(range(5, 0, -1)) # [5, 4, 3, 2, 1]

# Reversed
list(reversed([1, 2, 3]))  # [3, 2, 1]
reversed("hello")          # Iterator

# Sorted
sorted([3, 1, 2])          # [1, 2, 3]
sorted([3, 1, 2], reverse=True)  # [3, 2, 1]
sorted(['abc', 'a', 'ab'], key=len)  # ['a', 'ab', 'abc']

# Enumerate
for i, val in enumerate(['a', 'b', 'c']):
    print(i, val)  # 0 a, 1 b, 2 c

for i, val in enumerate(['a', 'b'], start=1):
    print(i, val)  # 1 a, 2 b

# Zip
list(zip([1, 2], ['a', 'b']))  # [(1, 'a'), (2, 'b')]
list(zip([1, 2, 3], ['a', 'b']))  # [(1, 'a'), (2, 'b')] - stops at shortest

# Unzip
pairs = [(1, 'a'), (2, 'b')]
nums, chars = zip(*pairs)  # nums=(1,2), chars=('a','b')
```

### Functional Programming

```python
# Map
list(map(str, [1, 2, 3]))  # ['1', '2', '3']
list(map(lambda x: x**2, [1, 2, 3]))  # [1, 4, 9]

# Filter
list(filter(lambda x: x > 0, [-1, 0, 1, 2]))  # [1, 2]
list(filter(None, [0, 1, False, 2, '', 3]))   # [1, 2, 3] - filters falsy

# All/Any
all([True, True, True])    # True
all([True, False, True])   # False
any([False, False, True])  # True
any([False, False, False]) # False

# Reduce (requires import)
from functools import reduce
reduce(lambda x, y: x + y, [1, 2, 3, 4])  # 10
reduce(lambda x, y: x * y, [1, 2, 3, 4])  # 24
```

## String and Character Functions

```python
# ASCII conversions
ord('A')             # 65
chr(65)              # 'A'

# Character checks
'a'.isalpha()        # True
'1'.isdigit()        # True
'a1'.isalnum()       # True
' '.isspace()        # True
'A'.isupper()        # True
'a'.islower()        # True

# String methods
'hello'.capitalize() # 'Hello'
'hello'.upper()      # 'HELLO'
'HELLO'.lower()      # 'hello'
```

## Type Conversions

```python
# To int
int('42')            # 42
int('101', 2)        # 5 (binary to int)
int('FF', 16)        # 255 (hex to int)
int(3.7)             # 3 (truncates)

# To float
float('3.14')        # 3.14
float('inf')         # inf

# To string
str(42)              # '42'
str([1, 2])          # '[1, 2]'

# To list/tuple/set
list('abc')          # ['a', 'b', 'c']
tuple([1, 2, 3])     # (1, 2, 3)
set([1, 2, 2, 3])    # {1, 2, 3}

# To dict
dict([('a', 1), ('b', 2)])  # {'a': 1, 'b': 2}
dict(a=1, b=2)              # {'a': 1, 'b': 2}
```

## Binary and Bitwise

```python
# Binary representation
bin(10)              # '0b1010'
bin(10)[2:]          # '1010' (without '0b')

# Hex representation
hex(255)             # '0xff'

# Bit operations
5 & 3                # 1 (AND)
5 | 3                # 7 (OR)
5 ^ 3                # 6 (XOR)
~5                   # -6 (NOT)
5 << 1               # 10 (left shift)
5 >> 1               # 2 (right shift)

# Count bits
bin(7).count('1')    # 3
```

## Input/Output

```python
# Print
print("Hello")
print("x =", x)
print(f"x = {x}")
print(x, y, sep=', ')      # Custom separator
print(x, end='')           # No newline

# Input (for competitive programming)
n = int(input())
arr = list(map(int, input().split()))

# Multiple lines
import sys
lines = sys.stdin.readlines()
```

## Itertools (Must Import)

```python
from itertools import *

# Combinations
list(combinations([1, 2, 3], 2))  # [(1,2), (1,3), (2,3)]

# Permutations
list(permutations([1, 2, 3], 2))  # [(1,2), (1,3), (2,1), (2,3), (3,1), (3,2)]

# Product (Cartesian product)
list(product([1, 2], ['a', 'b']))  # [(1,'a'), (1,'b'), (2,'a'), (2,'b')]

# Combinations with replacement
list(combinations_with_replacement([1, 2], 2))  # [(1,1), (1,2), (2,2)]

# Chain (flatten)
list(chain([1, 2], [3, 4]))  # [1, 2, 3, 4]

# Accumulate (cumulative operations)
list(accumulate([1, 2, 3, 4]))  # [1, 3, 6, 10] (cumulative sum)
list(accumulate([1, 2, 3, 4], lambda x, y: x * y))  # [1, 2, 6, 24]

# Groupby
from itertools import groupby
data = [1, 1, 2, 2, 2, 3]
for key, group in groupby(data):
    print(key, list(group))  # 1 [1, 1], 2 [2, 2, 2], 3 [3]

# Repeat
list(repeat(5, 3))   # [5, 5, 5]

# Cycle
import itertools
cycler = itertools.cycle([1, 2, 3])
[next(cycler) for _ in range(7)]  # [1, 2, 3, 1, 2, 3, 1]

# Islice (slice an iterator)
list(islice(range(10), 5))     # [0, 1, 2, 3, 4]
list(islice(range(10), 2, 5))  # [2, 3, 4]
```

## Functools (Must Import)

```python
from functools import *

# LRU Cache (memoization)
@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

# Reduce
reduce(lambda x, y: x + y, [1, 2, 3, 4])  # 10

# Partial (fix some arguments)
from functools import partial
add = lambda x, y: x + y
add_5 = partial(add, 5)
add_5(3)  # 8

# Cache (Python 3.9+)
@cache
def expensive_function(n):
    # computation
    return result
```

## Heapq (Must Import)

```python
import heapq

# Min heap operations
heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 3)
min_val = heapq.heappop(heap)  # 3

# Heapify
arr = [3, 1, 4, 1, 5]
heapq.heapify(arr)  # Converts to heap in-place

# N largest/smallest
heapq.nlargest(3, [1, 3, 5, 7, 9])   # [9, 7, 5]
heapq.nsmallest(3, [1, 3, 5, 7, 9])  # [1, 3, 5]
```

## Useful Techniques

### Infinity

```python
# Use for initialization
max_val = float('-inf')
min_val = float('inf')

# Or use math.inf
import math
max_val = -math.inf
min_val = math.inf
```

### Default Values

```python
# Get with default
d = {'a': 1}
d.get('b', 0)        # 0 (default)

# Ternary operator
value = x if condition else y

# Or operator for defaults
value = user_input or "default"
```

### Swapping

```python
# Python swap
a, b = b, a

# Multiple assignment
x, y, z = 1, 2, 3
```

### Unpacking

```python
# Unpack lists
first, *rest = [1, 2, 3, 4]  # first=1, rest=[2,3,4]
*init, last = [1, 2, 3, 4]   # init=[1,2,3], last=4
first, *middle, last = [1, 2, 3, 4]  # first=1, middle=[2,3], last=4

# Function arguments
def func(*args, **kwargs):
    pass

arr = [1, 2, 3]
func(*arr)  # Unpack as arguments
```

## Quick Reference Table

| Function | Purpose | Example |
|----------|---------|---------|
| `abs(x)` | Absolute value | `abs(-5)` → 5 |
| `min(x, y)` | Minimum | `min(3, 1)` → 1 |
| `max(x, y)` | Maximum | `max(3, 1)` → 3 |
| `sum(arr)` | Sum | `sum([1,2,3])` → 6 |
| `len(arr)` | Length | `len([1,2])` → 2 |
| `sorted(arr)` | Sort | `sorted([3,1])` → [1,3] |
| `reversed(arr)` | Reverse | `list(reversed([1,2]))` → [2,1] |
| `enumerate(arr)` | Index+value | `list(enumerate(['a']))` → [(0,'a')] |
| `zip(a, b)` | Combine | `list(zip([1],['a']))` → [(1,'a')] |
| `map(f, arr)` | Transform | `list(map(str,[1]))` → ['1'] |
| `filter(f, arr)` | Filter | `list(filter(lambda x: x>0, [-1,1]))` → [1] |
| `all(arr)` | All True? | `all([1,1])` → True |
| `any(arr)` | Any True? | `any([0,1])` → True |
| `ord(c)` | Char to int | `ord('A')` → 65 |
| `chr(n)` | Int to char | `chr(65)` → 'A' |

## Tips

1. **Use built-ins** - They're optimized in C
2. **List comprehensions** - Faster than loops
3. **Generator expressions** - Memory efficient
4. **`@lru_cache`** - Easy memoization
5. **`collections`** - Rich data structures
6. **`itertools`** - Efficient iteration
7. **`heapq`** - Efficient priority queue
8. **`bisect`** - Binary search in sorted lists
