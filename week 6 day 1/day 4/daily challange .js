const fs = require('fs');

// Helper function to greet user
function greet(name) {
  return `Hello, ${name}! Welcome to the Node.js challenge.`;
}

// Helper function for display with native ANSI styling (bold magenta)
function displayColorfulMessage() {
  console.log('\x1b[1m\x1b[35mTask 2 executed successfully!\x1b[0m');
}

// Helper function to safely read file
function readFileContent() {
  try {
    const data = fs.readFileSync('sample.txt', 'utf8');
    console.log('File Content:\n' + data);
  } catch (err) {
    console.log('Sample file not found or could not be read.');
  }
}

// ==========================================
function runChallenge() {
  console.log('==========================================');
  console.log('       RUNNING COMPLETE CHALLENGE         ');
  console.log('==========================================\n');

  // Task 1: Greet User
  console.log('--- Task 1: Greeting ---');
  const greeting = greet('Developer');
  console.log(greeting);

  // Task 2: Display Colorful Message
  console.log('\n--- Task 2: Colorful Message ---');
  displayColorfulMessage();

  // Task 3: Read & Display File Content
  console.log('\n--- Task 3: Read File ---');
  readFileContent();

  console.log('\n==========================================');
  // Replaced chalk.bold.magenta with standard ANSI escape codes:
  console.log('\x1b[1m\x1b[35mAll tasks completed successfully!\x1b[0m');
  console.log('==========================================');
}

// Execute integrated program
runChallenge();