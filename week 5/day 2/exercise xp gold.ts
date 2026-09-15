
// Exercise 1: Union Types

function processValue(val: string | number): string {
  if (typeof val === "number") {
    return `$${val.toFixed(2)}`;
  } else {
    return val.split("").reverse().join("");
  }
}

// Tests for Exercise 1
console.log(processValue(100));     // Output: "$100.00"
console.log(processValue("hello")); // Output: "olleh"


// Exercise 2: Array Type Annotations

function sumNumbersInArray(arr: (number | string)[]): number {
  let total = 0;
  for (const item of arr) {
    if (typeof item === "number") {
      total += item;
    }
  }
  return total;
}

// Tests for Exercise 2
console.log(sumNumbersInArray([10, "apple", 20, "banana", 30])); // Output: 60
console.log(sumNumbersInArray(["a", "b", "c"]));                 // Output: 0


// Exercise 3: Type Aliases

type AdvancedUser = {
  name: string;
  age: number;
  address?: string;
};

function introduceAdvancedUser(user: AdvancedUser): string {
  let greeting = `Hello, my name is ${user.name} and I am ${user.age} years old.`;
  if (user.address) {
    greeting += ` I live at ${user.address}.`;
  }
  return greeting;
}

// Tests for Exercise 3
const userWithoutAddress: AdvancedUser = { name: "Alice", age: 28 };
const userWithAddress: AdvancedUser = { name: "Bob", age: 34, address: "123 Main St" };

console.log(introduceAdvancedUser(userWithoutAddress)); 
// Output: "Hello, my name is Alice and I am 28 years old."

console.log(introduceAdvancedUser(userWithAddress));    
// Output: "Hello, my name is Bob and I am 34 years old. I live at 123 Main St."


// Exercise 4: Optional Parameters

function welcomeUser(name: string, greeting?: string): string {
  const finalGreeting = greeting || "Hello";
  return `${finalGreeting}, ${name}!`;
}

// Tests for Exercise 4
console.log(welcomeUser("Charlie"));          // Output: "Hello, Charlie!"
console.log(welcomeUser("David", "Welcome")); // Output: "Welcome, David!"