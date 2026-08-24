
# Exercise 1

# Pattern 1
for row in range(1, 6, 2):
    print(" " * ((5 - row) // 2) + "*" * row)


print()

# Pattern 2
for row in range(1, 6):
    print(" " * (5 - row) + "*" * row)


print()

# Pattern 3
for row in range(1, 6):
    print("*" * row)

for row in range(5, 0, -1):
    print(" " * (5 - row) + "*" * row)


# Exercise 2

my_list = [2, 24, 12, 354, 233]

# Go through each position except the last one.
for i in range(len(my_list) - 1):

    # Assume the current position contains the smallest value.
    minimum = i

    # Compare it with all values after it.
    for j in range(i + 1, len(my_list)):

        # If a smaller value is found, save its index.
        if my_list[j] < my_list[minimum]:
            minimum = j

            # Swap the values if the smaller value is not
            # already at the current position.
            if minimum != i:
                my_list[i], my_list[minimum] = (
                    my_list[minimum],
                    my_list[i]
                )

print(my_list)

# Final output:
# [2, 12, 24, 233, 354]
