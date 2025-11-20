# Dynamic Programming

## Pattern Overview

Dynamic programming (DP) breaks problems into overlapping subproblems and stores their solutions to avoid recomputation. Used for optimization, counting, and sequence problems.

## When to Use

- Problems with optimal substructure
- Overlapping subproblems
- Counting ways, finding max/min values

## Key Variations

- **Top-down (memoization):** Recursive with cache
- **Bottom-up (tabulation):** Iterative filling of DP table
- **State compression:** Reduce space by storing only necessary states

## Example Problems

- Climbing Stairs
- Longest Increasing Subsequence
- Coin Change
- Edit Distance

## Template

```python
# Top-down
memo = {}
def dp(n):
    if n in memo:
        return memo[n]
    # Compute value
    memo[n] = ...
    return memo[n]

# Bottom-up
dp = [0] * (n+1)
for i in range(1, n+1):
    dp[i] = ...
```

## Tips

- Identify states and transitions
- Use memoization for recursion, tabulation for iteration
- Optimize space if possible

## Practice

Try DP for Fibonacci, knapsack, and longest common subsequence problems.
