# Exercise1
print("Hello world\nHello world\nHello world\nHello world")

#exercise2
print((99 ** 3) * 8)

#exercise3
# Guess: False
print(5 < 3)

# Guess: True
print(3 == 3)

# Guess: False
print(3 == "3")

# Guess: TypeError
try:
	print("3" > 3)
except TypeError as error:
	print(type(error).__name__)

# Guess: False
print("Hello" == "hello")


#exercise4
computer_brand = "Dell"
print(f"I have a {computer_brand} computer.")


#exercise5
name = "GitHub Copilot"
age = "not applicable"
shoe_size = "not applicable"
info = f"My name is {name}; I am an AI, so my age is {age} and my shoe size is {shoe_size}."
print(info)


#exercise6
a = 10
b = 5

if a > b:
	print("Hello World")
 
 
#execice7
number = int(input("Enter a number: "))

if number % 2 == 0:
	print("The number is even.")
else:
    	print("The number is odd.")
     

#exercise8
user_name = input("What is your name? ").strip()

if user_name.lower() == name.lower():
	print("Whoa, we have the same name! The internet is getting weird.")
else:
	print(f"Nice to meet you, {user_name}! I guess I am the only {name} here.")
 
#exercise9
height = float(input("Enter your height in centimeters: "))

if height > 145:
	print("You are tall enough to ride.")
else:
	print("You need to grow some more to ride.")








