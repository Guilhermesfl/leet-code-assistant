# Backtracking

## Pattern Overview

Backtracking is a recursive technique for exploring all possible solutions by building candidates and abandoning them if they fail to meet criteria. Used for permutations, combinations, and constraint satisfaction problems.

## When to Use

- Generate all permutations/combinations
- Solve puzzles (Sudoku, N-Queens)
- Find all valid paths or subsets

## Key Variations

- **Permutations:** All possible orderings
- **Combinations:** All possible selections
- **Pruning:** Abandon paths early if they can't lead to a solution

## Example Problems

- Permutations
- Combination Sum
- N-Queens
- Word Search

## Template

```python
def backtrack(path, options):
    if done_condition:
        results.append(path)
        return
    for option in options:
        if is_valid(option):
            backtrack(path + [option], options)
```

## Tips

- Use pruning to reduce search space
- Track visited elements for permutations
- Backtracking is often exponential in time

## Practice

Try backtracking for generating subsets, solving Sudoku, and finding all paths in a grid.
