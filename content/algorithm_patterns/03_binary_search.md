# Binary Search Variants

## Pattern Overview

Binary search is a divide-and-conquer technique for finding elements in sorted arrays or answer spaces. Variants include searching for boundaries, rotated arrays, and custom conditions.

## When to Use

- Search in sorted arrays
- Find lower/upper bounds
- Search in rotated arrays
- Search for minimum/maximum answer

## Key Variations

- **Standard binary search:** Find exact value
- **Lower/upper bound:** Find first/last occurrence
- **Search on answer space:** Use binary search to optimize an answer

## Example Problems

- Search Insert Position
- Find Minimum in Rotated Sorted Array
- First Bad Version
- Search a 2D Matrix

## Template

```python
left, right = 0, len(arr) - 1
while left <= right:
    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        left = mid + 1
    else:
        right = mid - 1
```

## Tips

- Watch for infinite loops (update left/right)
- Use while left < right for boundary problems
- Can be applied to monotonic functions

## Practice

Try binary search for lower/upper bounds, rotated arrays, and answer space optimization.
