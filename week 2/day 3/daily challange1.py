from __future__ import annotations

import math
from numbers import Real
from typing import Any


class Circle:
	def __init__(self, radius: Real) -> None:
		if not isinstance(radius, Real) or isinstance(radius, bool):
			raise TypeError("radius must be a number")
		if radius <= 0:
			raise ValueError("radius must be greater than zero")
		self._radius = float(radius)

	@classmethod
	def from_diameter(cls, diameter: Real) -> Circle:
		if not isinstance(diameter, Real) or isinstance(diameter, bool):
			raise TypeError("diameter must be a number")
		if diameter <= 0:
			raise ValueError("diameter must be greater than zero")
		return cls(diameter / 2)

	@property
	def radius(self) -> float:
		return self._radius

	@property
	def diameter(self) -> float:
		return self._radius * 2

	def area(self) -> float:
		return math.pi * self._radius**2

	def __str__(self) -> str:
		return f"Circle(radius={self.radius}, diameter={self.diameter})"

	def __repr__(self) -> str:
		return f"Circle({self.radius!r})"

	def __add__(self, other: Any) -> Circle:
		if not isinstance(other, Circle):
			return NotImplemented
		return Circle(self.radius + other.radius)

	def __gt__(self, other: Any) -> bool:
		if not isinstance(other, Circle):
			return NotImplemented
		return self.radius > other.radius

	def __eq__(self, other: object) -> bool:
		if not isinstance(other, Circle):
			return NotImplemented
		return math.isclose(self.radius, other.radius)

	def __lt__(self, other: Any) -> bool:
		if not isinstance(other, Circle):
			return NotImplemented
		return self.radius < other.radius


if __name__ == "__main__":
	circles = [Circle(5), Circle.from_diameter(6), Circle(3)]
	print(circles)
	print("Area:", circles[0].area())
	print("Added:", circles[0] + circles[1])
	print("Largest:", max(circles))
	print("Sorted:", sorted(circles))
