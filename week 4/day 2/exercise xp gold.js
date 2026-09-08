// Destructuring object properties directly in the function parameters
function printFullName({ first, last }) {
  return `Your full name is ${first} ${last}`;
}

// Execution and output
console.log(printFullName({ first: 'Elie', last: 'Schoppik' }));
// Output: 'Your full name is Elie Schoppik'


//exercise 2
function keysAndValues(obj) {
  // Sort keys alphabetically
  const sortedKeys = Object.keys(obj).sort();
  
  // Map the sorted keys to their corresponding values
  const sortedValues = sortedKeys.map(key => obj[key]);
  
  return [sortedKeys, sortedValues];
}

// Execution and verification
console.log(keysAndValues({ a: 1, b: 2, c: 3 }));
// Output: [ [ 'a', 'b', 'c' ], [ 1, 2, 3 ] ]

console.log(keysAndValues({ a: "Apple", b: "Microsoft", c: "Google" }));
// Output: [ [ 'a', 'b', 'c' ], [ 'Apple', 'Microsoft', 'Google' ] ]

console.log(keysAndValues({ key1: true, key2: false, key3: undefined }));
// Output: [ [ 'key1', 'key2', 'key3' ], [ true, false, undefined ] ]

//exercise 3
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }
}

const counterOne = new Counter();
counterOne.increment(); // count is now 1
counterOne.increment(); // count is now 2

const counterTwo = counterOne; // counterTwo references the exact same object as counterOne
counterTwo.increment(); // count is now 3

console.log(counterOne.count);
// Output: 3