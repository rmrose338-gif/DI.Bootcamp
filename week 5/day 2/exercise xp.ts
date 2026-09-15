
// Exercise 1: Hello, World! Program

console.log("Hello, World!");


// Exercise 2: Type Annotations

let nameEx2: string = "Alice";
let ageEx2: number = 25;

console.log(`Name: ${nameEx2}, Age: ${ageEx2}`);


// Exercise 3: Union Type
let id: string | number;
id = 101;
id = "EMP-101";


// Exercise 4: Control Flow with if...else
function checkNumber(num: number): string {
  if (num > 0) {
    return "positive";
  } else if (num < 0) {
    return "negative";
  } else {
    return "zero";
  }
}

console.log(checkNumber(10));  // "positive"
console.log(checkNumber(-5));  // "negative"
console.log(checkNumber(0));   // "zero"


// Exercise 5: Tuple Types

function getDetails(name: string, age: number): [string, number, string] {
  const greeting = `Hello, ${name}! You are ${age} years old.`;
  return [name, age, greeting];
}

const details = getDetails("Alice", 25);
console.log(details); 
// Output: ['Alice', 25, 'Hello, Alice! You are 25 years old.']
// Exercise 6: Object Type Annotations

type Person = {
  name: string;
  age: number;
};

function createPerson(name: string, age: number): Person {
  return { name, age };
}

const person = createPerson("Bob", 30);
console.log(person); // Output: { name: 'Bob', age: 30 }

// Exercise 7: Type Assertions

// Standard DOM manipulation casting in TypeScript:
const inputElement = document.getElementById("username") as HTMLInputElement;

// Check if element exists before setting properties to prevent runtime errors
if (inputElement) {
  inputElement.value = "JohnDoe";
}


// Exercise 8: switch Statement with Complex Conditions

function getAction(role: string): string {
  switch (role) {
    case "admin":
      return "Manage users and settings";
    case "editor":
      return "Edit content";
    case "viewer":
      return "View content";
    case "guest":
      return "Limited access";
    default:
      return "Invalid role";
  }
}

console.log(getAction("admin"));   // Output: Manage users and settings
console.log(getAction("editor"));  // Output: Edit content
console.log(getAction("viewer"));  // Output: View content
console.log(getAction("guest"));   // Output: Limited access
console.log(getAction("unknown")); // Output: Invalid role

// Exercise 9: Function Overloading with Default Parameters

// Overload signatures
function greet(): string;
function greet(name: string): string;

// Implementation Signature
function greet(name: string = "Guest"): string {
  if (name === "Guest") {
    return "Hello, Welcome!";
  }
  return `Hello, ${name}!`;
}

console.log(greet());        // Output: Hello, Welcome!
console.log(greet("Alice"));  // Output: Hello, Alice!