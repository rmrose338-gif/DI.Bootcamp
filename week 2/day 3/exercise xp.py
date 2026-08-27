class Currency:
    def __init__(self, currency, amount):
        self.currency = currency
        self.amount = amount

    def __str__(self):
        # Adds plural 's' if amount != 1
        label = f"{self.currency}s" if self.amount != 1 else self.currency
        return f"{self.amount} {label}"

    def __repr__(self):
        return self.__str__()

    def __int__(self):
        return self.amount

    def __add__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            return self.amount + other.amount
        elif isinstance(other, (int, float)):
            return self.amount + other
        return NotImplemented

    def __iadd__(self, other):
        if isinstance(other, Currency):
            if self.currency != other.currency:
                raise TypeError(f"Cannot add between Currency type <{self.currency}> and <{other.currency}>")
            self.amount += other.amount
        elif isinstance(other, (int, float)):
            self.amount += other
        else:
            return NotImplemented
        return self


# Test cases:
c1 = Currency('dollar', 5)
c2 = Currency('dollar', 10)
c3 = Currency('shekel', 1)
c4 = Currency('shekel', 10)

print(str(c1))   # 5 dollars
print(int(c1))   # 5
print(repr(c1))  # 5 dollars
print(c1 + 5)    # 10
print(c1 + c2)   # 15
print(c1)        # 5 dollars

c1 += 5
print(c1)        # 10 dollars

c1 += c2
print(c1)        # 20 dollars

def sum_two_numbers(a, b):
    print(a + b)
    from func import sum_two_numbers

sum_two_numbers(10, 20)

#exercise3
import random
import string

letters = string.ascii_letters  # Uppercase and lowercase letters
random_string = "".join(random.choice(letters) for _ in range(5))

print(random_string)

#exercise4
from datetime import date

def display_current_date():
    today = date.today()
    print(f"Today's date: {today}")

display_current_date()

#exercise5
from datetime import datetime

def time_until_new_year():
    now = datetime.now()
    next_year = now.year + 1
    new_year_target = datetime(next_year, 1, 1)
    
    time_left = new_year_target - now
    print(f"Time left until Jan 1st: {time_left}")

time_until_new_year()

#exercise6
from datetime import datetime

def minutes_lived(birthdate_str):
    # Format expected: YYYY-MM-DD
    birthdate = datetime.strptime(birthdate_str, "%Y-%m-%d")
    now = datetime.now()
    
    time_lived = now - birthdate
    minutes = int(time_lived.total_seconds() // 60)
    
    print(f"You have lived approximately {minutes:,} minutes.")

minutes_lived("2000-01-01")

#exercise7
from faker import Faker

fake = Faker()
users = []

def add_users(count):
    for _ in range(count):
        user = {
            "name": fake.name(),
            "address": fake.address(),
            "language_code": fake.language_code()
        }
        users.append(user)

add_users(5)
print(users)
