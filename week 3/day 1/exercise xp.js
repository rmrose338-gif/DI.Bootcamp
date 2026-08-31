// Exercise 1: List of people

const people = ["Greg", "Mary", "Devon", "James"];

// 1. Remove "Greg"
people.shift();

// 2. Replace "James" with "Jason"
people[people.indexOf("James")] = "Jason";

// 3. Add your name to the end
people.push("YourName");

// 4. Find Mary's index
console.log("Mary index:", people.indexOf("Mary"));

// 5. Copy the array without "Mary" and without your name
const peopleCopy = people.slice(1, 3);
console.log("Copied array:", peopleCopy);

// 6. Index of "Foo"
console.log("Foo index:", people.indexOf("Foo"));
// It returns -1 because "Foo" is not found in the array.

// 7. Last element of the array
const last = people[people.length - 1];
console.log("Last person:", last);

// Part II - Loops

// 1. Loop through the array and log each person
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
}

// 2. Stop after logging "Devon"
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
  if (people[i] === "Devon") {
    break;
  }
}

// Exercise 2: Your favorite colors

const colors = ["blue", "red", "green", "yellow", "purple"];

// 1. Loop through the colors and print each choice
for (let i = 0; i < colors.length; i++) {
  console.log(`My #${i + 1} choice is ${colors[i]}`);
}

// Bonus: add ordinal suffixes
const suffixes = ["th", "st", "nd", "rd"];
for (let i = 0; i < colors.length; i++) {
  const rank = i + 1;
  const suffix = rank % 100 >= 11 && rank % 100 <= 13 ? "th" : suffixes[rank % 10] || "th";
  console.log(`My ${rank}${suffix} choice is ${colors[i]}`);
}

// Exercise 3: Repeat the question

let number = Number(prompt("Please enter a number:"));
while (isNaN(number) || number < 10) {
  console.log("The number is invalid or smaller than 10. Please try again.");
  number = Number(prompt("Please enter a number:"));
}
console.log(`You entered ${number}.`);

// Exercise 4: Building Management

const building = {
  numberOfFloors: 4,
  numberOfAptByFloor: {
    firstFloor: 3,
    secondFloor: 4,
    thirdFloor: 9,
    fourthFloor: 2,
  },
  nameOfTenants: ["Sarah", "Dan", "David"],
  numberOfRoomsAndRent: {
    sarah: [3, 990],
    dan: [4, 1000],
    david: [1, 500],
  },
};

// 1. Console.log the number of floors in the building
console.log("Number of floors:", building.numberOfFloors);

// 2. Console.log how many apartments are on floors 1 and 3
console.log(
  "Apartments on floor 1 and 3:",
  building.numberOfAptByFloor.firstFloor,
  building.numberOfAptByFloor.thirdFloor
);

// 3. Console.log the second tenant's name and number of rooms in his apartment
console.log(
  "Second tenant:",
  building.nameOfTenants[1],
  "rooms:",
  building.numberOfRoomsAndRent.dan[0]
);

// 4. Check if Sarah + David rent is bigger than Dan's rent
const sarahRent = building.numberOfRoomsAndRent.sarah[1];
const davidRent = building.numberOfRoomsAndRent.david[1];
const danRent = building.numberOfRoomsAndRent.dan[1];

if (sarahRent + davidRent > danRent) {
  building.numberOfRoomsAndRent.dan[1] = 1200;
  console.log("Dan's rent increased to 1200.");
} else {
  console.log("Dan's rent was not increased.");
}

// Exercise 5: Family

const family = {
  father: "John",
  mother: "Emma",
  son: "Alex",
  daughter: "Sophia",
};

// 1. Using a for...in loop, console.log the keys
for (const key in family) {
  console.log(key);
}

// 2. Using a for...in loop, console.log the values
for (const key in family) {
  console.log(family[key]);
}

// Exercise 6: Rudolf

const details = {
  my: "name",
  is: "Rudolf",
  the: "reindeer",
};

let sentence = "";
const keys = Object.keys(details);

for (let i = 0; i < keys.length; i++) {
  sentence += keys[i] + " " + details[keys[i]] + " ";
}
console.log(sentence.trim());

// Exercise 7: Secret Group

const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

const initials = names
  .map((name) => name[0])
  .sort()
  .join("");

console.log(initials);





