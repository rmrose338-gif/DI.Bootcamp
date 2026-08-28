import json
import random
from pathlib import Path


WORDS_FILE = Path(__file__).with_name("words.txt")


def get_words_from_file(file_path):
	"""Read a whitespace-separated word list from a file."""
	with open(file_path, "r", encoding="utf-8") as file:
		return file.read().split()


def get_random_sentence(length):
	"""Generate a lowercase sentence containing the requested number of words."""
	words = get_words_from_file(WORDS_FILE)
	selected_words = [random.choice(words) for _ in range(length)]
	return " ".join(selected_words).lower()


def main():
	print("This program generates a random sentence from a word list.")

	try:
		sentence_length = int(input("How many words should the sentence contain? "))
	except ValueError:
		print("Error: sentence length must be an integer between 2 and 20.")
		return

	if not 2 <= sentence_length <= 20:
		print("Error: sentence length must be between 2 and 20.")
		return

	try:
		print(get_random_sentence(sentence_length))
	except FileNotFoundError:
		print(f"Error: word list not found at {WORDS_FILE}.")


def save_employee_data():
	sample_json = """{
		"company": {
			"employee": {
				"name": "emma",
				"payable": {
					"salary": 7000,
					"bonus": 800
				}
			}
		}
	}"""

	data = json.loads(sample_json)
	salary = data["company"]["employee"]["payable"]["salary"]
	print(f"Salary: {salary}")

	data["company"]["employee"]["birth_date"] = "1990-01-01"
	output_file = Path(__file__).with_name("modified_json.json")
	with open(output_file, "w", encoding="utf-8") as file:
		json.dump(data, file, indent=4)


if __name__ == "__main__":
	main()
	save_employee_data()

 
 
