# Exercise 1
birthdays = {
	"Alice": "1990/04/12",
	"Bob": "1985/09/23",
	"Charlie": "1992/01/17",
	"Dana": "1988/06/30",
	"Eli": "1995/11/08"
}
    # Exercise 2
print("Welcome to the birthday lookup!")
print("You can look up the birthdays of the people in the list!")

# Exercise 3
new_name = input("Enter a new person's name: ")
new_birthday = input("Enter this person's birthday (YYYY/MM/DD): ")
birthdays[new_name] = new_birthday

print("Available names:")
for person in birthdays:
	print(person)

name = input("Enter a person's name: ")
birthday = birthdays.get(name)

if birthday:
	print(f"{name}'s birthday is {birthday}.")
else:
	print(f"Sorry, we don't have the birthday information for {name}")

#exercise4

items = {
	"banana": 4,
	"apple": 2,
	"orange": 1.5,
	"pear": 3
}

for item, price in items.items():
	print(f"The price of a {item} is ${price}.")

items = {
	"banana": {"price": 4, "stock": 10},
	"apple": {"price": 2, "stock": 5},
	"orange": {"price": 1.5, "stock": 24},
	"pear": {"price": 3, "stock": 1}
}

total_cost = sum(item["price"] * item["stock"] for item in items.values())
print(f"The total cost of all the items in stock is ${total_cost}.")


