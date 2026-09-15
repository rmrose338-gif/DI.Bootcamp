
// Exercise: Union Type Validaton

function validateUnionType(value: any, allowedTypes: string[]): boolean {
  // Handle null explicitly since typeof null evaluates to "object" in JavaScript
  if (value === null) {
    return allowedTypes.includes("null");
  }

  // Handle Array explicitly since typeof [] evaluates to "object" in JavaScript
  const actualType = Array.isArray(value) ? "array" : typeof value;

  return allowedTypes.includes(actualType);
}

// Tests and Demonstrations
const numValue: any = 42;
const strValue: any = "Hello, TypeScript!";
const boolValue: any = true;
const arrayValue: any = [1, 2, 3];
const nullValue: any = null;

// Validations
console.log(validateUnionType(numValue, ["number", "string"]));  // Output: true
console.log(validateUnionType(strValue, ["number", "string"]));  // Output: true
console.log(validateUnionType(boolValue, ["number", "string"])); // Output: false

console.log(validateUnionType(arrayValue, ["array", "object"])); // Output: true
console.log(validateUnionType(nullValue, ["null", "undefined"])); // Output: true