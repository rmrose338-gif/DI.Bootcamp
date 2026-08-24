#daily challange2
import random

list_of_numbers = [
    random.randint(0, 10000)
    for _ in range(20000)
]

target_number = 3728
seen = set()
pairs = set()

for number in list_of_numbers:
    complement = target_number - number

    if complement in seen:
        pairs.add(tuple(sorted((number, complement))))

    seen.add(number)

for first, second in sorted(pairs):
    print(f"{first} and {second} sums to {target_number}")
