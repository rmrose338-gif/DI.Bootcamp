 # Exercise 1: Concatenate lists without using +
list_one = [1, 2, 3]
list_two = [4, 5, 6]
concatenated_list = list_one.copy()
concatenated_list.extend(list_two)
print("Concatenated list:", concatenated_list)

# Exercise 2: Multiples of 5 and 7
for number in range(1500, 2501):
	if number % 5 == 0 and number % 7 == 0:
		print(number)

# Exercise 3: Check the index
names = ["Samus", "Cortana", "V", "Link", "Mario", "Cortana", "Samus"]
name_to_find = input("Enter a name: ")

if name_to_find in names:
	print(names.index(name_to_find))
else:
	print(f"{name_to_find} is not in the names list.")

# Exercise 4: Greatest number
first_number = float(input("Input the 1st number: "))
second_number = float(input("Input the 2nd number: "))
third_number = float(input("Input the 3rd number: "))
greatest_number = max(first_number, second_number, third_number)
print("The greatest number is:", greatest_number)

# Exercise 5: The alphabet
alphabet = "abcdefghijklmnopqrstuvwxyz"
for letter in alphabet:
	if letter in "aeiou":
		print(f"{letter} is a vowel.")
	else:
		print(f"{letter} is a consonant.")

# Exercise 6: Words and letters
words = []
for index in range(7):
	words.append(input(f"Enter word {index + 1}: "))

letter = input("Enter a single character: ")
while len(letter) != 1:
	letter = input("Please enter exactly one character: ")

for word in words:
	if letter in word:
		print(f"The first {letter} in {word} is at index {word.index(letter)}.")
	else:
		print(f"The letter {letter} was not found in {word}.")

# Exercise 7: Min, max, and sum
numbers = list(range(1, 1_000_001))
print("Minimum:", min(numbers))
print("Maximum:", max(numbers))
print("Sum:", sum(numbers))

# Exercise 8: List and tuple
number_sequence = input("Enter comma-separated numbers: ")
number_list = number_sequence.split(",")
number_tuple = tuple(number_list)
print(number_list)
print(number_tuple)

# Exercise 9: Random number guessing game
import random

games_won = 0
games_lost = 0

while True:
	guess_input = input("Guess a number from 1 to 9, or type 'quit': ").strip()
	if guess_input.lower() == "quit":
		break

	if not guess_input.isdigit() or not 1 <= int(guess_input) <= 9:
		print("Please enter a whole number from 1 to 9.")
		continue

	guess = int(guess_input)
	random_number = random.randint(1, 9)
	if guess == random_number:
		print("Winner")
		games_won += 1
	else:
		print(f"Better luck next time. The number was {random_number}.")
		games_lost += 1

print(f"Games won: {games_won}")
print(f"Games lost: {games_lost}")
