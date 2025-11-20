# Two Pointers

## Pattern Overview
The two pointers technique involves using two indices to traverse a data structure, often to find pairs, partitions, or optimize space/time. Common in array and linked list problems.

## When to Use
- Finding pairs or triplets that meet a condition
- Partitioning arrays
- Removing duplicates
- Reversing or merging lists
- Sliding window problems

## Key Variations
- **Converging pointers:** Start at both ends, move towards each other
- **Sliding window:** Both pointers move forward, window expands/contracts
- **Fast/slow pointers:** One pointer moves faster (cycle detection)

## Example Problems
- Two Sum II (sorted array)
- Remove Duplicates from Sorted Array
- Linked List Cycle
- Container With Most Water

## Template
```python
def two_pointers(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        # Do something with arr[left] and arr[right]
        left += 1
        right -= 1
```

## Tips
- Sort the array if not already sorted
- Watch for off-by-one errors
- Use while loops for flexibility

## Practice
Try implementing two pointers for palindrome checking, partitioning, and merging sorted lists.
