from datetime import date, datetime


def display_cake(candle_count):
	print(f"       ___{'i' * candle_count}___")
	print("      |:H:a:p:p:y:|")
	print("    __|___________|__")
	print("   |^^^^^^^^^^^^^^^^^|")
	print("   |:B:i:r:t:h:d:a:y:|")
	print("   |                 |")
	print("   ~~~~~~~~~~~~~~~~~~~")


while True:
	birthdate_text = input("Enter your birthdate (DD/MM/YYYY): ").strip()
	try:
		birthdate = datetime.strptime(birthdate_text, "%d/%m/%Y").date()
		if birthdate > date.today():
			raise ValueError
		break
	except ValueError:
		print("Please enter a valid date in DD/MM/YYYY format.")

today = date.today()
age = today.year - birthdate.year
if (today.month, today.day) < (birthdate.month, birthdate.day):
	age -= 1

candle_count = age % 10
print(f"You are {age} years old.")
display_cake(candle_count)

is_leap_year = birthdate.year % 4 == 0 and (
	birthdate.year % 100 != 0 or birthdate.year % 400 == 0
)
if is_leap_year:
	print("You were born in a leap year, so here is a second cake!")
	display_cake(candle_count)
