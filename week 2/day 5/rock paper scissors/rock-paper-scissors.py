from game import Game


def get_user_menu_choice():
    options = {
        "1": "play",
        "2": "scores",
        "3": "quit",
    }
    while True:
        print("\n1. Play a new game")
        print("2. Show scores")
        print("3. Quit")
        choice = input("Choose an option: ").strip().lower()
        if choice in options:
            return options[choice]
        if choice in options.values():
            return choice
        print("Invalid choice. Please choose 1, 2, or 3.")


def print_results(results):
    print("\nGame summary")
    print(f"Wins: {results['win']}")
    print(f"Losses: {results['loss']}")
    print(f"Draws: {results['draw']}")
    print("Thank you for playing!")


def main():
    results = {"win": 0, "loss": 0, "draw": 0}
    game = Game()
    while True:
        choice = get_user_menu_choice()
        if choice == "play":
            results[game.play()] += 1
        elif choice == "scores":
            print_results(results)
        else:
            print_results(results)
            return


if __name__ == "__main__":
    main()
