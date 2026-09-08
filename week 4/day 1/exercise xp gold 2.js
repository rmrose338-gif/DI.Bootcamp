// ==========================================
// Exercise 1: Sum elements
// ==========================================
const numbers = [10, 20, 30, 40];

const sum = numbers.reduce((acc, current) => acc + current, 0);
console.log("Sum:", sum); // Output: 100


// ==========================================
// Exercise 2: Remove Duplicates
// ==========================================
const items = [1, 2, 2, 3, 4, 4, 5, "apple", "apple"];

// Using Set to strip out duplicate values
const uniqueItems = [...new Set(items)];
console.log("Unique Items:", uniqueItems); // Output: [1, 2, 3, 4, 5, 'apple']


// ==========================================
// Exercise 3: Remove certain values
// ==========================================
function cleanArray(arr) {
  // Boolean filters out falsy values: null, 0, "", false, undefined, and NaN
  return arr.filter(Boolean);
}

const sampleArray = [NaN, 0, 15, false, -22, '', undefined, 47, null];
console.log("Cleaned Array:", cleanArray(sampleArray)); // Output: [15, -22, 47]


// ==========================================
// Exercise 4: Repeat please !
// ==========================================
function repeat(str, n = 1) {
  return str.repeat(n);
}

console.log(repeat('Ha!', 3)); // Output: "Ha!Ha!Ha!"
console.log(repeat('Ha!'));    // Output: "Ha!" (uses default n = 1)


// ==========================================
// Exercise 5: Turtle & Rabbit
// ==========================================
const startLine = '     ||<- Start line';
let turtle = '🐢';
let rabbit = '🐇';

// 1. Line up Turtle and Rabbit at the start line using padStart
turtle = turtle.padStart(8);
rabbit = rabbit.padStart(8);

console.log(startLine);
console.log(turtle);
console.log(rabbit);

/*
Expected Output in Console:
     ||<- Start line
       🐢
       🐇
*/

// 2. Explanation of: turtle = turtle.trim().padEnd(9, '=');
/*
Explanation:
- turtle.trim() removes leading white spaces, leaving just '🐢'.
- .padEnd(9, '=') pads the right side of the string with '=' until the total string length reaches 9 characters.
- Output value of turtle will be: '🐢========'
*/