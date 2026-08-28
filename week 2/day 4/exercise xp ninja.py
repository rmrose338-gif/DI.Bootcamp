# Exercise 1: Restaurant Menu Manager - Regular Expressions
import json
import random
import re
from pathlib import Path


MENU_FILE = Path(__file__).with_name("restaurant_menu.json")
CONNECTION_WORDS = {"of", "and", "the", "in", "with", "for", "a", "an", "on", "to"}


def load_menu():
    with open(MENU_FILE, "r", encoding="utf-8") as file:
        menu = json.load(file)
    menu.setdefault("valentines_items", [])
    return menu


def save_menu(menu):
    with open(MENU_FILE, "w", encoding="utf-8") as file:
        json.dump(menu, file, indent=4)


def is_valid_item_name(name):
    words = name.split()
    if not words or not name.isascii() or re.search(r"\d", name):
        return False
    if not words[0].startswith("V") or name.lower().count("e") < 2:
        return False
    for word in words:
        if word.lower() in CONNECTION_WORDS:
            if word != word.lower():
                return False
        elif not word[0].isupper():
            return False
    return True


def is_valid_price(price):
    return re.fullmatch(r"\d{2},14", price.strip()) is not None


def display_heart():
    print("  *   *  ")
    print(" * * * * ")
    print("  * * *  ")
    print("   ***   ")
    print("    *    ")


def show_menu():
    menu = load_menu()
    display_heart()
    print("Restaurant menu:")
    for item in menu["items"]:
        print(f"- {item['name']}: {item['price']}")
    print("Valentine's menu:")
    for item in menu["valentines_items"]:
        print(f"- {item['name']}: {item['price']}")


def add_valentine_item():
    name = input("Valentine item name: ").strip()
    price = input("Price (XX,14): ").strip()
    if not is_valid_item_name(name):
        print("Invalid name.")
        return
    if not is_valid_price(price):
        print("Invalid price. Use the format XX,14.")
        return
    menu = load_menu()
    menu["valentines_items"].append({"name": name, "price": price})
    save_menu(menu)
    print("Valentine item added successfully.")


# Exercise 2: Dungeons & Dragons
class Character:
    ABILITIES = (
        "Strength",
        "Dexterity",
        "Constitution",
        "Intelligence",
        "Wisdom",
        "Charisma",
    )

    def __init__(self, name, age):
        self.name = name
        self.age = age
        self.attributes = {
            ability: self.roll_attribute() for ability in self.ABILITIES
        }

    @staticmethod
    def roll_attribute():
        dice = [random.randint(1, 6) for _ in range(4)]
        return sum(sorted(dice, reverse=True)[:3])

    def to_dict(self):
        return {
            "name": self.name,
            "age": self.age,
            "attributes": self.attributes,
        }


class Game:
    def __init__(self, player_count):
        self.characters = []
        for player_number in range(1, player_count + 1):
            print(f"\nPlayer {player_number}")
            name = input("Character name: ").strip()
            age = self.get_age()
            self.characters.append(Character(name, age))

    @staticmethod
    def get_age():
        while True:
            try:
                age = int(input("Character age: "))
                if age > 0:
                    return age
            except ValueError:
                pass
            print("Please enter a positive whole-number age.")

    def export_json(self, filename="characters.json"):
        output_file = Path(__file__).with_name(filename)
        with open(output_file, "w", encoding="utf-8") as file:
            json.dump([character.to_dict() for character in self.characters], file, indent=4)

    def export_txt(self, filename="characters.txt"):
        lines = []
        for character in self.characters:
            lines.append(f"Character: {character.name} (age {character.age})")
            for ability, score in character.attributes.items():
                lines.append(f"{ability}: {score}")
            lines.append("")
        output_file = Path(__file__).with_name(filename)
        output_file.write_text("\n".join(lines), encoding="utf-8")


def start_game():
    while True:
        try:
            player_count = int(input("How many players are playing? "))
            if player_count > 0:
                break
        except ValueError:
            pass
        print("Please enter a positive whole number.")

    game = Game(player_count)
    game.export_json()
    game.export_txt()
    print("Characters saved to characters.json and characters.txt.")


if __name__ == "__main__":
    print("1. Add Valentine item")
    print("2. Show menu")
    print("3. Create D&D characters")
    choice = input("Choose an option: ").strip()
    if choice == "1":
        add_valentine_item()
    elif choice == "2":
        show_menu()
    elif choice == "3":
        start_game()
