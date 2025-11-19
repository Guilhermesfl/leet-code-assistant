# Notes: I used a hash map to count the frequency of each character in the first string. Then, I decremented the count based on the characters in the second string. If any count goes below zero or a character is not found, the strings are not anagrams.
# Big O Analysis:
# Time Complexity: O(n) - We traverse both strings once, where n is the length of the strings.
# Space Complexity: O(1) - The hash map will have at most 26 entries if we consider only lowercase English letters, which is constant space.

# Problem: Valid Anagram

# Solution:
class Solution(object):
    def isAnagram(self, s, t):
        """
        :type s: str
        :type t: str
        :rtype: bool
        """
        if len(s) != len(t):
            return False
        
        s_count = {}
        for char in s:
            s_count[char] = s_count.get(char, 0) + 1
        
        for char in t:
            if char not in s_count:
                return False
            
            s_count[char] -= 1
            if s_count[char] < 0:
                return False

        return True