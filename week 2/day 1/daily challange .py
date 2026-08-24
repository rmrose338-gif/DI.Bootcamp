#exercise1
class Farm:
    def __init__(self, farm_name):
        self.name = farm_name
        self.animals = {}

    def add_animal(self, animal_type=None, count=1, **kwargs):
        if animal_type is not None:
            self.animals[animal_type] = (
                self.animals.get(animal_type, 0) + count
            )

        for animal, quantity in kwargs.items():
            self.animals[animal] = self.animals.get(animal, 0) + quantity

    def get_info(self):
        animal_info = "\n".join(
            f"{animal:<10}: {count}"
            for animal, count in self.animals.items()
        )

        return f"{self.name}'s farm\n\n{animal_info}\n\n     E-I-E-I-0!"

    def get_animal_types(self):
        return sorted(self.animals.keys())

    def get_short_info(self):
        animals = [
            animal + "s" if self.animals[animal] > 1 else animal
            for animal in self.get_animal_types()
        ]

        if len(animals) == 1:
            animal_text = animals[0]
        elif len(animals) == 2:
            animal_text = " and ".join(animals)
        else:
            animal_text = ", ".join(animals[:-1]) + " and " + animals[-1]

        return f"{self.name}'s farm has {animal_text}."


# Test
macdonald = Farm("McDonald")
macdonald.add_animal("cow", 5)
macdonald.add_animal("sheep")
macdonald.add_animal("sheep")
macdonald.add_animal("goat", 12)

print(macdonald.get_info())
print(macdonald.get_short_info())

# Bonus: multiple animals with **kwargs
macdonald.add_animal(cow=2, goat=3)
print(macdonald.get_info())
