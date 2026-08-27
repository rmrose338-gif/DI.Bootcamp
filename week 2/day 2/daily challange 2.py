#exercise1
import random

class Gene:
	def __init__(self, value=None):
		self.value = random.randint(0, 1) if value is None else value
		if self.value not in (0, 1):
			raise ValueError('A gene value must be 0 or 1.')

	def mutate(self):
		self.value = 1 - self.value
		return self


class Chromosome:
	def __init__(self, genes=None):
		self.genes = genes or [Gene() for _ in range(10)]
		if len(self.genes) != 10 or not all(isinstance(gene, Gene) for gene in self.genes):
			raise ValueError('A chromosome must contain exactly 10 Gene objects.')

	def mutate(self):
		number_of_genes = random.randint(1, len(self.genes))
		selected_genes = random.sample(self.genes, number_of_genes)
		for gene in selected_genes:
			if random.choice((True, False)):
				gene.mutate()
		return self

	def is_all_ones(self):
		return all(gene.value == 1 for gene in self.genes)


class DNA:
	def __init__(self, chromosomes=None):
		self.chromosomes = chromosomes or [Chromosome() for _ in range(10)]
		if len(self.chromosomes) != 10 or not all(
			isinstance(chromosome, Chromosome) for chromosome in self.chromosomes
		):
			raise ValueError('DNA must contain exactly 10 Chromosome objects.')

	def mutate(self):
		number_of_chromosomes = random.randint(1, len(self.chromosomes))
		selected_chromosomes = random.sample(self.chromosomes, number_of_chromosomes)
		for chromosome in selected_chromosomes:
			chromosome.mutate()
		return self

	def is_all_ones(self):
		return all(chromosome.is_all_ones() for chromosome in self.chromosomes)

	def count_ones(self):
		return sum(
			gene.value
			for chromosome in self.chromosomes
			for gene in chromosome.genes
		)


class Organism:
	def __init__(self, dna, environment):
		if not isinstance(dna, DNA):
			raise TypeError('dna must be a DNA object.')
		if not 0 <= environment <= 1:
			raise ValueError('environment must be between 0 and 1.')
		self.dna = dna
		self.environment = environment

	def mutate(self):
		if random.random() < self.environment:
			self.dna.mutate()
		return self


def run_experiment(number_of_organisms=100, environment=0.8, max_generations=100000):
	organisms = [Organism(DNA(), environment) for _ in range(number_of_organisms)]

	for generation in range(max_generations + 1):
		for organism in organisms:
			if organism.dna.is_all_ones():
				return generation, organism
		for organism in organisms:
			organism.mutate()

	return None, None


if __name__ == '__main__':
	generations, successful_organism = run_experiment()
	print('=== Biology Research Notebook ===')
	if successful_organism is None:
		print('No all-ones DNA was found within the generation limit.')
		print('Conclusion: random mutation alone is unlikely to reach a 100-gene target quickly.')
	else:
		print(f'An organism reached all-ones DNA after {generations} generations.')
		print(f'Number of genes set to 1: {successful_organism.dna.count_ones()}')
		print('Conclusion: the target was reached through repeated random mutations.')
