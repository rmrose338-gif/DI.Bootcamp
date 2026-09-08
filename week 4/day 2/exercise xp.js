const person = {
  name: 'John Doe',
  age: 25,
  location: {
    country: 'Canada',
    city: 'Vancouver',
    coordinates: [49.2827, -123.1207]
  }
};

const {
  name,
  location: {
    country,
    city,
    coordinates: [lat, lng]
  }
} = person;

console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);

function displayStudentInfo({ first, last }) {
  return `Your full name is ${first} ${last}`;
}

console.log(displayStudentInfo({ first: 'Elie', last: 'Schoppik' }));


const users = { user1: 18273, user2: 92833, user3: 90315 };

// Turn object into an array of key-value pairs
const usersArray = Object.entries(users);

console.log(usersArray);
// Output: [ [ 'user1', 18273 ], [ 'user2', 92833 ], [ 'user3', 90315 ] ]

// Transform array elements by doubling the ID value
const updatedUsers = usersArray.map(([user, id]) => [user, id * 2]);

console.log(updatedUsers);
// Output: [ [ 'user1', 36546 ], [ 'user2', 185666 ], [ 'user3', 180630 ] ]


// exercise 4
class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person('John');
console.log(typeof member);

// exercise5
// Base class
class Dog {
  constructor(name) {
    this.name = name;
  }
}

// Correct extended class (Option 2)
class Labrador extends Dog {
  constructor(name, size) {
    super(name); // Calls the parent Dog constructor
    this.size = size;
  }
}

// Execution and verification
const myDog = new Labrador('Buddy', 'Large');

console.log(myDog.name); // Output: 'Buddy'
console.log(myDog.size); // Output: 'Large'

// exercise 6
const object1 = { number: 5 };
const object2 = object1;
const object3 = object2;
const object4 = { number: 5 };

object1.number = 4;

console.log(object2.number); // Output: 4
console.log(object3.number); // Output: 4
console.log(object4.number); // Output: 5