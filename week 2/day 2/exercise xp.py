# Exercise 1
class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'


# Exercise 2
class Dog:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def bark(self):
        return f'{self.name} is barking'

    def run_speed(self):
        return self.weight / self.age * 10

    def fight(self, other_dog):
        own_power = self.run_speed() * self.weight
        other_power = other_dog.run_speed() * other_dog.weight

        if own_power > other_power:
            return f'{self.name} wins the fight'
        if other_power > own_power:
            return f'{other_dog.name} wins the fight'
        return 'The fight is a draw'


dog1 = Dog('Rex', 4, 20)
dog2 = Dog('Buddy', 2, 12)
dog3 = Dog('Max', 5, 25)

print(dog1.bark())
print(dog2.run_speed())
print(dog1.fight(dog2))


# Exercise 3
import random


class PetDog(Dog):
    def __init__(self, name, age, weight, trained=False):
        super().__init__(name, age, weight)
        self.trained = trained

    def train(self):
        print(self.bark())
        self.trained = True

    def play(self, *args):
        dog_names = [dog.name for dog in args]
        dog_names.append(self.name)
        print(f"{', '.join(dog_names)} all play together")

    def do_a_trick(self):
        if self.trained:
            tricks = [
                'does a barrel roll',
                'stands on his back legs',
                'shakes your hand',
                'plays dead',
            ]
            print(f'{self.name} {random.choice(tricks)}')


pet_dog1 = PetDog('Fido', 2, 10)
pet_dog2 = PetDog('Buddy', 3, 15)
pet_dog1.train()
pet_dog1.play(pet_dog2)
pet_dog1.do_a_trick()


# Exercise 4
class Person:
    def __init__(self, first_name, age):
        self.first_name = first_name
        self.age = age
        self.last_name = ''

    def is_18(self):
        return self.age >= 18


class Family:
    def __init__(self, last_name):
        self.last_name = last_name
        self.members = []

    def born(self, first_name, age):
        person = Person(first_name, age)
        person.last_name = self.last_name
        self.members.append(person)

    def check_majority(self, first_name):
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    print(
                        'You are over 18, your parents Jane and John '
                        'accept that you will go out with your friends'
                    )
                else:
                    print('Sorry, you are not allowed to go out with your friends.')
                return

    def family_presentation(self):
        print(f'Family name: {self.last_name}')
        for member in self.members:
            print(f'{member.first_name}, {member.age}')


family = Family('Smith')
family.born('Jane', 42)
family.born('John', 45)
family.born('Alex', 19)
family.check_majority('Alex')
family.family_presentation()
