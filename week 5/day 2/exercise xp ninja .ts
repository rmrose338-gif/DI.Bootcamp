// ==========================================
// Exercise 1: Conditional Types
// ==========================================

// Define the Conditional Type
type MappedType<T> = T extends number ? number : T extends string ? number : never;

// Function overloads mapping T directly to output type
function mapType(value: number): number;
function mapType(value: string): number;
function mapType(value: number | string): number {
  if (typeof value === "number") {
    return value * value;
  } else {
    return value.length;
  }
}

// Tests for Exercise 1
console.log(mapType(5));       // Output: 25 (number input -> square)
console.log(mapType("hello"));  // Output: 5  (string input -> length)


// ==========================================
// Exercise 2: Keyof and Lookup Types
// ==========================================

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Tests for Exercise 2
const car = {
  make: "Toyota",
  model: "Corolla",
  year: 2022,
  isElectric: false
};

const carMake = getProperty(car, "make"); // Inferred as string
const carYear = getProperty(car, "year"); // Inferred as number

console.log(carMake); // Output: "Toyota"
console.log(carYear); // Output: 2022


// ==========================================
// Exercise 3: Interfaces with Numeric Properties
// ==========================================
interface HasNumericProperty {
  [key: string]: number;
}

function multiplyProperty<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  key: K,
  factor: number
): number {
  const value = obj[key];
  return typeof value === "number" ? value * factor : 0;
}

const inventory = { apples: 10, bananas: 25, oranges: 15 };

const updatedApples = multiplyProperty(inventory, "apples", 3);
const updatedBananas = multiplyProperty(inventory, "bananas", 2);

console.log(updatedApples);  // Output: 30
console.log(updatedBananas); // Output: 50