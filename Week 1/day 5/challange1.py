#excercise1

items = ["apple", "banana", "cherry"]

item = input("Enter an item: ")
index = int(input("Enter the index: "))

items.insert(index, item)

print(items)

# Exercise 2
text = input("Enter a string: ")
space_count = text.count(" ")

print("Number of spaces:", space_count)

# Exercise 3
text = input("Enter a string: ")

uppercase_count = 0
lowercase_count = 0

for character in text:
    if character.isupper():
        uppercase_count += 1
    elif character.islower():
        lowercase_count += 1

print("Number of uppercase letters:", uppercase_count)
print("Number of lowercase letters:", lowercase_count)


