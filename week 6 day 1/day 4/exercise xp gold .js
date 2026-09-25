const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { addDays, format } = require('date-fns');
const { faker } = require('@faker-js/faker');
const prompt = require('prompt-sync')();

// EXERCISE 1

function runExercise1() {
  console.log('=== Exercise 1: File Management ===');

  const filePath = path.join(__dirname, 'data', 'example.txt');
  const fileExists = fs.existsSync(filePath);

  console.log(`File Exists: ${fileExists}`);

  if (fileExists) {
    const stats = fs.statSync(filePath);
    console.log(`File Size: ${stats.size} bytes`);
    console.log(`Creation Time: ${stats.birthtime}`);
  } else {
    console.log('Ensure "data/example.txt" exists to view file stats.');
  }
}


// EXERCISE 2

async function runExercise2() {
  console.log('\n=== Exercise 2: Axios Data Fetching ===');

  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    const posts = response.data;

    console.log('First 5 Post Titles:');
    posts.slice(0, 5).forEach((post, index) => {
      console.log(` ${index + 1}. ${post.title}`);
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}


// EXERCISE 3

function runExercise3() {
  console.log('\n=== Exercise 3: Date Operations ===');

  const currentDate = new Date();
  const futureDate = addDays(currentDate, 5);
  const formattedDate = format(futureDate, 'yyyy-MM-dd HH:mm:ss');

  console.log(`Current Date: ${currentDate.toString()}`);
  console.log(`Date after +5 days (Formatted): ${formattedDate}`);
}


// EXERCISE 4
//
function runExercise4() {
  console.log('\n=== Exercise 4: Faker & Prompt ===');

  const users = [];

  function addFakeUser() {
    const fakeUser = {
      name: faker.person.fullName(),
      addressStreet: faker.location.streetAddress(),
      country: faker.location.country()
    };
    users.push(fakeUser);
    return fakeUser;
  }

  function addUserFromPrompt() {
    console.log('\n--- Bonus: Input User Details ---');
    const name = prompt('Enter full name: ');
    const addressStreet = prompt('Enter street address: ');
    const country = prompt('Enter country: ');

    const promptUser = { name, addressStreet, country };
    users.push(promptUser);
  }

  const generatedUser = addFakeUser();
  console.log('Generated Fake User:', generatedUser);

  addUserFromPrompt();

  console.log('All Users List:', users);
}


// EXERCISE 5: Regular Expression #1 (Extract Numbers)
// 
function runExercise5() {
  console.log('\n=== Exercise 5: Regex Extract Numbers ===');

  function returnNumbers(str) {
    const numbersMatch = str.match(/\d/g);
    return numbersMatch ? numbersMatch.join('') : '';
  }

  const sampleInput = 'k5k3q2g5z6x9bn';
  const result = returnNumbers(sampleInput);

  console.log(`Input: "${sampleInput}"`);
  console.log(`Extracted Numbers: "${result}"`);
}


// EXERCISE 6: 

function runExercise6() {
  console.log('\n=== Exercise 6: Full Name Validation ===');

  function validateFullName(name) {
    // Regex breakdown:
    // ^[A-Z][a-zA-Z]* -> First name starts with uppercase letter, followed by optional letters
    // \s              -> Exactly one space
    // [A-Z][a-zA-Z]*$ -> Last name starts with uppercase letter, followed by optional letters
    const nameRegex = /^[A-Z][a-zA-Z]*\s[A-Z][a-zA-Z]*$/;
    return nameRegex.test(name);
  }

  const fullNameInput = prompt('Enter full name (e.g., "John Doe"): ');
  const isValid = validateFullName(fullNameInput);

  if (isValid) {
    console.log(`"${fullNameInput}" is a VALID full name.`);
  } else {
    console.log(
      `"${fullNameInput}" is INVALID. Ensure only letters, a single space, and capitalized first letters.`
    );
  }
}

// ==========================================
// MAIN EXECUTION FLOW
// ==========================================
async function main() {
  runExercise1();
  await runExercise2();
  runExercise3();
  runExercise4();
  runExercise5();
  runExercise6();
}

main();