 # Challenge 1: Multiples of a number
number = int(input("Enter a number: "))
length = int(input("Enter the length: "))
multiples = [number * index for index in range(1, length + 1)]
print(multiples)

# Challenge 2: Remove consecutive duplicate letters
word = input("Enter a word: ")
unique_consecutive_letters = []

for letter in word:
	if not unique_consecutive_letters or letter != unique_consecutive_letters[-1]:
		unique_consecutive_letters.append(letter)

print("".join(unique_consecutive_letters))
