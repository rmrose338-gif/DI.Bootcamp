
//  Exercise 1: Intersection Types

type Person = {
  name: string;
  age: number;
};

type Address = {
  street: string;
  city: string;
};

// Combine Person and Address into a single Intersection Type
type PersonWithAddress = Person & Address;

const userProfile: PersonWithAddress = {
  name: "Alice",
  age: 30,
  street: "123 Main St",
  city: "Techville",
};

console.log("Exercise 1:", userProfile);


//  Exercise 2
function describeValue(val: number | string): string {
  // 'typeof' acts as a type guard to narrow down the union type
  if (typeof val === "number") {
    return "This is a number";
  } else {
    return "This is a string";
  }
}

console.log("Exercise 2 (Number):", describeValue(42));
console.log("Exercise 2 (String):", describeValue("Hello"));



//  Exercise 3
const someValue: any = "TypeScript is awesome!";

// Casting 'any' to 'string' using 'as' keyword
const strLength: number = (someValue as string).length;

console.log("Exercise 3 Length:", strLength);



//  Exercise 4

function getFirstElement(arr: (number | string)[]): string {
  // Use type assertion to convert the first item to a string
  return String(arr[0] as string);
}

console.log("Exercise 4 (Mixed Array):", getFirstElement([100, "apple", "banana"]));
console.log("Exercise 4 (String Array):", getFirstElement(["cherry", 200]));



//  Exercise 5

interface HasLength {
  length: number;
}

// Constrain 'T' to only types containing a numeric 'length' property
function logLength<T extends HasLength>(item: T): void {
  console.log("Exercise 5 Length:", item.length);
}

logLength("Hello World");
logLength([10, 20, 30, 40]);


//  Exercise 6
type Job = {
  position: "Manager" | "Developer" | string;
  department: string;
};

type Employee = Person & Job;

function describeEmployee(emp: Employee): string {
  // Using property value check as a type guard
  if (emp.position === "Manager") {
    return `${emp.name} is a Manager in the ${emp.department} department overseeing operations.`;
  } else if (emp.position === "Developer") {
    return `${emp.name} is a Developer in the ${emp.department} department building features.`;
  } else {
    return `${emp.name} works as a ${emp.position} in ${emp.department}.`;
  }
}

const manager: Employee = {
  name: "Bob",
  age: 40,
  position: "Manager",
  department: "Sales",
};

const developer: Employee = {
  name: "Charlie",
  age: 28,
  position: "Developer",
  department: "Engineering",
};

console.log("Exercise 6 (Manager):", describeEmployee(manager));
console.log("Exercise 6 (Developer):", describeEmployee(developer));



//  Exercise 7: 
interface HasToString {
  toString(): string;
}

function formatInput<T extends HasToString>(input: T): string {
  // Convert input using its toString method, then assert type to string for formatting
  const strValue = input.toString() as string;
  return `[FORMATTED]: ${strValue.toUpperCase()}`;
}

console.log("Exercise 7 (Number input):", formatInput(12345));
console.log("Exercise 7 (Boolean input):", formatInput(true));