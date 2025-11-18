# Tries (Prefix Trees)

## Overview

A trie (pronounced "try") is a tree-like data structure used for efficient storage and retrieval of strings, especially for prefix-based operations.

## Structure

```python
class TrieNode:
    def __init__(self):
        self.children = {}  # or [None] * 26 for lowercase letters
        self.is_end_of_word = False
        # Optional: store word, count, etc.
```

## Basic Implementation

```python
class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        """Insert a word into the trie - O(m) where m is word length"""
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
    
    def search(self, word):
        """Search for exact word - O(m)"""
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word
    
    def starts_with(self, prefix):
        """Check if any word starts with prefix - O(m)"""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True
    
    def delete(self, word):
        """Delete a word from trie"""
        def _delete(node, word, index):
            if index == len(word):
                if not node.is_end_of_word:
                    return False
                node.is_end_of_word = False
                return len(node.children) == 0
            
            char = word[index]
            if char not in node.children:
                return False
            
            should_delete_child = _delete(node.children[char], word, index + 1)
            
            if should_delete_child:
                del node.children[char]
                return len(node.children) == 0 and not node.is_end_of_word
            
            return False
        
        _delete(self.root, word, 0)
```

## Operations Complexity

| Operation | Time Complexity | Space Complexity | Notes |
|-----------|----------------|------------------|-------|
| Insert | O(m) | O(m) | m = word length |
| Search | O(m) | O(1) | Exact match |
| Prefix search | O(m) | O(1) | Check if prefix exists |
| Delete | O(m) | O(1) | Remove word |
| Autocomplete | O(p + n) | O(n) | p = prefix, n = results |

**Space**: O(ALPHABET_SIZE * N * M) worst case, where N = number of words, M = average length

## Common Patterns

### 1. Word Search with Wildcards

```python
class WordDictionary:
    def __init__(self):
        self.root = TrieNode()
    
    def add_word(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
    
    def search(self, word):
        def dfs(node, i):
            if i == len(word):
                return node.is_end_of_word
            
            if word[i] == '.':
                for child in node.children.values():
                    if dfs(child, i + 1):
                        return True
                return False
            
            if word[i] not in node.children:
                return False
            return dfs(node.children[word[i]], i + 1)
        
        return dfs(self.root, 0)
```

### 2. Autocomplete/Word Suggestions

```python
class AutocompleteSystem:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True
    
    def get_suggestions(self, prefix):
        """Get all words with given prefix"""
        node = self.root
        
        # Navigate to prefix
        for char in prefix:
            if char not in node.children:
                return []
            node = node.children[char]
        
        # Find all words from this node
        results = []
        self._collect_words(node, prefix, results)
        return results
    
    def _collect_words(self, node, prefix, results):
        if node.is_end_of_word:
            results.append(prefix)
        
        for char, child in node.children.items():
            self._collect_words(child, prefix + char, results)
```

### 3. Longest Common Prefix

```python
def longest_common_prefix(words):
    if not words:
        return ""
    
    trie = Trie()
    for word in words:
        trie.insert(word)
    
    prefix = []
    node = trie.root
    
    while len(node.children) == 1 and not node.is_end_of_word:
        char = next(iter(node.children))
        prefix.append(char)
        node = node.children[char]
    
    return ''.join(prefix)
```

### 4. Word Search II (In Grid)

```python
def find_words(board, words):
    # Build trie
    trie = Trie()
    for word in words:
        trie.insert(word)
    
    rows, cols = len(board), len(board[0])
    result = set()
    
    def dfs(r, c, node, path):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        
        char = board[r][c]
        if char not in node.children or char == '#':
            return
        
        node = node.children[char]
        path += char
        
        if node.is_end_of_word:
            result.add(path)
        
        # Mark as visited
        temp = board[r][c]
        board[r][c] = '#'
        
        # Explore neighbors
        dfs(r + 1, c, node, path)
        dfs(r - 1, c, node, path)
        dfs(r, c + 1, node, path)
        dfs(r, c - 1, node, path)
        
        # Restore
        board[r][c] = temp
    
    for r in range(rows):
        for c in range(cols):
            dfs(r, c, trie.root, "")
    
    return list(result)
```

### 5. Replace Words (Dictionary)

```python
def replace_words(dictionary, sentence):
    trie = Trie()
    for root in dictionary:
        trie.insert(root)
    
    def find_root(word):
        node = trie.root
        prefix = []
        for char in word:
            if char not in node.children:
                return word
            node = node.children[char]
            prefix.append(char)
            if node.is_end_of_word:
                return ''.join(prefix)
        return word
    
    words = sentence.split()
    return ' '.join(find_root(word) for word in words)
```

## Variations

### 1. Trie with Count

```python
class TrieNodeWithCount:
    def __init__(self):
        self.children = {}
        self.count = 0  # Number of words passing through this node
        self.is_end = False

# Useful for: word frequency, ranking suggestions
```

### 2. Compressed Trie (Radix Tree)

```python
class RadixNode:
    def __init__(self):
        self.children = {}
        self.is_end = False
        self.edge_label = ""  # Store common prefix

# More space-efficient for sparse tries
```

### 3. Ternary Search Tree

Hybrid between BST and trie, more space-efficient.

```python
class TSTNode:
    def __init__(self, char):
        self.char = char
        self.left = None
        self.middle = None
        self.right = None
        self.is_end = False
```

## When to Use

### Tries
- **Autocomplete** systems
- **Spell checkers**
- **IP routing** tables
- **Dictionary** implementations
- **Prefix matching** in strings
- **Word games** (Boggle, Scrabble)
- **Phone directory**

### Not Ideal For
- Simple string search (use hash map)
- No prefix operations needed
- Very sparse data (memory inefficient)
- Single pattern matching

## Advantages

1. **Fast prefix operations** - O(m) for prefix of length m
2. **Predictable performance** - No hash collisions
3. **Lexicographic ordering** - Natural alphabetical sort
4. **Multiple string operations** - Check many patterns efficiently
5. **Space sharing** - Common prefixes stored once

## Disadvantages

1. **Memory intensive** - Each node stores multiple pointers
2. **Cache unfriendly** - Pointer chasing
3. **Slower than hash** - For single exact-match lookup
4. **Complex implementation** - More code than hash map

## Trie vs Hash Map

| Feature | Trie | Hash Map |
|---------|------|----------|
| Exact search | O(m) | O(m) avg |
| Prefix search | O(m) | O(n * m) |
| Insert | O(m) | O(m) avg |
| Memory | Higher | Lower |
| Ordered | Yes | No |
| Collision | No | Yes |

## Common Pitfalls

1. **Not marking end of word** - Can't distinguish prefixes from complete words
2. **Memory leaks** - Forgetting to delete nodes in delete operation
3. **Case sensitivity** - Convert to lowercase if needed
4. **Empty string** - Handle as special case
5. **Non-ASCII characters** - Use dict instead of array

## Optimization Tips

1. **Use array for children** - If alphabet is small and fixed
2. **Lazy deletion** - Just mark `is_end_of_word = False`
3. **Path compression** - Compress single-child paths
4. **Limit depth** - For autocomplete, stop after certain depth
5. **Cache results** - Store frequent prefix results

## Tips for LeetCode

1. **Dictionary of words** - Consider trie
2. **Prefix operations** - Trie is ideal
3. **Multiple pattern search** - Trie beats repeated searches
4. **Word games** - Backtracking + trie
5. **Autocomplete** - Natural trie application
6. **Start with basic implementation** - Add features as needed
7. **TrieNode design** - Think about what to store
8. **DFS for word collection** - Common pattern
9. **Wildcard search** - Recursive DFS through children
