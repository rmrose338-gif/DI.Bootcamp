from anagram_checker import AnagramChecker


MENU = """
--- Anagram Checker ---
1. Enter a word
2. Exit
"""


def get_valid_input():
    """Get and validate user input"""
    word = input("Enter one word: ").strip()
    if not word:
        print("Error: please enter a word.")
        return None
    if len(word.split()) != 1:
        print("Error: only one word is allowed.")
        return None
    if not word.isalpha():
        print("Error: use alphabetic characters only.")
        return None
    return word.casefold()


def show_word_result(checker, word):
    """Display word validity and anagrams"""
    is_valid = checker.is_valid_word(word)
    anagrams = checker.get_anagrams(word) if is_valid else []
    print(f"\nYour word: {word}")
    print(f"Valid word: {'Yes' if is_valid else 'No'}")
    if is_valid:
        print(f"Anagrams: {', '.join(anagrams) if anagrams else 'None found'}")
    else:
        print("Anagrams: unavailable because the word is not in the word list.")


def main():
    """Main menu loop"""
    try:
        checker = AnagramChecker()
    except FileNotFoundError:
        print("Error: sowpods.txt or sowpods.zip was not found in this folder.")
        return

    while True:
        print(MENU)
        choice = input("Choose an option: ").strip()
        if choice == "1":
            word = get_valid_input()
            if word is not None:
                show_word_result(checker, word)
        elif choice == "2":
            print("Goodbye!")
            return
        else:
            print("Error: choose 1 or 2.")


if __name__ == "__main__":
    main()
