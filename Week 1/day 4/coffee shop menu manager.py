# Challenge
menu = {
    "espresso": 7.0,
    "latte": 12.0,
    "cappuccino": 10.0
}


def show_menu(menu_dict):
    """Print all drinks and prices."""
    if not menu_dict:
        print("The menu is empty.")
        return

    print("Current menu:")
    for drink, price in menu_dict.items():
        print(f"{drink} - {price}₪")


def add_item(menu_dict):
    """Add a new drink to the menu."""
    drink = input("Enter new drink name: ")

    if drink in menu_dict:
        print("Item already exists!")
        return

    price = float(input("Enter price: "))
    menu_dict[drink] = price
    print(f'"{drink}" added!')


def update_price(menu_dict):
    """Change the price of an existing drink."""
    drink = input("Which drink do you want to update? ")

    if drink not in menu_dict:
        print("Item not found.")
        return

    new_price = float(input("Enter the new price: "))
    menu_dict[drink] = new_price
    print("Price updated!")


def delete_item(menu_dict):
    """Remove a drink from the menu."""
    drink = input("Which drink do you want to delete? ")

    if drink in menu_dict:
        del menu_dict[drink]
        print("Item deleted.")
    else:
        print("Item not found.")


def show_options():
    """Print the available actions."""
    print("What would you like to do?")
    print("1. Show menu")
    print("2. Add item")
    print("3. Update price")
    print("4. Delete item")
    print("5. Exit")


def run_coffee_shop():
    """Main loop of the program."""
    while True:
        show_options()
        choice = input("> ")

        if choice == "1":
            show_menu(menu)
        elif choice == "2":
            add_item(menu)
        elif choice == "3":
            update_price(menu)
        elif choice == "4":
            delete_item(menu)
        elif choice == "5":
            print("Goodbye!")
            break
        else:
            print("Invalid choice, try again.")


# Extra challenges
menu = {
    "espresso": 7.0,
    "latte": 12.0,
    "cappuccino": 10.0
}


def show_menu(menu_dict):
    if not menu_dict:
        print("The menu is empty.")
        return

    print("Current menu:")
    for drink, price in menu_dict.items():
        print(f"{drink} - {price}₪")


def add_item(menu_dict):
    drink = input("Enter new drink name: ")

    if drink in menu_dict:
        print("Item already exists!")
        return

    price = float(input("Enter price: "))

    if price < 0:
        print("Invalid price.")
        return

    menu_dict[drink] = price
    print(f'"{drink}" added!')


def update_price(menu_dict):
    drink = input("Which drink do you want to update? ")

    if drink not in menu_dict:
        print("Item not found.")
        return

    new_price = float(input("Enter the new price: "))

    if new_price < 0:
        print("Invalid price.")
        return

    menu_dict[drink] = new_price
    print("Price updated!")


def delete_item(menu_dict):
    drink = input("Which drink do you want to delete? ")

    if drink in menu_dict:
        del menu_dict[drink]
        print("Item deleted.")
    else:
        print("Item not found.")


def search_item(menu_dict):
    drink = input("Which drink are you looking for? ")

    if drink in menu_dict:
        print(f"{drink} - {menu_dict[drink]}₪")
    else:
        print("Not in the menu.")


def apply_discount(menu_dict, percent):
    for drink in menu_dict:
        menu_dict[drink] *= (1 - percent / 100)


def show_options():
    print("What would you like to do?")
    print("1. Show menu")
    print("2. Add item")
    print("3. Update price")
    print("4. Delete item")
    print("5. Exit")
    print("6. Search item")
    print("7. Apply discount")


def run_coffee_shop():
    while True:
        show_options()
        choice = input("> ")

        if choice == "1":
            show_menu(menu)
        elif choice == "2":
            add_item(menu)
        elif choice == "3":
            update_price(menu)
        elif choice == "4":
            delete_item(menu)
        elif choice == "5":
            print("Goodbye!")
            break
        elif choice == "6":
            search_item(menu)
        elif choice == "7":
            percent = float(input("Enter discount percentage: "))

            if 0 <= percent <= 100:
                apply_discount(menu, percent)
                print("Discount applied!")
            else:
                print("Invalid discount.")
        else:
            print("Invalid choice, try again.")


run_coffee_shop()

