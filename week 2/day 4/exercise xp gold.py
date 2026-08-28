# Exercise 1: Restaurant Menu Manager
import json
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import urlopen


MENU_FILE = Path(__file__).with_name("restaurant_menu.json")
API_KEY = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My"


class MenuManager:
    def __init__(self, filename=MENU_FILE):
        self.filename = Path(filename)
        with open(self.filename, "r", encoding="utf-8") as file:
            self.menu = json.load(file).get("items", [])

    def add_item(self, name, price):
        self.menu.append({"name": name, "price": float(price)})

    def remove_item(self, name):
        for index, item in enumerate(self.menu):
            if item["name"].casefold() == name.casefold():
                del self.menu[index]
                return True
        return False

    def save_to_file(self):
        with open(self.filename, "w", encoding="utf-8") as file:
            json.dump({"items": self.menu}, file, indent=4)


def show_restaurant_menu(manager):
    for item in manager.menu:
        print(f"- {item['name']}: ${item['price']:.2f}")


def show_user_menu(manager):
    while True:
        print("\n(a) Add an item\n(d) Delete an item\n(v) View menu\n(x) Exit")
        choice = input("Choose an option: ").strip().lower()
        if choice == "a":
            name = input("Enter the item name: ").strip()
            try:
                manager.add_item(name, float(input("Enter the item price: ")))
                print("item was added successfully")
            except ValueError:
                print("Invalid price input.")
        elif choice == "d":
            name = input("Enter the item name to remove: ").strip()
            if manager.remove_item(name):
                print("Item was deleted successfully.")
            else:
                print("There was an error: item was not found.")
        elif choice == "v":
            show_restaurant_menu(manager)
        elif choice == "x":
            manager.save_to_file()
            print("Menu was saved. Goodbye!")
            return
        else:
            print("Invalid choice, please try again.")


# Exercise 2: Giphy API #1
def fetch_gifs(search_term="hilarious", rating="g", limit=10):
    query = urlencode({"q": search_term, "rating": rating, "api_key": API_KEY, "limit": limit})
    url = f"https://api.giphy.com/v1/gifs/search?{query}"
    with urlopen(url, timeout=10) as response:
        if response.status != 200:
            return {}
        return json.loads(response.read().decode("utf-8"))


def get_tall_gifs(data, limit=10):
    gifs = [
        gif for gif in data.get("data", [])
        if int(gif.get("images", {}).get("original", {}).get("height", 0)) > 100
    ]
    return gifs[:limit]


def exercise_2():
    gifs = get_tall_gifs(fetch_gifs())
    print(f"Number of gifs with height > 100: {len(gifs)}")
    return gifs


# Exercise 3: Giphy API #2
def exercise_3():
    search_term = input("Enter a search term or phrase: ").strip()
    try:
        gifs = fetch_gifs(search_term, limit=50).get("data", []) if search_term else []
    except Exception:
        gifs = []
    if not gifs:
        print("Could not find the requested term or phrase. Showing trending gifs instead.")
        query = urlencode({"api_key": API_KEY, "limit": 50})
        with urlopen(f"https://api.giphy.com/v1/gifs/trending?{query}", timeout=10) as response:
            gifs = json.loads(response.read().decode("utf-8")).get("data", [])
    for gif in gifs:
        print(gif.get("url"))


if __name__ == "__main__":
    show_user_menu(MenuManager())
