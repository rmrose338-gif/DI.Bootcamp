// Daily Challenge 3

const numbers = [5, 0, 9, 1, 7, 4, 2, 6, 3, 8];

// 1. Convert the array to a string with toString()
console.log(numbers.toString());

// 2. Convert the array to a string with join() using different separators
console.log(numbers.join("+"));
console.log(numbers.join(" "));
console.log(numbers.join(""));

// Bonus: Bubble Sort in descending order using nested for loops
let sortedNumbers = [...numbers];

for (let i = 0; i < sortedNumbers.length; i++) {
  for (let j = 0; j < sortedNumbers.length - 1 - i; j++) {
    if (sortedNumbers[j] < sortedNumbers[j + 1]) {
      let temp = sortedNumbers[j];
      sortedNumbers[j] = sortedNumbers[j + 1];
      sortedNumbers[j + 1] = temp;
    }
    console.log(`Pass ${i + 1}, comparison ${j + 1}:`, [...sortedNumbers]);
  }
}

console.log("Final sorted array:", sortedNumbers);
