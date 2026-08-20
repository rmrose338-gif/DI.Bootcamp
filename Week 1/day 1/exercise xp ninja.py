# Exercise 1: PATH and Python aliases
# On Windows, run these commands in the terminal:
# python
# py
# PATH contains directories that Windows searches for executable programs.
# Python can be launched from another directory because its install directory
# is included in PATH. The py command is the Windows Python Launcher alias.

# Exercise 3: Outputs
# 3 <= 3 < 9       -> True
# 3 == 3 == 3      -> True
# bool(0)          -> False
# bool(5 == "5")   -> False
# bool(4 == 4) == bool("4" == "4") -> True
# bool(bool(None)) -> False

x = (1 == True)
y = (1 == False)
a = True + 4
b = False + 10

print("x is", x)
print("y is", y)
print("a:", a)
print("b:", b)

# Exercise 4: How many characters in a sentence?
my_text = """Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit
esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident,
sunt in culpa qui officia deserunt mollit anim id est laborum."""
print(len(my_text))

# Exercise 5: Longest word without the letter A
longest_sentence = "Longest word without the letter A"


while True:
	user_sentence = input("Enter a sentence without the letter A: ")

	if "a" in user_sentence.lower():
		print("That sentence contains the letter A. Try again.")
	elif len(user_sentence) > len(longest_sentence):
		longest_sentence = user_sentence
		print(f"Congratulations! New record: {len(longest_sentence)} characters.")
