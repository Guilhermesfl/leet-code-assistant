# Linked Lists

## Overview

A linked list is a linear data structure where elements (nodes) are connected via pointers. Each node contains data and a reference to the next node.

## Types of Linked Lists

### 1. Singly Linked List
Each node points to the next node only.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
```

### 2. Doubly Linked List
Each node points to both next and previous nodes.

```python
class DoublyListNode:
    def __init__(self, val=0, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next
```

### 3. Circular Linked List
Last node points back to the first node.

## Common Operations

| Operation | Time Complexity | Space Complexity | Notes |
|-----------|----------------|------------------|-------|
| Access by index | O(n) | O(1) | Must traverse from head |
| Search | O(n) | O(1) | Linear scan required |
| Insert at head | O(1) | O(1) | Just update head pointer |
| Insert at tail | O(n) | O(1) | O(1) if tail pointer maintained |
| Insert at position | O(n) | O(1) | Must traverse to position |
| Delete at head | O(1) | O(1) | Update head pointer |
| Delete at tail | O(n) | O(1) | Must find previous node |
| Delete at position | O(n) | O(1) | Must traverse to position |

## Common Patterns

### 1. Two Pointers (Fast & Slow)
Used for finding middle, detecting cycles, finding nth from end.

```python
# Find middle of linked list
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow

# Detect cycle
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
```

### 2. Dummy Head
Simplifies edge cases for operations at head.

```python
def remove_elements(head, val):
    dummy = ListNode(0)
    dummy.next = head
    curr = dummy
    
    while curr.next:
        if curr.next.val == val:
            curr.next = curr.next.next
        else:
            curr = curr.next
    
    return dummy.next
```

### 3. Reversal
Reverse a linked list or part of it.

```python
# Reverse entire list
def reverse_list(head):
    prev = None
    curr = head
    
    while curr:
        next_temp = curr.next
        curr.next = prev
        prev = curr
        curr = next_temp
    
    return prev

# Reverse between positions
def reverse_between(head, left, right):
    if not head or left == right:
        return head
    
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy
    
    # Move to position before left
    for _ in range(left - 1):
        prev = prev.next
    
    # Reverse from left to right
    curr = prev.next
    for _ in range(right - left):
        temp = curr.next
        curr.next = temp.next
        temp.next = prev.next
        prev.next = temp
    
    return dummy.next
```

### 4. Merge
Merge two sorted linked lists.

```python
def merge_two_lists(l1, l2):
    dummy = ListNode(0)
    curr = dummy
    
    while l1 and l2:
        if l1.val <= l2.val:
            curr.next = l1
            l1 = l1.next
        else:
            curr.next = l2
            l2 = l2.next
        curr = curr.next
    
    curr.next = l1 if l1 else l2
    return dummy.next
```

### 5. Runner Technique
Use two pointers moving at different speeds.

```python
# Remove nth node from end
def remove_nth_from_end(head, n):
    dummy = ListNode(0)
    dummy.next = head
    first = second = dummy
    
    # Move first n+1 steps ahead
    for _ in range(n + 1):
        first = first.next
    
    # Move both until first reaches end
    while first:
        first = first.next
        second = second.next
    
    # Remove nth from end
    second.next = second.next.next
    return dummy.next
```

## Common Techniques

### 1. Recursive Approach
Many linked list problems can be solved recursively.

```python
def reverse_list_recursive(head):
    if not head or not head.next:
        return head
    
    new_head = reverse_list_recursive(head.next)
    head.next.next = head
    head.next = None
    return new_head
```

### 2. In-Place Operations
Modify the list without extra space.

```python
def delete_node(node):
    """Delete a node (not tail) given only access to that node"""
    node.val = node.next.val
    node.next = node.next.next
```

### 3. Splitting and Rejoining
Break list into parts and recombine.

```python
def reorder_list(head):
    if not head or not head.next:
        return
    
    # Find middle
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    
    # Reverse second half
    second = slow.next
    slow.next = None
    second = reverse_list(second)
    
    # Merge two halves
    first = head
    while second:
        temp1, temp2 = first.next, second.next
        first.next = second
        second.next = temp1
        first, second = temp1, temp2
```

## When to Use

- **Frequent insertions/deletions** at beginning
- **Unknown size** that changes dynamically
- **Memory efficiency** when size varies
- **No random access** needed

## Advantages

- **Dynamic size** - No fixed capacity
- **Efficient insertion/deletion** at head (O(1))
- **Memory efficient** - Allocates only what's needed

## Disadvantages

- **No random access** - O(n) to access by index
- **Extra memory** - Pointers require additional space
- **Cache unfriendly** - Non-contiguous memory
- **Reverse traversal** - Difficult in singly linked list

## Common Pitfalls

1. **Null pointer exceptions** - Always check if node is None
2. **Losing references** - Save next pointer before modifying
3. **Off-by-one errors** - Careful with loop conditions
4. **Memory leaks** - Break cycles in circular lists (language dependent)
5. **Forgetting dummy head** - Simplifies many operations

## Tips for LeetCode

1. **Draw diagrams** - Visualize pointer movements
2. **Use dummy head** - Simplifies edge cases
3. **Check for cycles** - Use Floyd's algorithm
4. **Two pointer technique** - Very common pattern
5. **Recursive base cases** - Empty list and single node
6. **Save next pointer** - Before modifying current node
7. **Test with small lists** - Single node, two nodes, etc.
8. **Consider space complexity** - Recursive solutions use stack space
