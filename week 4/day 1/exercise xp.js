const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th", "st", "nd", "rd"];

// Exercise 1: Basic 1-based index display
colors.forEach((color, index) => {
  console.log(`${index + 1}# choice is ${color}.`);
});

// Exercise 1: Check for "Violet"
const hasViolet = colors.includes("Violet");
if (hasViolet) {
  console.log("Yeah");
} else {
  console.log("No...");
}

// Exercise 2: Ordinal suffix display using ternary operator
colors.forEach((color, index) => {
  const position = index + 1;
  const suffix = position === 1 ? ordinal[1] : position === 2 ? ordinal[2] : position === 3 ? ordinal[3] : ordinal[0];

  console.log(`${position}${suffix} choice is ${color}.`);
});
// Exercise 3: Spread operator to combine arrays
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log(result);

// ==========================================
// Exercise 4: Employees
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

// 1. Welcome message using map()
const welcomeStudents = users.map(user => `Hello ${user.firstName}`);
console.log(welcomeStudents);

// 2. Filter Full Stack Residents
const fullStackResidents = users.filter(user => user.role === 'Full Stack Resident');
console.log(fullStackResidents);

// 3. Bonus: Chained filter and map for last names of Full Stack Residents
const fullStackLastNames = users
  .filter(user => user.role === 'Full Stack Resident')
  .map(user => user.lastName);
console.log(fullStackLastNames);


// ==========================================
// Exercise 5: Star Wars
// ==========================================
const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];

// Combine array items into a single space-separated string using reduce()
const epicSentence = epic.reduce((acc, word) => `${acc} ${word}`);
console.log(epicSentence);


// ==========================================
// Exercise 6: Employees #2
// ==========================================
const students = [
  { name: "Ray", course: "Computer Science", isPassed: true },
  { name: "Liam", course: "Computer Science", isPassed: false },
  { name: "Jenner", course: "Information Technology", isPassed: true },
  { name: "Marco", course: "Robotics", isPassed: true },
  { name: "Kimberly", course: "Artificial Intelligence", isPassed: false },
  { name: "Jamie", course: "Big Data", isPassed: false }
];

// 1. Filter students who passed
const passedStudents = students.filter(student => student.isPassed);
console.log(passedStudents);

// 2. Bonus: Chain filter with forEach to congratulate students
students
  .filter(student => student.isPassed)
  .forEach(student => {
    console.log(`Good job ${student.name}, you passed the course in ${student.course}`);
  });