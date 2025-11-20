# Math & Bit Operations

## Pattern Overview

Math and bit manipulation problems use arithmetic, bitwise operators, and number properties to solve efficiently. Useful for optimization and low-level operations.

## When to Use

- Problems involving powers, parity, or divisibility
- Bit masking, counting bits
- Fast arithmetic operations

## Key Variations

- **Bit masking:** Use AND, OR, XOR to manipulate bits
- **Counting bits:** Count set bits in numbers
- **Math tricks:** Use properties for optimization

## Example Problems

- Power of Two
- Number of 1 Bits
- Reverse Bits
- Sqrt(x)

## Template

```python
# Count set bits
count = 0
n = x
while n:
    count += n & 1
    n >>= 1

# Check power of two
is_power = x > 0 and (x & (x - 1)) == 0
```

## Tips

- Know common bitwise operations
- Use math properties for shortcuts
- Useful for O(1) solutions

## Practice

Try problems on bit counting, power checks, and math tricks.
