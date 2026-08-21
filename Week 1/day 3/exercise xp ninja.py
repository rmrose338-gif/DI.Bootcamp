# exercise 1

manufacturers_string = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"
manufacturers = manufacturers_string.split(", ")

print(f"There are {len(manufacturers)} manufacturers in the list.")
print("Manufacturers in descending order:")
print(sorted(manufacturers, reverse=True))

manufacturers_with_o = sum("o" in manufacturer.lower() for manufacturer in manufacturers)
manufacturers_without_i = sum("i" not in manufacturer.lower() for manufacturer in manufacturers)

print(f"{manufacturers_with_o} manufacturers have the letter 'o' in their name.")
print(f"{manufacturers_without_i} manufacturers do not have the letter 'i' in their name.")

duplicate_manufacturers = [
	"Honda", "Volkswagen", "Toyota", "Ford Motor", "Honda", "Chevrolet", "Toyota"
]
unique_manufacturers = sorted(set(duplicate_manufacturers))

print(", ".join(unique_manufacturers))
print(f"There are now {len(unique_manufacturers)} companies in the list.")

reversed_manufacturers = [manufacturer[::-1] for manufacturer in sorted(manufacturers)]
print("Manufacturers in ascending order with their names reversed:")
print(reversed_manufacturers)
