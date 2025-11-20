# Interval Patterns

## Pattern Overview

Interval problems involve ranges, merging, inserting, or selecting non-overlapping intervals. Often solved with sorting and greedy or two pointers.

## When to Use

- Merge overlapping intervals
- Insert new interval
- Select maximum set of non-overlapping intervals

## Key Variations

- **Merge intervals:** Combine overlapping ranges
- **Insert interval:** Place new interval in sorted list
- **Select intervals:** Choose non-overlapping set

## Example Problems

- Merge Intervals
- Insert Interval
- Non-overlapping Intervals
- Meeting Rooms

## Template

```python
intervals.sort(key=lambda x: x[0])
merged = []
for interval in intervals:
    if not merged or merged[-1][1] < interval[0]:
        merged.append(interval)
    else:
        merged[-1][1] = max(merged[-1][1], interval[1])
```

## Tips

- Always sort intervals first
- Watch for edge cases (touching intervals)
- Use greedy or two pointers for selection

## Practice

Try interval merging, insertion, and selection problems.
