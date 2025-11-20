# Greedy Techniques

## Pattern Overview

Greedy algorithms make the locally optimal choice at each step, hoping to find a global optimum. Used for scheduling, interval problems, and resource allocation.

## When to Use

- Problems with greedy-choice property
- Interval scheduling, merging, or selection
- Resource allocation

## Key Variations

- **Sorting by key:** Sort intervals or items by start/end/value
- **Iterative selection:** Pick next best option
- **Proof of correctness:** Sometimes required

## Example Problems

- Merge Intervals
- Non-overlapping Intervals
- Jump Game
- Minimum Number of Arrows to Burst Balloons

## Template

```python
intervals.sort(key=lambda x: x[1])
count = 0
end = float('-inf')
for interval in intervals:
    if interval[0] > end:
        count += 1
        end = interval[1]
```

## Tips

- Sort input for easier selection
- Prove greedy choice leads to optimal solution
- Not all problems can be solved greedily

## Practice

Try greedy for interval scheduling, jump game, and coin change.
