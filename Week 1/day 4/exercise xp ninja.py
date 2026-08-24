import string


# Exercise 1
def get_full_name(first_name, last_name, middle_name=None):
	parts = [first_name, middle_name, last_name] if middle_name else [first_name, last_name]
	return " ".join(part.capitalize() for part in parts)


print(get_full_name(first_name="john", middle_name="hooker", last_name="lee"))
print(get_full_name(first_name="bruce", last_name="lee"))


# Exercise 2
MORSE_CODE = {
	letter: code
	for letter, code in zip(
		string.ascii_uppercase,
		[
			".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..",
			".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.",
			"...", "-", "..-", "...-", ".--", "-..-", "-.--", "--.."
		]
	)
}


def english_to_morse(text):
	return "/".join(
		" ".join(MORSE_CODE[letter] for letter in word if letter in MORSE_CODE)
		for word in text.upper().split()
	)


def morse_to_english(morse):
	decode_table = {code: letter for letter, code in MORSE_CODE.items()}
	return " ".join(
		"".join(decode_table[code] for code in word.split())
		for word in morse.split("/")
	)


encoded_message = english_to_morse("Hello World")
print(encoded_message)
print(morse_to_english(encoded_message))


# Exercise 3
def box_printer(*words):
	longest_word = max((len(word) for word in words), default=0)
	border = "*" * (longest_word + 4)

	print(border)
	for word in words:
		print(f"* {word.ljust(longest_word)} *")
	print(border)


box_printer("Hello", "World", "in", "reallylongword", "a", "frame")


# Exercise 4
def insertion_sort(alist):
	for index in range(1, len(alist)):
		current_value = alist[index]
		position = index

		while position > 0 and alist[position - 1] > current_value:
			alist[position] = alist[position - 1]
			position -= 1

		alist[position] = current_value


alist = [54, 26, 93, 17, 77, 31, 44, 55, 20]
insertion_sort(alist)
print(alist)
print("The code uses insertion sort to arrange a list of numbers in ascending order.")

