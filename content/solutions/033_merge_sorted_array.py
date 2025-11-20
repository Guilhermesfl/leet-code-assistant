# Notes: I have two sorted lists. I know I have to traverse them but I am struggling on how to keep the references and initalize the variables. I can solve edge cases but I am not abre so far to move correctly the pointers.
# Complexity:
# Memory O(1) No extra space shuold be used
# Time O(n + m) time to traverse both arrays

# Problem: Merge Sorted Array

# Solution:
# Definition for singly-linked list.
# class ListNode(object):
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution(object):
    def mergeTwoLists(self, list1, list2):
        """
        :type list1: Optional[ListNode]
        :type list2: Optional[ListNode]
        :rtype: Optional[ListNode]
        """

        dummy = ListNode(0)
        pointer = dummy
            
        while list1 and list2:
            if list1.val < list2.val:
                pointer.next = list1
                list1 = list1.next
            else:
                pointer.next = list2
                list2 = list2.next

            pointer = pointer.next
        
        pointer.next = list1 if list1 else list2

        return dummy.next

# CORE LEARNINGS:
# 1. DUMMY HEAD PATTERN - The Key Technique
#    - Create a dummy node to avoid complex initialization logic
#    - Use TWO variables: dummy (anchor) and pointer (builder)
#    - dummy NEVER moves - it's your reference point
#    - pointer moves forward building the merged list
#    - Return dummy.next to skip the dummy node
#
# 2. POINTER MOVEMENT - Critical Rule
#    - After attaching a node: pointer.next = someNode
#    - ALWAYS move pointer forward: pointer = pointer.next
#    - Think: "Set next, THEN move"
#    - Forgetting this causes infinite loops or lost references
#
# 3. WHY DUMMY HEAD WORKS
#    - Without dummy: Need special logic to determine which list starts first
#    - With dummy: Start merging immediately, no special cases
#    - It's temporary scaffolding - used during construction, discarded at end
#    - Python garbage collector cleans it up after return
#
# 4. PATTERN RECOGNITION
#    - Use dummy head when: building/merging/removing nodes from linked lists
#    - Two-pointer technique: Compare values, attach smaller, advance that pointer
#    - Single pass solution: Process both lists simultaneously
#
# 5. EDGE CASES HANDLED NATURALLY
#    - Empty list1 or list2: While loop doesn't run, pointer.next handles it
#    - Unequal lengths: Final line attaches remaining nodes in one step
#    - All elements from one list smaller: Loop exits cleanly
#
# 6. WHEN TO USE THIS PATTERN
#    - Merging sorted lists
#    - Removing duplicates from sorted list
#    - Partitioning a linked list
#    - Any problem building a new list structure
#
# 7. COMMON MISTAKES TO AVOID
#    ❌ Making head and pointer the same without dummy
#    ❌ Forgetting to move pointer (pointer = pointer.next)
#    ❌ Returning dummy instead of dummy.next
#    ❌ Complex logic to handle which list starts first

        