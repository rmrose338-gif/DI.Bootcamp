from datetime import date, datetime
import re
import secrets
import string


# Exercise 1: Upcoming Holiday
HOLIDAYS = (
	(1, 1, "New Year's Day"),
	(2, 14, "Valentine's Day"),
	(7, 4, "Independence Day"),
	(10, 31, "Halloween"),
	(12, 25, "Christmas Day"),
	(12, 31, "New Year's Eve"),
)


def display_next_holiday(today=None):
	"""Display today's date and the next holiday."""
	today = today or date.today()
	upcoming = []

	for month, day, name in HOLIDAYS:
		holiday_date = date(today.year, month, day)
		if holiday_date < today:
			holiday_date = date(today.year + 1, month, day)
		upcoming.append((holiday_date, name))

	holiday_date, holiday_name = min(upcoming)
	days_left = (holiday_date - today).days
	print(f"Today's date: {today:%Y-%m-%d}")
	print(f"The next holiday is {holiday_name} in {days_left} days.")
	return holiday_name, holiday_date, days_left


# Exercise 2: How Old Are You On Jupiter?
EARTH_YEAR_SECONDS = 31_557_600
ORBITAL_PERIODS = {
	"Earth": 1,
	"Mercury": 0.2408467,
	"Venus": 0.61519726,
	"Mars": 1.8808158,
	"Jupiter": 11.862615,
	"Saturn": 29.447498,
	"Uranus": 84.016846,
	"Neptune": 164.79132,
}


def calculate_planet_ages(age_in_seconds):
	"""Calculate and display an age in years on every listed planet."""
	if not isinstance(age_in_seconds, (int, float)) or isinstance(age_in_seconds, bool):
		raise TypeError("age_in_seconds must be a number")
	if age_in_seconds < 0:
		raise ValueError("age_in_seconds cannot be negative")

	ages = {
		planet: age_in_seconds / (EARTH_YEAR_SECONDS * orbital_period)
		for planet, orbital_period in ORBITAL_PERIODS.items()
	}
	for planet, age in ages.items():
		print(f"{planet}: {age:.2f} years")
	return ages


# Exercise 3: Regular Expression #1
def return_numbers(text):
	"""Extract all numbers from a string and return them as one string."""
	return "".join(re.findall(r"\d", text))


# Exercise 4: Regular Expression #2
def is_valid_full_name(full_name):
	"""Return True for two alphabetic names with capitalized first letters."""
	return bool(re.fullmatch(r"[A-Z][a-z]+ [A-Z][a-z]+", full_name))


def ask_for_full_name():
	full_name = input("Enter your full name (for example, John Doe): ").strip()
	if is_valid_full_name(full_name):
		print("Your name is valid.")
		return True

	print("Invalid name. Use two names with letters only and one space.")
	return False


# Exercise 5: Python Password Generator
SPECIAL_CHARACTERS = "!@#$%^_&*+-=?"
PASSWORD_GROUPS = (
	string.digits,
	string.ascii_lowercase,
	string.ascii_uppercase,
	SPECIAL_CHARACTERS,
)
PASSWORD_CHARACTERS = "".join(PASSWORD_GROUPS)


def generate_password(length):
	if not isinstance(length, int) or isinstance(length, bool) or not 6 <= length <= 30:
		raise ValueError("Password length must be an integer from 6 to 30.")

	password = [secrets.choice(group) for group in PASSWORD_GROUPS]
	password.extend(
		secrets.choice(PASSWORD_CHARACTERS) for _ in range(length - len(password))
	)
	secrets.SystemRandom().shuffle(password)
	return "".join(password)


def test_password(password, required_length):
	"""Check password length and all four required character groups."""
	return (
		len(password) == required_length
		and any(character.isdigit() for character in password)
		and any(character.islower() for character in password)
		and any(character.isupper() for character in password)
		and any(character in SPECIAL_CHARACTERS for character in password)
	)


def test_password_generator():
	"""Generate and validate 100 passwords with varying lengths."""
	for test_number in range(100):
		length = 6 + (test_number % 25)
		password = generate_password(length)
		assert test_password(password, length)
	print("All 100 password tests passed.")


def run_password_generator():
	while True:
		try:
			length = int(input("Choose a password length from 6 to 30: "))
			if 6 <= length <= 30:
				break
		except ValueError:
			pass
		print("Please enter a whole number between 6 and 30.")

	password = generate_password(length)
	print(f"Your password is: {password}")
	print("Keep your password in a safe place!")


if __name__ == "__main__":
	display_next_holiday()
	calculate_planet_ages(1_000_000_000)
	print(return_numbers("k5k3q2g5z6x9bn"))
	print(is_valid_full_name("John Doe"))
	test_password_generator()
	run_password_generator()

