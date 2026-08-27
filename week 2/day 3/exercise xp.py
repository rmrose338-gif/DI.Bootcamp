class Currency:
    	def __init__(self, currency, amount):
		self.currency = currency
		self.amount = amount

	def __str__(self):
		suffix = "" if self.amount == 1 else "s"
		return f"{self.amount} {self.currency}{suffix}"

	def __repr__(self):
		return str(self)

	def __int__(self):
		return int(self.amount)

	def __add__(self, other):
		if isinstance(other, int):
			return self.amount + other
		if isinstance(other, Currency) and self.currency == other.currency:
			return self.amount + other.amount
		raise TypeError(
			f"Cannot add between Currency type <{self.currency}> "
			f"and <{other.currency}>"
		)

	def __iadd__(self, other):
		if isinstance(other, int):
			self.amount += other
		elif isinstance(other, Currency) and self.currency == other.currency:
			self.amount += other.amount
		else:
			raise TypeError(
				f"Cannot add between Currency type <{self.currency}> "
				f"and <{other.currency}>"
			)
		return self


c1 = Currency("dollar", 5)
c2 = Currency("dollar", 10)
c3 = Currency("shekel", 1)
c4 = Currency("shekel", 10)

print(c1)
print(int(c1))
print(repr(c1))
print(c1 + 5)
print(c1 + c2)
print(c1)

c1 += 5
print(c1)

c1 += c2
print(c1)

# Uncomment to test the mismatched-currency TypeError.
# print(c1 + c3)
