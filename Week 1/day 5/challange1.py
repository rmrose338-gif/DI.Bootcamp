#excercise1

items = ["apple", "banana", "cherry"]

item = input("Enter an item: ")
index = int(input("Enter the index: "))

items.insert(index, item)

print(items)

# Exercise 2
text = input("Enter a string: ")
space_count = text.count(" ")

print("Number of spaces:", space_count)

# Exercise 3
text = input("Enter a string: ")

uppercase_count = 0
lowercase_count = 0

for character in text:
    if character.isupper():
        uppercase_count += 1
    elif character.islower():
        lowercase_count += 1

print("Number of uppercase letters:", uppercase_count)
print("Number of lowercase letters:", lowercase_count)

# Exercise 4
def my_sum(numbers):
    total = 0

    for number in numbers:
        total += number

    return total


print(my_sum([1, 5, 4, 2]))



# Exercise 5
def find_max(numbers):
    largest = numbers[0]

    for number in numbers:
        if number > largest:
            largest = number

    return largest


print(find_max([0, 1, 3, 50]))



# Exercise 6
def factorial(number):
    result = 1

    for value in range(1, number + 1):
        result *= value

    return result


print(factorial(4))

text


# Exercise 7
def list_count(items, target):
    total = 0

    for item in items:
        if item == target:
            total += 1

    return total


print(list_count(["a", "a", "t", "o"], "a"))

# Exercise 8
def norm(numbers):
    return 'math'.sqrt(sum(number ** 2 for number in numbers))


print(norm([1, 2, 2]))


# Exercise 9
def is_mono(numbers):
    ascending = all(numbers[i] <= numbers[i + 1] for i in range(len(numbers) - 1))
    descending = all(numbers[i] >= numbers[i + 1] for i in range(len(numbers) - 1))
    return ascending or descending


# Exercise 10
def longest_word(words):
    longest = max(words, key=len)
    print(longest)


# Exercise 11
def separate_types(values):
    integers = []
    strings = []

    for value in values:
        if isinstance(value, int) and not isinstance(value, bool):
            integers.append(value)
        elif isinstance(value, str):
            strings.append(value)

    return integers, strings


# Exercise 12
def is_palindrome(word):
    return word == word[::-1]


# Exercise 13
def sum_over_k(sentence, k):
    return sum(len(word) > k for word in sentence.split())


# Exercise 14
def dict_avg(dictionary):
    return sum(dictionary.values()) / len(dictionary)


# Exercise 15
def common_div(number1, number2):
    divisors = []

    for divisor in range(2, min(number1, number2) + 1):
        if number1 % divisor == 0 and number2 % divisor == 0:
            divisors.append(divisor)

    return divisors


# Exercise 16
def is_prime(number):
    if number < 2:
        return False

    for divisor in range(2, int('math'.sqrt(number)) + 1):
        if number % divisor == 0:
            return False

    return True


# Exercise 17
def weird_print(values):
    result = [value for index, value in enumerate(values) if index % 2 == 0]
    print(result)


# Exercise 18
def type_count(**kwargs):
    counts = {}

    for value in kwargs.values():
        type_name = type(value).__name__
        counts[type_name] = counts.get(type_name, 0) + 1

    return ", ".join(f"{name}: {count}" for name, count in counts.items())


# Exercise 19
def custom_split(text, separator=None):
    if separator is not None:
        return text.split(separator)

    return text.split()


# Exercise 20
def password_format(password):
    return "*" * len(password)


print(is_mono([7, 6, 5, 5, 2, 0]))
print(is_mono([1, 2, 0, 4]))
print(separate_types([1, "hello", 2, "world"]))
print(is_palindrome("radar"))
print(sum_over_k("Do or do not there is no try", 2))
print(dict_avg({"a": 1, "b": 2, "c": 8, "d": 1}))
print(common_div(10, 20))
print(is_prime(11))
weird_print([1, 2, 2, 3, 4, 5])
print(type_count(a=1, b="string", c=1.0, d=True, e=False))
print(custom_split("one,two,three", ","))
print(password_format("mypassword"))




