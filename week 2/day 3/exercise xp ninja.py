from __future__ import annotations

import random
from abc import ABC, abstractmethod
from typing import Any


# Exercise 1: Temperature
class Temperature(ABC):
	"""Base class for temperatures stored internally in Kelvin."""

	def __init__(self, value: float) -> None:
		kelvin = self._to_kelvin(float(value))
		if kelvin < 0:
			raise ValueError("Temperature cannot be below absolute zero.")
		self._kelvin = kelvin

	@staticmethod
	@abstractmethod
	def _to_kelvin(value: float) -> float:
		raise NotImplementedError

	@staticmethod
	@abstractmethod
	def _from_kelvin(kelvin: float) -> float:
		raise NotImplementedError

	@property
	def value(self) -> float:
		return self._from_kelvin(self._kelvin)

	def convert_to(self, temperature_type: type[Temperature]) -> Temperature:
		if not issubclass(temperature_type, Temperature):
			raise TypeError("temperature_type must be a Temperature subclass")
		return temperature_type(temperature_type._from_kelvin(self._kelvin))

	def to_celsius(self) -> Celsius:
		return self.convert_to(Celsius)  # type: ignore[name-defined]

	def to_kelvin(self) -> Kelvin:
		return self.convert_to(Kelvin)  # type: ignore[name-defined]

	def to_fahrenheit(self) -> Fahrenheit:
		return self.convert_to(Fahrenheit)  # type: ignore[name-defined]

	def __repr__(self) -> str:
		return f"{type(self).__name__}({self.value:g})"


class Celsius(Temperature):
	@staticmethod
	def _to_kelvin(value: float) -> float:
		return value + 273.15

	@staticmethod
	def _from_kelvin(kelvin: float) -> float:
		return kelvin - 273.15


class Kelvin(Temperature):
	@staticmethod
	def _to_kelvin(value: float) -> float:
		return value

	@staticmethod
	def _from_kelvin(kelvin: float) -> float:
		return kelvin


class Fahrenheit(Temperature):
	@staticmethod
	def _to_kelvin(value: float) -> float:
		return (value - 32) * 5 / 9 + 273.15

	@staticmethod
	def _from_kelvin(kelvin: float) -> float:
		return (kelvin - 273.15) * 9 / 5 + 32


# Exercise 2: In the Quantum Realm
class QuantumParticle:
	def __init__(self, x: int | None = None, y: float | None = None, p: float | None = None) -> None:
		self._position = x if x is not None else random.randint(1, 10_000)
		self._momentum = y if y is not None else random.random()
		self._spin = p if p in (0.5, -0.5) else random.choice((0.5, -0.5))
		self._entangled_particle: QuantumParticle | None = None

	def _disturb(self) -> None:
		self._position = random.randint(1, 10_000)
		self._momentum = random.random()
		print("Quantum Interferences!!")

	def position(self) -> int:
		measured_position = self._position
		self._disturb()
		return measured_position

	def momentum(self) -> float:
		measured_momentum = self._momentum
		self._disturb()
		return measured_momentum

	def spin(self) -> float:
		measured_spin = self._spin
		if self._entangled_particle is not None:
			self._entangled_particle._spin = -measured_spin
		self._disturb()
		return measured_spin

	def entangle(self, other: QuantumParticle) -> None:
		if not isinstance(other, QuantumParticle):
			raise TypeError("A particle can only be entangled with another QuantumParticle.")
		if other is self:
			raise ValueError("A particle cannot be entangled with itself.")
		self._entangled_particle = other
		other._entangled_particle = self
		print("Spooky Action at a Distance !!")

	def __repr__(self) -> str:
		return (
			f"QuantumParticle(position={self._position}, "
			f"momentum={self._momentum:.4f}, spin={self._spin})"
		)


if __name__ == "__main__":
	temperature = Celsius(25)
	print(temperature.to_fahrenheit())
	print(temperature.to_kelvin())

	particle_one = QuantumParticle(x=1, p=0.5)
	particle_two = QuantumParticle(x=2, p=0.5)
	particle_one.entangle(particle_two)
	print(particle_one)
	print("Measured spin:", particle_one.spin())
	print("Partner spin:", particle_two._spin)
