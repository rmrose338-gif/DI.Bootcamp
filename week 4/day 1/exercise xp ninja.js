// ==========================================
// Exercise 1 : Dog age to Human years
// ==========================================
const data = [
  { name: 'Butters', age: 3, type: 'dog' },
  { name: 'Cuty', age: 5, type: 'rabbit' },
  { name: 'Lizzy', age: 6, type: 'dog' },
  { name: 'Red', age: 1, type: 'cat' },
  { name: 'Joey', age: 3, type: 'dog' },
  { name: 'Rex', age: 10, type: 'dog' }
];

// Part 1: Using a loop (for...of)
let sumHumanYearsLoop = 0;
for (const pet of data) {
  if (pet.type === 'dog') {
    sumHumanYearsLoop += pet.age * 7;
  }
}
console.log("Sum using loop:", sumHumanYearsLoop); // Output: 154

// Part 2: Using reduce()
const sumHumanYearsReduce = data.reduce((acc, pet) => {
  return pet.type === 'dog' ? acc + pet.age * 7 : acc;
}, 0);
console.log("Sum using reduce:", sumHumanYearsReduce); // Output: 154


// ==========================================
// Exercise 2 : Email
// ==========================================
const userEmail3 = ' cannotfillemailformcorrectly@gmail.com ';

// Single-line cleanup using trim()
const cleanedEmail = userEmail3.trim();
console.log(cleanedEmail); // Output: 'cannotfillemailformcorrectly@gmail.com'


// ==========================================
// Exercise 3 : Employees #3
// ==========================================
const users = [
  { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
  { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
  { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
  { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
  { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
  { firstName: 'Wes', lastName: 'Reid', role: 'Instructor' },
  { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor' }
];

const userRoles = {};
for (const user of users) {
  const fullName = `${user.firstName} ${user.lastName}`;
  userRoles[fullName] = user.role;
}
console.log(userRoles);


// ==========================================
// Exercise 4 : Array to Object
// ==========================================
const letters = ['x', 'y', 'z', 'z'];

// Part 1: Using a for loop
const countObjLoop = {};
for (let i = 0; i < letters.length; i++) {
  const char = letters[i];
  countObjLoop[char] = (countObjLoop[char] || 0) + 1;
}
console.log("Using for loop:", countObjLoop); // Output: { x: 1, y: 1, z: 2 }

// Part 2: Using reduce()
const countObjReduce = letters.reduce((acc, char) => {
  acc[char] = (acc[char] || 0) + 1;
  return acc;
}, {});
console.log("Using reduce:", countObjReduce); // Output: { x: 1, y: 1, z: 2 }