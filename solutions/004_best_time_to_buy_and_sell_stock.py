# Notes: I want to keep track of the buy price and the profit so I could fint the best selling time. To do this, I inialize the two values and update the buying price when there is an opportunity but only update the profit if it is greater than what I currently have and happens in the future.
# Complexity:
# Time: O(n)
# Space: O(1)

# Problem: Best Time to Buy and Sell Stock

# Solution:
class Solution(object):
    def maxProfit(self, prices):
        """
        :type prices: List[int]
        :rtype: int
        """
        buy_price = float("+Inf")
        profit = 0
        for price in prices:
            # buy_price = min(buy_price, price)
            # profit = max(profit, price - buy_price)
            if price < buy_price:
                buy_price = price
                
            if price - buy_price > profit:
                profit = price - buy_price
        
        return profit