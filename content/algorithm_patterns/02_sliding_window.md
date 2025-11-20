# Sliding Window

## Pattern Overview

The sliding window technique uses two pointers to create a window that slides over the data structure, typically arrays or strings. It's used to find subarrays/substrings that meet certain criteria efficiently.

## When to Use

- Find longest/shortest subarray or substring
- Fixed or variable window size problems
- Problems involving sums, counts, or unique elements in a window

## Key Variations

- **Fixed window:** Window size remains constant
- **Variable window:** Window expands/contracts based on conditions

## Example Problems

- Longest Substring Without Repeating Characters
- Minimum Window Substring
- Maximum Sum Subarray of Size K

## Template

```python
# Fixed window
for right in range(len(arr)):
    # Expand window
    if right - left + 1 > k:
        left += 1

# Variable window
while right < len(arr):
    # Expand or contract window
    right += 1
    while condition:
        left += 1
```

## Tips

- Use hash maps or sets for fast lookups
- Carefully manage window boundaries
- Useful for O(n) solutions to subarray problems

## Practice

Try implementing sliding window for longest substring, max sum subarray, and smallest window containing all characters.
