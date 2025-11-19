# Binary Trees and Binary Search Trees

## Overview

Trees are hierarchical data structures with a root node and child nodes forming a parent-child relationship. Binary trees have at most two children per node.

## Binary Tree

### Structure

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
```

### Types

1. **Full Binary Tree** - Every node has 0 or 2 children
2. **Complete Binary Tree** - All levels filled except possibly the last, which fills left to right
3. **Perfect Binary Tree** - All internal nodes have 2 children, all leaves at same level
4. **Balanced Binary Tree** - Height difference between left and right subtrees ≤ 1

### Properties

- **Maximum nodes at level i**: $2^i$
- **Maximum nodes in tree of height h**: $2^{h+1} - 1$
- **Minimum height for n nodes**: $\lceil \log_2(n+1) \rceil - 1$
- **Maximum height for n nodes**: $n - 1$

## Binary Search Tree (BST)

### Characteristics
- **Left subtree** contains only nodes with values < parent
- **Right subtree** contains only nodes with values > parent
- **Both subtrees** are also BSTs
- **No duplicate** nodes (in standard BST)

### Operations

| Operation | Average | Worst Case | Notes |
|-----------|---------|------------|-------|
| Search | O(log n) | O(n) | Skewed tree worst case |
| Insert | O(log n) | O(n) | Skewed tree worst case |
| Delete | O(log n) | O(n) | Skewed tree worst case |
| Min/Max | O(log n) | O(n) | Leftmost/Rightmost |

## Tree Traversals

### 1. Depth-First Search (DFS)

#### Inorder (Left → Root → Right)
For BST, gives sorted order.

```python
def inorder(root):
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)
        result.append(node.val)
        dfs(node.right)
    dfs(root)
    return result

# Iterative with stack
def inorder_iterative(root):
    result, stack = [], []
    curr = root
    
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        result.append(curr.val)
        curr = curr.right
    
    return result
```

#### Preorder (Root → Left → Right)
Used for copying trees.

```python
def preorder(root):
    result = []
    def dfs(node):
        if not node:
            return
        result.append(node.val)
        dfs(node.left)
        dfs(node.right)
    dfs(root)
    return result

# Iterative
def preorder_iterative(root):
    if not root:
        return []
    result, stack = [], [root]
    
    while stack:
        node = stack.pop()
        result.append(node.val)
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)
    
    return result
```

#### Postorder (Left → Right → Root)
Used for deleting trees.

```python
def postorder(root):
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)
        dfs(node.right)
        result.append(node.val)
    dfs(root)
    return result
```

### 2. Breadth-First Search (BFS)

#### Level Order Traversal

```python
from collections import deque

def level_order(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(level)
    
    return result
```

## Common Patterns

### 1. Recursive Tree Operations

```python
# Maximum depth
def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

# Check if balanced
def is_balanced(root):
    def height(node):
        if not node:
            return 0
        left = height(node.left)
        right = height(node.right)
        if left == -1 or right == -1 or abs(left - right) > 1:
            return -1
        return 1 + max(left, right)
    return height(root) != -1

# Check if same tree
def is_same_tree(p, q):
    if not p and not q:
        return True
    if not p or not q:
        return False
    return (p.val == q.val and 
            is_same_tree(p.left, q.left) and
            is_same_tree(p.right, q.right))
```

### 2. Path Problems

```python
# Has path sum
def has_path_sum(root, target_sum):
    if not root:
        return False
    if not root.left and not root.right:
        return root.val == target_sum
    return (has_path_sum(root.left, target_sum - root.val) or
            has_path_sum(root.right, target_sum - root.val))

# All root-to-leaf paths
def binary_tree_paths(root):
    result = []
    def dfs(node, path):
        if not node:
            return
        path.append(str(node.val))
        if not node.left and not node.right:
            result.append('->'.join(path))
        else:
            dfs(node.left, path)
            dfs(node.right, path)
        path.pop()
    dfs(root, [])
    return result
```

### 3. BST Operations

```python
# Search in BST
def search_bst(root, val):
    if not root or root.val == val:
        return root
    if val < root.val:
        return search_bst(root.left, val)
    return search_bst(root.right, val)

# Insert into BST
def insert_into_bst(root, val):
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insert_into_bst(root.left, val)
    else:
        root.right = insert_into_bst(root.right, val)
    return root

# Validate BST
def is_valid_bst(root):
    def validate(node, min_val, max_val):
        if not node:
            return True
        if node.val <= min_val or node.val >= max_val:
            return False
        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))
    return validate(root, float('-inf'), float('inf'))

# Kth smallest in BST
def kth_smallest(root, k):
    stack = []
    curr = root
    
    while True:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        k -= 1
        if k == 0:
            return curr.val
        curr = curr.right
```

### 4. Lowest Common Ancestor

```python
# LCA in BST
def lca_bst(root, p, q):
    if p.val < root.val > q.val:
        return lca_bst(root.left, p, q)
    if p.val > root.val < q.val:
        return lca_bst(root.right, p, q)
    return root

# LCA in Binary Tree
def lca_binary_tree(root, p, q):
    if not root or root == p or root == q:
        return root
    left = lca_binary_tree(root.left, p, q)
    right = lca_binary_tree(root.right, p, q)
    if left and right:
        return root
    return left if left else right
```

### 5. Tree Construction

```python
# Build tree from inorder and preorder
def build_tree(preorder, inorder):
    if not preorder or not inorder:
        return None
    
    root = TreeNode(preorder[0])
    mid = inorder.index(preorder[0])
    root.left = build_tree(preorder[1:mid+1], inorder[:mid])
    root.right = build_tree(preorder[mid+1:], inorder[mid+1:])
    return root
```

## Common Techniques

### 1. Tree Serialization
```python
def serialize(root):
    result = []
    def dfs(node):
        if not node:
            result.append('null')
            return
        result.append(str(node.val))
        dfs(node.left)
        dfs(node.right)
    dfs(root)
    return ','.join(result)

def deserialize(data):
    vals = iter(data.split(','))
    def dfs():
        val = next(vals)
        if val == 'null':
            return None
        node = TreeNode(int(val))
        node.left = dfs()
        node.right = dfs()
        return node
    return dfs()
```

### 2. Morris Traversal (O(1) space)
```python
def morris_inorder(root):
    result, curr = [], root
    
    while curr:
        if not curr.left:
            result.append(curr.val)
            curr = curr.right
        else:
            pred = curr.left
            while pred.right and pred.right != curr:
                pred = pred.right
            
            if not pred.right:
                pred.right = curr
                curr = curr.left
            else:
                pred.right = None
                result.append(curr.val)
                curr = curr.right
    
    return result
```

## When to Use

### Binary Trees
- Hierarchical data representation
- Expression parsing
- File system structure
- Organization charts

### BSTs
- Ordered data with frequent insertions/deletions
- Range queries
- Finding closest values
- Auto-complete systems

## Common Pitfalls

1. **Forgetting base cases** - Always handle null nodes
2. **Not returning values** - Remember to return in recursion
3. **Modifying during traversal** - Can cause infinite loops
4. **Confusing left/right** - Draw diagrams to verify
5. **Stack overflow** - Deep trees in recursive solutions

## Tips for LeetCode

1. **Start with base case** - What if root is null?
2. **Think recursively** - What do you do at each node?
3. **Use helper functions** - Pass extra parameters
4. **DFS vs BFS** - DFS for paths, BFS for levels
5. **BST property** - Use ordering for optimization
6. **Draw small examples** - 3-4 node trees
7. **Consider edge cases** - Single node, skewed tree
8. **Return early** - In recursive functions when possible
