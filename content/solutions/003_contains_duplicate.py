# Notes: I used the counter approach to check if an element appears more than once.
# Big O
# Space O(n)
# Time O(n)

# Problem: Contains Duplicate

# Solution:
class Solution(object):
    def containsDuplicate(self, nums):
        """
        :type nums: List[int]
        :rtype: bool
        """
        seen = set()
        for num in nums:
            if num in seen:
                return True
            seen.add(num)
        return False