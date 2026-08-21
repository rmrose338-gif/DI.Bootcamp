import random


# Exercise 1
def get_age(year, month, day):
	current_year = 2026
	current_month = 8
	age = current_year - year

	if month > current_month:
		age -= 1

	return age


def can_retire(gender, date_of_birth):
	year, month, day = map(int, date_of_birth.split("/"))
	age = get_age(year, month, day)
	retirement_age = 67 if gender.lower() == "m" else 62
	return age >= retirement_age


def retirement_demo():
	gender = input("Enter your gender (m/f): ")
	date_of_birth = input("Enter your date of birth (yyyy/mm/dd): ")

	if can_retire(gender, date_of_birth):
		print("You can retire.")
	else:
		print("You cannot retire yet.")


# Exercise 2
def sum_numbers(x):
	return int(str(x) + str(x)) + int(str(x) * 3) + int(str(x) * 4) + x


# Exercise 3
def throw_dice():
	return random.randint(1, 6)


def throw_until_doubles():
	throws = 0

	while True:
		first_die = throw_dice()
		second_die = throw_dice()
		throws += 1

		if first_die == second_die:
			return throws


def main():
	results = [throw_until_doubles() for _ in range(100)]
	print(f"Total throws: {sum(results)}")
	print(f"Average throws to reach doubles: {sum(results) / len(results):.2f}")


if __name__ == "__main__":
	retirement_demo()
	print(f"Sum for 3: {sum_numbers(3)}")
	main()

