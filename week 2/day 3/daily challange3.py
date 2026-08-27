people = []

for _ in range(5):
	name = input("Enter name: ")
	age = input("Enter age: ")
	score = input("Enter score: ")
	people.append((name, age, score))

sorted_people = sorted(people, key=lambda person: (person[0], person[1], person[2]))
print(sorted_people)
