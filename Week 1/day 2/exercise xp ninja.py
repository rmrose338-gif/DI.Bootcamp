import math
import random
import re
from collections import Counter


# Exercise 1: Formula
C = 50
H = 30
input_values = input("Enter comma-separated D values: ").split(",")
formula_results = [int(math.sqrt((2 * C * int(value.strip())) / H)) for value in input_values]
print(",".join(str(result) for result in formula_results))


# Exercise 2: List of integers
numbers = [3, 47, 99, -80, 22, 97, 54, -23, 5, 7]
print("Numbers:", numbers)
print("Descending:", sorted(numbers, reverse=True))
print("Sum:", sum(numbers))
print("First and last:", [numbers[0], numbers[-1]])
print("Greater than 50:", [number for number in numbers if number > 50])
print("Smaller than 10:", [number for number in numbers if number < 10])
print("Squared:", [number ** 2 for number in numbers])

unique_numbers = list(dict.fromkeys(numbers))
print("Without duplicates:", unique_numbers)
print("Unique count:", len(unique_numbers))
print("Average:", sum(numbers) / len(numbers))
print("Largest:", max(numbers))
print("Smallest:", min(numbers))

# Bonus: calculate summary values without built-in sum, max, or min.
manual_sum = 0
manual_largest = numbers[0]
manual_smallest = numbers[0]
for number in numbers:
	manual_sum += number
	if number > manual_largest:
		manual_largest = number
	if number < manual_smallest:
		manual_smallest = number
print("Manual sum:", manual_sum)
print("Manual average:", manual_sum / len(numbers))
print("Manual largest:", manual_largest)
print("Manual smallest:", manual_smallest)

# Bonuses: user-generated and random lists.
user_numbers = []
for index in range(10):
	while True:
		value = int(input(f"Enter integer {index + 1} between -100 and 100: "))
		if -100 <= value <= 100:
			user_numbers.append(value)
			break
		print("Please enter a number in the required range.")
print("User numbers:", user_numbers)

random_count = random.randint(50, 100)
random_numbers = [random.randint(-100, 100) for _ in range(random_count)]
print(f"Generated {len(random_numbers)} random numbers.")
print("The statistics work for any list length because they use len(numbers).")


# Exercise 3: Working on a paragraph
paragraph = (
	"Learning Python rewards curiosity and careful practice. "
	"Small experiments reveal how data, functions, and decisions work together. "
	"With patience, a difficult problem becomes a series of manageable questions."
)
sentences = [sentence for sentence in re.split(r"[.!?]+", paragraph) if sentence.strip()]
words = re.findall(r"\b[\w']+\b", paragraph.lower())
word_counts = Counter(words)
print("\nParagraph analysis:")
print("Characters:", len(paragraph))
print("Sentences:", len(sentences))
print("Words:", len(words))
print("Unique words:", len(word_counts))
print("Non-whitespace characters:", len("".join(paragraph.split())))
print("Average words per sentence:", len(words) / len(sentences))
print("Non-unique words:", sum(count - 1 for count in word_counts.values() if count > 1))


# Exercise 4: Frequency of the words
frequency_text = input("Enter text for word frequencies: ")
frequencies = Counter(frequency_text.split())
for word in sorted(frequencies):
	print(f"{word}:{frequencies[word]}")
