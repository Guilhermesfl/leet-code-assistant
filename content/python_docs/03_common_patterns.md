# Common Patterns and Techniques

Essential algorithmic patterns and coding techniques frequently used in LeetCode problems.

## Two Pointers

Use two pointers moving through data to solve problems efficiently.

### Pattern Types

#### 1. Opposite Ends (Converging)

```python
# Check if palindrome
def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

# Two sum (sorted array)
def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        curr_sum = nums[left] + nums[right]
        if curr_sum == target:
            return [left, right]
        elif curr_sum < target:
            left += 1
        else:
            right -= 1
    return []

# Container with most water
def max_area(height):
    left, right = 0, len(height) - 1
    max_water = 0
    
    while left < right:
        width = right - left
        max_water = max(max_water, min(height[left], height[right]) * width)
        
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_water
```

#### 2. Same Direction (Fast & Slow)

```python
# Remove duplicates from sorted array
def remove_duplicates(nums):
    if not nums:
        return 0
    
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    
    return slow + 1

# Move zeroes to end
def move_zeroes(nums):
    slow = 0
    for fast in range(len(nums)):
        if nums[fast] != 0:
            nums[slow], nums[fast] = nums[fast], nums[slow]
            slow += 1

# Detect cycle in linked list
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
```

## Sliding Window

Maintain a window of elements that slides through the array.

### Fixed Size Window

```python
# Maximum sum of k consecutive elements
def max_sum_k_consecutive(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# Average of subarrays of size K
def find_averages(arr, k):
    result = []
    window_sum = 0
    
    for i in range(len(arr)):
        window_sum += arr[i]
        if i >= k - 1:
            result.append(window_sum / k)
            window_sum -= arr[i - k + 1]
    
    return result
```

### Variable Size Window

```python
# Longest substring without repeating characters
def length_of_longest_substring(s):
    char_set = set()
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length

# Minimum window substring
def min_window(s, t):
    from collections import Counter
    
    if not s or not t:
        return ""
    
    dict_t = Counter(t)
    required = len(dict_t)
    formed = 0
    window_counts = {}
    
    left = right = 0
    ans = float('inf'), None, None
    
    while right < len(s):
        char = s[right]
        window_counts[char] = window_counts.get(char, 0) + 1
        
        if char in dict_t and window_counts[char] == dict_t[char]:
            formed += 1
        
        while left <= right and formed == required:
            if right - left + 1 < ans[0]:
                ans = (right - left + 1, left, right)
            
            char = s[left]
            window_counts[char] -= 1
            if char in dict_t and window_counts[char] < dict_t[char]:
                formed -= 1
            left += 1
        
        right += 1
    
    return "" if ans[0] == float('inf') else s[ans[1]:ans[2] + 1]
```

## Prefix Sum

Precompute cumulative sums for efficient range queries.

### Basic Pattern

```python
# Build prefix sum array
def build_prefix_sum(arr):
    prefix = [0] * (len(arr) + 1)
    for i in range(len(arr)):
        prefix[i + 1] = prefix[i] + arr[i]
    return prefix

# Range sum query
class NumArray:
    def __init__(self, nums):
        self.prefix = [0] * (len(nums) + 1)
        for i in range(len(nums)):
            self.prefix[i + 1] = self.prefix[i] + nums[i]
    
    def sum_range(self, left, right):
        return self.prefix[right + 1] - self.prefix[left]

# Subarray sum equals K
def subarray_sum(nums, k):
    from collections import defaultdict
    count = 0
    curr_sum = 0
    sum_count = defaultdict(int)
    sum_count[0] = 1
    
    for num in nums:
        curr_sum += num
        count += sum_count[curr_sum - k]
        sum_count[curr_sum] += 1
    
    return count
```

### 2D Prefix Sum

```python
def build_2d_prefix(matrix):
    rows, cols = len(matrix), len(matrix[0])
    prefix = [[0] * (cols + 1) for _ in range(rows + 1)]
    
    for i in range(1, rows + 1):
        for j in range(1, cols + 1):
            prefix[i][j] = (matrix[i-1][j-1] + 
                           prefix[i-1][j] + 
                           prefix[i][j-1] - 
                           prefix[i-1][j-1])
    return prefix

def region_sum(prefix, row1, col1, row2, col2):
    return (prefix[row2+1][col2+1] - 
            prefix[row1][col2+1] - 
            prefix[row2+1][col1] + 
            prefix[row1][col1])
```

## Binary Search

Efficiently search in sorted data or search space.

### Classic Binary Search

```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1
```

### Find First/Last Occurrence

```python
def find_first(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            result = mid
            right = mid - 1  # Continue searching left
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result

def find_last(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if arr[mid] == target:
            result = mid
            left = mid + 1  # Continue searching right
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result
```

### Binary Search on Answer

```python
# Minimum capacity to ship packages within D days
def ship_within_days(weights, days):
    def can_ship(capacity):
        curr_weight = 0
        days_needed = 1
        
        for weight in weights:
            if curr_weight + weight > capacity:
                days_needed += 1
                curr_weight = weight
            else:
                curr_weight += weight
        
        return days_needed <= days
    
    left, right = max(weights), sum(weights)
    
    while left < right:
        mid = left + (right - left) // 2
        if can_ship(mid):
            right = mid
        else:
            left = mid + 1
    
    return left
```

## Backtracking

Explore all possibilities with pruning.

### Template

```python
def backtrack(path, choices):
    if is_solution(path):
        result.append(path[:])  # Make a copy
        return
    
    for choice in choices:
        # Make choice
        path.append(choice)
        
        # Recurse
        backtrack(path, new_choices)
        
        # Undo choice (backtrack)
        path.pop()
```

### Common Problems

```python
# Permutations
def permute(nums):
    result = []
    
    def backtrack(path, remaining):
        if not remaining:
            result.append(path[:])
            return
        
        for i in range(len(remaining)):
            backtrack(path + [remaining[i]], 
                     remaining[:i] + remaining[i+1:])
    
    backtrack([], nums)
    return result

# Subsets
def subsets(nums):
    result = []
    
    def backtrack(start, path):
        result.append(path[:])
        
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()
    
    backtrack(0, [])
    return result

# Combination sum
def combination_sum(candidates, target):
    result = []
    
    def backtrack(start, path, curr_sum):
        if curr_sum == target:
            result.append(path[:])
            return
        if curr_sum > target:
            return
        
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            backtrack(i, path, curr_sum + candidates[i])
            path.pop()
    
    backtrack(0, [], 0)
    return result
```

## Dynamic Programming

Solve problems by breaking them into subproblems.

### Top-Down (Memoization)

```python
# Fibonacci
def fib(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]

# Using @lru_cache
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)
```

### Bottom-Up (Tabulation)

```python
# Fibonacci
def fib(n):
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]

# Space optimized
def fib(n):
    if n <= 1:
        return n
    
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    
    return curr
```

## Greedy

Make locally optimal choices.

```python
# Jump game
def can_jump(nums):
    max_reach = 0
    for i in range(len(nums)):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + nums[i])
    return True

# Meeting rooms
def can_attend_meetings(intervals):
    intervals.sort(key=lambda x: x[0])
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i-1][1]:
            return False
    return True
```

## Monotonic Stack

Maintain stack in monotonic (increasing/decreasing) order.

```python
# Next greater element
def next_greater_elements(nums):
    result = [-1] * len(nums)
    stack = []  # Store indices
    
    for i, num in enumerate(nums):
        while stack and nums[stack[-1]] < num:
            idx = stack.pop()
            result[idx] = num
        stack.append(i)
    
    return result

# Daily temperatures
def daily_temperatures(temperatures):
    result = [0] * len(temperatures)
    stack = []
    
    for i, temp in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < temp:
            idx = stack.pop()
            result[idx] = i - idx
        stack.append(i)
    
    return result
```

## Quick Reference

| Pattern | When to Use | Time | Space |
|---------|-------------|------|-------|
| Two Pointers | Sorted array, pairs | O(n) | O(1) |
| Sliding Window | Subarray/substring | O(n) | O(k) |
| Prefix Sum | Range queries | O(n) | O(n) |
| Binary Search | Sorted, search space | O(log n) | O(1) |
| Backtracking | All combinations | O(2^n) | O(n) |
| DP | Overlapping subproblems | varies | varies |
| Greedy | Local optimal → global | O(n) | O(1) |
| Monotonic Stack | Next greater/smaller | O(n) | O(n) |
