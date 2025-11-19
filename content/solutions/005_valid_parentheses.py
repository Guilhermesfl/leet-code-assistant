# Notes: I wanted to always keep track of what was the last opening element so whenever I found a closing element I could match to see if it was a valid pair. If it was a valid pair, I would remove the last opening element and check the previous one. 
# Time complexity: O(n) - external loop O(n)
# Memory complexity: O(n) the stack can have at maximum n element. the pairs dictionary takes O(1) space 
# I am not sure about time complexity to calculate stack len.

# Problem: Valid Parentheses

# Solution:
class Solution(object):
    def isValid(self, s):
        """
        :type s: str
        :rtype: bool
        """
        pairs = {"(": ")", "{": "}", "[": "]"}
        stack = []
        for char in s: # O(n)
            if char not in pairs and not stack: # O(1)
                return False
            
            if char in pairs: # O(1)
                stack.append(char) # O(1)
                continue
            
            popped_element = stack.pop() # O(1)
            if pairs[popped_element] != char:
                return False
        
        return len(stack) == 0 # O(1)

# ------------------------------------------------------------
# Core Lessons from Valid Parentheses Problem
#
# 1. Data Structure Choice: A stack is ideal for matching nested/open-close pairs
#    because it naturally tracks the most recent unmatched opening symbol.
# 2. One Pass Processing: You can validate the string in a single left-to-right pass
#    by pushing openings and checking closings against the stack top.
# 3. Constant-Time Operations: push (append), pop, and top (stack[-1]) are O(1) on a Python list,
#    keeping overall time complexity O(n).
# 4. Mapping Strategy: Maintaining a mapping of opening->closing (or closing->opening) brackets
#    enables O(1) validation of pairs; choosing direction can reduce lookups.
# 5. Early Failure: Returning False immediately on a mismatch or illegal closing improves clarity
#    and avoids unnecessary work.
# 6. Edge Cases: Empty string is valid (returns True); a first character that is a closing bracket
#    must fail; leftover items in the stack at the end mean unmatched openings.
# 7. Space Complexity: Worst-case space is O(n) when all characters are openings before any closing.
# 8. Pattern Recognition: This is a classic delimiter matching pattern; the same approach generalizes
#    to validating expressions, HTML/XML tags (with modifications), and other balanced constructs.
# 9. Parity Insight: If you add an early length parity check (len(s) % 2 == 1) you can sometimes
#    short-circuit impossible cases (optional micro-optimization).
# 10. Clean Abstraction: Separating bracket logic into a dictionary keeps code readable and avoids
#     long chains of conditional comparisons.
# ------------------------------------------------------------