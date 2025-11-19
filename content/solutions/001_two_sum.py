# Notes: I wanted to avoid using bruteforce. To do this, I used a hash map that has O(1) lookup time and stored the correspondent index of the elements.
# afterwards, I ran through the list again and check if the complement exists in the hash map and return the index and the current index.
# Big O Analysys:
# Time Complexity: O(n) - We traverse the list twice, but each traversal is O(n), so the overall time complexity is O(n).
# Space Complexity: O(n) - We use a hash map to store the elements and their indices, which takes up O(n) space in the worst case.

# Problem: Two Sum

# Solution:
class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        numbers_hash = {}
        for index, number in enumerate(nums):
            numbers_hash[number] = index

        for index, number in enumerate(nums):
            complement = target - number
            if numbers_hash.get(complement) != None and index != numbers_hash.get(complement):
                return [numbers_hash.get(complement), index]
        