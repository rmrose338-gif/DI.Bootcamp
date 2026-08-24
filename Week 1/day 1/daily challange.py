#challange
import random

user_string = input("Enter a string: ")

if len(user_string) < 10:
    print("String not long enough.")
elif len(user_string) > 10:
    print("String too long.")
else:
    print("Perfect string")
    print("First character:", user_string[0])
    print("Last character:", user_string[-1])

    built_string = ""

    for character in user_string:
        built_string += character
        print(built_string)

    # Bonus: jumble the string
    characters = list(user_string)
    random.shuffle(characters)
    print("Jumbled string:", "".join(characters))
