import random


#exercise1

def display_message():
	print("I am learning about functions in Python.")


display_message()

#exercise2

def favorite_book(title):
	print(f"One of my favorite books is {title}.")


favorite_book("Alice in Wonderland")

#exercise3

def describe_city(city, country="Unknown"):
	print(f"{city} is in {country}.")


describe_city("Reykjavik", "Iceland")
describe_city("Paris")


#exercise4

def random_number(number):
	random_number = random.randint(1, 100)

	if number == random_number:
		print("Success!")
	else:
		print(f"Fail! Your number: {number}, Random number: {random_number}")


random_number(50)

#exercise5

def make_shirt(size="large", text="I love Python"):
	print(f"The size of the shirt is {size} and the text is {text}.")


make_shirt()
make_shirt("medium")
make_shirt(size="small", text="Custom message")

#exercises6

magician_names = ["Harry Houdini", "David Blaine", "Criss Angel"]


def show_magicians(magician_names):
	for magician in magician_names:
		print(magician)


def make_great(magician_names):
	for index, magician in enumerate(magician_names):
		magician_names[index] = f"{magician} the Great"


make_great(magician_names)
show_magicians(magician_names)

#exercise7

def get_random_temp():
	return random.uniform(-10, 40)


def main():
	temperature = get_random_temp()
	print(f"The temperature right now is {temperature:.1f} degrees Celsius.")

	if temperature < 0:
		print("Brrr, that's freezing! Wear some extra layers today.")
	elif temperature < 16:
		print("Quite chilly! Don't forget your coat.")
	elif temperature <= 23:
		print("Nice weather.")
	elif temperature <= 32:
		print("A bit warm, stay hydrated.")
	else:
		print("It's really hot! Stay cool.")


main()




