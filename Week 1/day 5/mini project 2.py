#mini project2
import random

wordslist = [
    "correction",
    "childish",
    "beach",
    "python",
    "assertive",
    "interference",
    "complete",
    "share",
    "credit card",
    "rush",
    "south"
]

word = random.choice(wordslist)
guessed_letters = set()
wrong_guesses = 0
body_parts = [
    "head",
    "body",
    "left arm",
    "right arm",
    "left leg",
    "right leg"
]

print("Welcome to Hangman!")

while wrong_guesses < 6:
    display_word = ""

    for character in word:
        if character == " ":
            display_word += "  "
        elif character in guessed_letters:
            display_word += character + " "
        else:
            display_word += "* "

    print("\nWord:", display_word)
    print(f"Incorrect guesses: {wrong_guesses}/6")

    if all(
        character == " " or character in guessed_letters
        for character in word
    ):
        print("Congratulations! You solved the word!")
        print("The word was:", word)
        break

    letter = input("Guess a letter: ").lower().strip()

    if len(letter) != 1 or not letter.isalpha():
        print("Please enter one letter.")
        continue

    if letter in guessed_letters:
        print("You already guessed that letter.")
        continue

    guessed_letters.add(letter)

    if letter in word:
        print("Correct!")
    else:
        print(f"Incorrect! The {body_parts[wrong_guesses]} was added.")
        wrong_guesses += 1
else:
    print("\nYou lost!")
    print("The word was:", word)