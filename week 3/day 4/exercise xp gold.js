// Exercise 1: Nested functions
// Prediction before execution:
// The function landscape creates an empty string result.
// flat(4) adds 4 underscores to result => "____".
// mountain(4) adds "/" + 4 apostrophes + "\\" => "____/''''\\".
// Then flat(4) adds 4 more underscores => "____/''''\\____".
// So the final returned value is:
// "____/''''\\____"
// Explanation: the nested functions share the same outer variable result, so each adds to the same string.

const landscape = () => {
    let result = "";

    const flat = (x) => {
        for (let count = 0; count < x; count++) {
            result += "_";
        }
    };

    const mountain = (x) => {
        result += "/";
        for (let counter = 0; counter < x; counter++) {
            result += "'";
        }
        result += "\\";
    };

    flat(4);
    mountain(4);
    flat(4);

    return result;
};

console.log(landscape());

// Exercise 2: Closure
// Prediction: addToTen(3) returns 13.
// Explanation: addTo creates a function that remembers x = 10 in the closure, then adds y.
const addTo = x => y => x + y;
const addToTen = addTo(10);
console.log(addToTen(3)); // 13

// Exercise 3: Currying
// Prediction: curriedSum(30)(1) returns 31.
// Explanation: the first call sets a = 30, and the second call adds b = 1.
const curriedSum = (a) => (b) => a + b;
console.log(curriedSum(30)(1)); // 31

// Exercise 4: Currying
// Prediction: add5(12) returns 17.
// Explanation: curriedSum(5) returns a function where a is fixed to 5, then adding 12 gives 17.
const curriedSum2 = (a) => (b) => a + b;
const addFive = curriedSum2(5);
console.log(addFive(12)); // 17

// Exercise 5: Composing
// Prediction: compose(add1, add5)(10) returns 16.
// Explanation: add5(10) = 15, then add1(15) = 16.
const compose = (f, g) => (a) => f(g(a));
const add1 = (num) => num + 1;
const addFiveValue = (num) => num + 5;
console.log(compose(add1, addFiveValue)(10)); // 16
