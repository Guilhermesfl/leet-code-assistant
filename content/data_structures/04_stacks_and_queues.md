# Stacks and Queues

## Overview

Stacks and queues are abstract data types that manage collections of elements with specific access patterns.

## Stacks

### Characteristics
- **LIFO** - Last In, First Out
- **Push** - Add element to top
- **Pop** - Remove element from top
- **Peek/Top** - View top element without removing

### Implementation

```python
# Using list (most common in Python)
stack = []
stack.append(item)      # Push
top = stack.pop()       # Pop
peek = stack[-1]        # Peek
is_empty = len(stack) == 0

# Using collections.deque (thread-safe)
from collections import deque
stack = deque()
stack.append(item)      # Push
top = stack.pop()       # Pop
```

### Operations

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Push | O(1) | O(1) |
| Pop | O(1) | O(1) |
| Peek | O(1) | O(1) |
| Search | O(n) | O(1) |
| Is Empty | O(1) | O(1) |

## Queues

### Characteristics
- **FIFO** - First In, First Out
- **Enqueue** - Add element to rear
- **Dequeue** - Remove element from front
- **Peek/Front** - View front element without removing

### Implementation

```python
# Using collections.deque (efficient)
from collections import deque
queue = deque()
queue.append(item)      # Enqueue (add to right)
front = queue.popleft() # Dequeue (remove from left)
peek = queue[0]         # Peek

# Using list (inefficient for dequeue)
queue = []
queue.append(item)      # Enqueue - O(1)
front = queue.pop(0)    # Dequeue - O(n) - NOT RECOMMENDED

# Using queue.Queue (thread-safe)
from queue import Queue
q = Queue()
q.put(item)            # Enqueue
front = q.get()        # Dequeue
```

### Operations

| Operation | Time Complexity | Space Complexity |
|-----------|----------------|------------------|
| Enqueue | O(1) | O(1) |
| Dequeue | O(1) with deque | O(1) |
| Peek | O(1) | O(1) |
| Search | O(n) | O(1) |
| Is Empty | O(1) | O(1) |

## Common Patterns

### Stack Patterns

#### 1. Balanced Parentheses
```python
def is_valid_parentheses(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    
    return len(stack) == 0
```

#### 2. Monotonic Stack
Used for next greater/smaller element problems.

```python
def next_greater_elements(nums):
    result = [-1] * len(nums)
    stack = []  # Store indices
    
    for i, num in enumerate(nums):
        while stack and nums[stack[-1]] < num:
            idx = stack.pop()
            result[idx] = num
        stack.append(i)
    
    return result
```

#### 3. Expression Evaluation
```python
def eval_rpn(tokens):
    stack = []
    operators = {'+', '-', '*', '/'}
    
    for token in tokens:
        if token in operators:
            b = stack.pop()
            a = stack.pop()
            if token == '+': result = a + b
            elif token == '-': result = a - b
            elif token == '*': result = a * b
            else: result = int(a / b)
            stack.append(result)
        else:
            stack.append(int(token))
    
    return stack[0]
```

#### 4. Min/Max Stack
Track minimum/maximum in constant time.

```python
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []
    
    def push(self, val):
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)
    
    def pop(self):
        if self.stack.pop() == self.min_stack[-1]:
            self.min_stack.pop()
    
    def top(self):
        return self.stack[-1]
    
    def get_min(self):
        return self.min_stack[-1]
```

### Queue Patterns

#### 1. BFS (Breadth-First Search)
```python
def bfs(graph, start):
    queue = deque([start])
    visited = {start}
    
    while queue:
        node = queue.popleft()
        # Process node
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
```

#### 2. Level Order Traversal
```python
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

#### 3. Sliding Window Maximum
Using deque to maintain indices.

```python
def max_sliding_window(nums, k):
    deq = deque()  # Store indices
    result = []
    
    for i, num in enumerate(nums):
        # Remove indices outside window
        while deq and deq[0] <= i - k:
            deq.popleft()
        
        # Remove smaller elements
        while deq and nums[deq[-1]] < num:
            deq.pop()
        
        deq.append(i)
        
        if i >= k - 1:
            result.append(nums[deq[0]])
    
    return result
```

## Deque (Double-Ended Queue)

A deque supports insertion and deletion at both ends.

```python
from collections import deque

dq = deque()
dq.append(x)       # Add to right - O(1)
dq.appendleft(x)   # Add to left - O(1)
dq.pop()           # Remove from right - O(1)
dq.popleft()       # Remove from left - O(1)
dq[0]              # Access front - O(1)
dq[-1]             # Access back - O(1)
```

## When to Use

### Stacks
- **Function call stack** - Recursion, backtracking
- **Undo operations** - Text editors
- **Balanced parentheses** - Syntax checking
- **Expression evaluation** - Postfix, infix
- **Monotonic stack** - Next greater/smaller element
- **DFS** - Depth-first traversal

### Queues
- **BFS** - Breadth-first traversal
- **Level order traversal** - Trees
- **Task scheduling** - FIFO processing
- **Cache** - LRU cache (with additional structure)
- **Buffering** - Data streams

## Common Pitfalls

1. **Using list for queue** - `pop(0)` is O(n); use deque
2. **Empty stack/queue** - Check before pop/dequeue
3. **Queue vs Stack** - Choose based on FIFO vs LIFO needs
4. **Forgetting to check size** - Can cause index errors
5. **Modifying during iteration** - Create a copy if needed

## Tips for LeetCode

1. **Parentheses problems** - Think stack
2. **Next greater/smaller** - Monotonic stack
3. **BFS/level order** - Think queue
4. **Recent history** - Think stack (undo, browser history)
5. **Deque for both ends** - Sliding window problems
6. **Simulate recursion** - Use explicit stack
7. **Expression evaluation** - Stack-based parsing
8. **Two stacks = queue** - Classic interview question
9. **Two queues = stack** - Less common but possible

## Design Problems

### Implement Queue Using Stacks
```python
class MyQueue:
    def __init__(self):
        self.in_stack = []
        self.out_stack = []
    
    def push(self, x):
        self.in_stack.append(x)
    
    def pop(self):
        self._move()
        return self.out_stack.pop()
    
    def peek(self):
        self._move()
        return self.out_stack[-1]
    
    def _move(self):
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
```

### Implement Stack Using Queues
```python
class MyStack:
    def __init__(self):
        self.queue = deque()
    
    def push(self, x):
        self.queue.append(x)
        # Rotate to make newest element the front
        for _ in range(len(self.queue) - 1):
            self.queue.append(self.queue.popleft())
    
    def pop(self):
        return self.queue.popleft()
    
    def top(self):
        return self.queue[0]
```
