const result1 = [1, 2, 3].map(num => {
  if (typeof num === 'number') return num * 2;
  return;
});

console.log(result1); // Output: [2, 4, 6]

// Exercise2
const result2 = [[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2]
);

console.log(result2); // Output: [1, 2, 0, 1, 2, 3]

// Exercise 3
const arrayNum = [1, 2, 4, 5, 8, 9];

const newArray = arrayNum.map((num, i) => {
    console.log(num, i); // Logs element and its index (i)
    return num * 2;
});

console.log(newArray); // Output: [2, 4, 8, 10, 16, 18]

// Exercise 4
// 1. Flatten array to look like [1, 2, 3, [4], [5]]
const array = [[1], [2], [3], [[[4]]], [[[5]]]];
const modifiedArray = array.flatMap(item => item); // One-line solution
console.log(modifiedArray); // Output: [1, 2, 3, [4], [5]]

// 2. Format nested greeting words into phrases
const greeting = [["Hello", "young", "grasshopper!"], ["you", "are"], ["learning", "fast!"]];
const formattedGreeting = greeting.map(subArr => subArr.join(" "));
console.log(formattedGreeting); // Output: ["Hello young grasshopper!", "you are", "learning fast!"]

// 3. Convert greeting array into a single sentence string
const fullSentence = formattedGreeting.join(" ");
console.log(fullSentence); // Output: "Hello young grasshopper! you are learning fast!"

// 4. Free the trapped number 3
const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];
const freed = trapped.flat(Infinity);
console.log(freed); // Output: [3]