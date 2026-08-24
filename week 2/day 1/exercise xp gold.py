#exercise1
import math


class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius

    def perimeter(self):
        return 2 * math.pi * self.radius

    def area(self):
        return math.pi * self.radius ** 2

    def definition(self):
        print(
            "A circle is a shape where every point on its boundary "
            "is the same distance from its center."
        )


circle = Circle(5)

print(f"Perimeter: {circle.perimeter():.2f}")
print(f"Area: {circle.area():.2f}")
circle.definition()





# Exercise 2: Custom List Class
import random


class MyList:
    def __init__(self, letters):
        self.letters = letters

    def reversed_list(self):
        return self.letters[::-1]

    def sorted_list(self):
        return sorted(self.letters)

    def random_numbers(self):
        return [random.randint(1, 100) for _ in self.letters]


my_list = MyList(["d", "a", "c", "b"])

print("Reversed:", my_list.reversed_list())
print("Sorted:", my_list.sorted_list())
print("Random numbers:", my_list.random_numbers())


class MenuManager:
    def __init__(self):
        self.menu = [
            {"name": "Soup", "price": 10, "spice": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice": "C", "gluten": False},
            {"name": "Beef bourguignon", "price": 25, "spice": "B", "gluten": True},
        ]

    def add_item(self, name, price, spice, gluten):
        self.menu.append({
            "name": name,
            "price": price,
            "spice": spice,
            "gluten": gluten,
        })

    def update_item(self, name, price, spice, gluten):
        for dish in self.menu:
            if dish["name"].lower() == name.lower():
                dish.update({
                    "price": price,
                    "spice": spice,
                    "gluten": gluten,
                })
                return

        print(f"{name} is not in the menu.")

    def remove_item(self, name):
        for dish in self.menu:
            if dish["name"].lower() == name.lower():
                self.menu.remove(dish)
                print(self.menu)
                return

        print(f"{name} is not in the menu.")


menu_manager = MenuManager()

menu_manager.add_item("Pizza", 20, "B", True)
menu_manager.update_item("Soup", 12, "A", False)
menu_manager.remove_item("Salad")
