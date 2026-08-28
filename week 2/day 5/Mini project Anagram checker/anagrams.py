from anagram_checker import AnagramChecker


def get_word():
    word = input("Enter a word: ").strip()
    if len(word.split()) != 1:
        print("Error: please enter only one word.")
        return None
    if not word.isalpha():
        print("Error: use alphabetic characters only.")
        return None
    return word


def main():
    try:
        checker = AnagramChecker()
    except FileNotFoundError:
        print("Error: place sowpods.txt or sowpods.zip in this folder first.")
        return

    while True:
        print("\n1. Enter a word")
        print("2. Exit")
        choice = input("Choose an option: ").strip()

        if choice == "1":
            word = get_word()
            if word is None:
                continue
            valid = checker.is_valid_word(word)
            anagrams = checker.get_anagrams(word) if valid else []
            print(f"\nYour word: {word}")
            print(f"Valid word: {'Yes' if valid else 'No'}")
            print(f"Anagrams: {', '.join(anagrams) if anagrams else 'None found'}")
        elif choice == "2":
            print("Goodbye!")
            break
        else:
            print("Error: choose 1 or 2.")


if __name__ == "__main__":
    main()
