my_fav_numbers = {3, 7, 21}

my_fav_numbers.add(42)
number_to_remove = 99
my_fav_numbers.add(number_to_remove)
my_fav_numbers.remove(number_to_remove)

friend_fav_numbers = {7, 13, 28}
our_fav_numbers = my_fav_numbers | friend_fav_numbers

print("My favorite numbers:", my_fav_numbers)
print("Friend's favorite numbers:", friend_fav_numbers)
print("Our favorite numbers:", our_fav_numbers)

#exercise2
numbers = (1, 2, 3)
try:
	numbers += (4, 5)
	print("Updated tuple:", numbers)
except TypeError:
	print("Tuples are immutable and cannot be changed.")

#exercise3
basket = ["Banana", "Apples", "Oranges", "Blueberries"]
basket.remove("Banana")
basket.remove("Blueberries")
basket.append("Kiwi")
basket.insert(0, "Apples")
print("Apples count:", basket.count("Apples"))
basket.clear()
print("Final basket:", basket)

#exercise4
# A float can contain a fractional part; an integer cannot.
mixed_numbers = [number / 2 for number in range(3, 11)]
print("Mixed numbers:", mixed_numbers)

#exercise5
for number in range(1, 21):
	print(number)

for number in range(1, 21):
	if number % 2 == 0:
		print(number)

#exercise6
while True:
	user_name = input("Enter your name: ").strip()
	if len(user_name) >= 3 and user_name.isalpha():
		print("Thank you")
		break
	print("Please enter a name with at least 3 letters.")

#exercise7
favorite_fruits = input("Enter your favorite fruits, separated by spaces: ").split()
chosen_fruit = input("Enter the name of a fruit: ").strip()

if chosen_fruit.lower() in [fruit.lower() for fruit in favorite_fruits]:
	print("You chose one of your favorite fruits! Enjoy!")
else:
	print("You chose a new fruit. I hope you enjoy it!")

#exercise8
toppings = []
while True:
	topping = input("Enter a pizza topping, or 'quit' to finish: ").strip()
	if topping.lower() == "quit":
		break
	toppings.append(topping)
	print(f"Adding {topping} to your pizza.")

total_cost = 10 + len(toppings) * 2.5
print("Toppings:", toppings)
print(f"Total cost: ${total_cost:.2f}")

#exercise9
ages = []
while True:
	age_input = input("Enter a family member's age, or press Enter to finish: ").strip()
	if not age_input:
		break
	ages.append(int(age_input))

total_cost = sum(0 if age < 3 else 10 if age <= 12 else 15 for age in ages)
print(f"Total ticket cost: ${total_cost:.2f}")

# Bonus: restricted movie attendees, ages 16 through 21.
attendee_ages = []
while True:
	age_input = input("Enter an attendee's age, or press Enter to finish: ").strip()
	if not age_input:
		break
	attendee_ages.append(int(age_input))

allowed_attendees = [age for age in attendee_ages if 16 <= age <= 21]
print("Allowed attendees:", allowed_attendees)

