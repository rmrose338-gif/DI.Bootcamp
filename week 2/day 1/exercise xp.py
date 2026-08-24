#exercise1
class Cat:
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age


cat1 = Cat("Luna", 3)
cat2 = Cat("Milo", 7)
cat3 = Cat("Bella", 5)


def find_oldest_cat(cat1, cat2, cat3):
    return max(cat1, cat2, cat3, key=lambda cat: cat.age)


oldest_cat = find_oldest_cat(cat1, cat2, cat3)

print(f"The oldest cat is {oldest_cat.name}, and is {oldest_cat.age} years old.")

#Exercise 2: Dogs


class Dog:
    def __init__(self, name, height):
        self.name = name
        self.height = height

    def bark(self):
        print(f"{self.name} goes woof!")

    def jump(self):
        x = self.height * 2
        print(f"{self.name} jumps {x} cm high!")


# Instantiate objects
davids_dog = Dog("Rex", 50)
sarahs_dog = Dog("Teacup", 20)

# Print details and call methods
print(f"David's dog: {davids_dog.name}, Height: {davids_dog.height}cm")
davids_dog.bark()
davids_dog.jump()

print(f"Sarah's dog: {sarahs_dog.name}, Height: {sarahs_dog.height}cm")
sarahs_dog.bark()
sarahs_dog.jump()

# Compare dog sizes
if davids_dog.height > sarahs_dog.height:
    print(f"{davids_dog.name} is bigger than {sarahs_dog.name}.")
elif sarahs_dog.height > davids_dog.height:
    print(f"{sarahs_dog.name} is bigger than {davids_dog.name}.")
else:
    print("Both dogs are the same size.")
#Exercise 3: Song


class Song:
    def __init__(self, lyrics):
        self.lyrics = lyrics

    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)


stairway = Song([
    "There’s a lady who's sure",
    "all that glitters is gold",
    "and she’s buying a stairway to heaven"
])

stairway.sing_me_a_song()
#Exercise 4: Zoo (with Bonus *args)


class Zoo:
    def __init__(self, zoo_name):
        self.name = zoo_name
        self.animals = []
        self.grouped_animals = {}

    def add_animal(self, *new_animals):
        """Adds one or multiple animals (via *args) if not already in the zoo."""
        for animal in new_animals:
            if animal not in self.animals:
                self.animals.append(animal)

    def get_animals(self):
        """Prints all animals currently in the zoo."""
        print(f"Animals in {self.name}: {', '.join(self.animals)}")

    def sell_animal(self, animal_sold):
        """Removes an animal if it exists in the zoo."""
        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
            print(f"Sold {animal_sold} from {self.name}.")

    def sort_animals(self):
        """Sorts animals alphabetically and groups them by their first letter."""
        self.animals.sort()
        self.grouped_animals = {}

        for animal in self.animals:
            first_letter = animal[0].upper()
            if first_letter not in self.grouped_animals:
                self.grouped_animals[first_letter] = [animal]
            else:
                self.grouped_animals[first_letter].append(animal)

        return self.grouped_animals

    def get_groups(self):
        """Prints the grouped animals."""
        for letter, animal_list in self.grouped_animals.items():
            print(f"{letter}: {animal_list}")


# Testing the Zoo class
brooklyn_safari = Zoo("Brooklyn Safari")

# Using bonus *args functionality
brooklyn_safari.add_animal("Giraffe", "Bear", "Baboon", "Cat", "Cougar", "Zebra")
brooklyn_safari.get_animals()

brooklyn_safari.sell_animal("Bear")
brooklyn_safari.get_animals()

brooklyn_safari.sort_animals()
brooklyn_safari.get_groups()