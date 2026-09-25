const fs = require('fs');
const path = require('path');

// Helper function to create temporary files and directories automatically
function setupFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (dir !== '.' && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');
}

// Helper to safely cleanup created files after running
function cleanup(paths) {
  paths.forEach((p) => {
    if (fs.existsSync(p)) {
      const stat = fs.statSync(p);
      if (stat.isDirectory()) {
        fs.rmSync(p, { recursive: true, force: true });
      } else {
        fs.unlinkSync(p);
      }
    }
  });
}

async function runAllExercises() {
  console.log('==================================================');
  console.log(' EXERCISE 1: Multiple Exports/Import (CommonJS)');
  console.log('==================================================');
  
  setupFile('products.js', `
    const products = [
      { name: 'Laptop', price: 1000, category: 'Electronics' },
      { name: 'Phone', price: 600, category: 'Electronics' },
      { name: 'Book', price: 20, category: 'Books' }
    ];
    module.exports = products;
  `);

  setupFile('shop.js', `
    const products = require('./products');

    function searchProduct(productName) {
      const found = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
      if (found) {
        console.log(\`Found Product: \${found.name} | Price: $\${found.price} | Category: \${found.category}\`);
      } else {
        console.log(\`Product "\${productName}" not found.\`);
      }
    }

    searchProduct('Laptop');
    searchProduct('Book');
    searchProduct('Tablet');
  `);

  // Run Exercise 1
  require('./shop.js');


  console.log('\n==================================================');
  console.log(' EXERCISE 2: Advanced Module Usage (ES6)');
  console.log('==================================================');

  setupFile('data.js', `
    export const persons = [
      { name: 'Alice', age: 25, location: 'New York' },
      { name: 'Bob', age: 30, location: 'London' },
      { name: 'Charlie', age: 35, location: 'Paris' }
    ];
  `);

  // Using dynamic import to support ES6 export syntax
  const { persons } = await import('data:text/javascript,' + encodeURIComponent(`
    export const persons = [
      { name: 'Alice', age: 25, location: 'New York' },
      { name: 'Bob', age: 30, location: 'London' },
      { name: 'Charlie', age: 35, location: 'Paris' }
    ];
  `));

  function calculateAverageAge(people) {
    const totalAge = people.reduce((sum, p) => sum + p.age, 0);
    const avg = totalAge / people.length;
    console.log(`Average Age of Persons: ${avg.toFixed(2)}`);
  }

  calculateAverageAge(persons);


  console.log('\n==================================================');
  console.log(' EXERCISE 3: File Management (CommonJS)');
  console.log('==================================================');

  setupFile('fileManager.js', `
    const fs = require('fs');

    function readFile(filePath) {
      try {
        return fs.readFileSync(filePath, 'utf8');
      } catch (err) {
        console.error('Error reading file:', err.message);
        return null;
      }
    }

    function writeFile(filePath, content) {
      try {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(\`Successfully wrote to "\${filePath}"\`);
      } catch (err) {
        console.error('Error writing file:', err.message);
      }
    }

    module.exports = { readFile, writeFile };
  `);

  setupFile('Hello World.txt', 'Hello World !! ');
  setupFile('Bye World.txt', 'Bye World !! ');

  const { readFile, writeFile } = require('./fileManager.js');

  const helloContent = readFile('Hello World.txt');
  console.log('Read Content from "Hello World.txt":', helloContent);

  writeFile('Bye World.txt', 'Writing to the file');
  console.log('Updated "Bye World.txt" Content:', readFile('Bye World.txt'));


  console.log('\n==================================================');
  console.log(' EXERCISE 4: Todo List (ES6 Class Module)');
  console.log('==================================================');

  const { TodoList } = await import('data:text/javascript,' + encodeURIComponent(`
    export class TodoList {
      constructor() {
        this.tasks = [];
      }

      addTask(task) {
        this.tasks.push({ task, completed: false });
        console.log(\`Added task: "\${task}"\`);
      }

      completeTask(task) {
        const item = this.tasks.find(t => t.task === task);
        if (item) {
          item.completed = true;
          console.log(\`Marked complete: "\${task}"\`);
        }
      }

      listTasks() {
        console.log('\\n--- Current Todo List ---');
        this.tasks.forEach((t, i) => {
          const status = t.completed ? '[✓]' : '[ ]';
          console.log(\`\${i + 1}. \${status} \${t.task}\`);
        });
      }
    }
  `));

  const myTodo = new TodoList();
  myTodo.addTask('Learn Node.js');
  myTodo.addTask('Build Express API');
  myTodo.completeTask('Learn Node.js');
  myTodo.listTasks();


  console.log('\n==================================================');
  console.log(' EXERCISE 5: Custom Math Module');
  console.log('==================================================');

  setupFile('math-app/math.js', `
    function add(a, b) { return a + b; }
    function multiply(a, b) { return a * b; }
    module.exports = { add, multiply };
  `);

  const math = require('./math-app/math.js');
  console.log('Addition (15 + 25):', math.add(15, 25));
  console.log('Multiplication (6 * 7):', math.multiply(6, 7));

  // Native array utility substitute for lodash mean calculation
  const numbers = [10, 20, 30, 40, 50];
  const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  console.log('Calculated Mean of [10, 20, 30, 40, 50]:', mean);


  console.log('\n==================================================');
  console.log(' EXERCISE 6: Styled Terminal Output');
  console.log('==================================================');

  // Standard ANSI escape sequences to provide styling without external package dependencies
  const styles = {
    green: (str) => `\x1b[32m${str}\x1b[0m`,
    redBold: (str) => `\x1b[1m\x1b[31m${str}\x1b[0m`,
    yellowBgBlueText: (str) => `\x1b[43m\x1b[34m${str}\x1b[0m`
  };

  console.log(styles.green('Success: NPM beginner package executed successfully!'));
  console.log(styles.redBold('Error: Styled red alert message!'));
  console.log(styles.yellowBgBlueText(' Styled Notice '));


  console.log('\n==================================================');
  console.log(' EXERCISE 7: Reading and Copying Files');
  console.log('==================================================');

  setupFile('file-explorer/source.txt', 'This is the sample text copied from source.txt to destination.txt.');

  const sourcePath = path.join(__dirname, 'file-explorer', 'source.txt');
  const destPath = path.join(__dirname, 'file-explorer', 'destination.txt');

  // Copy operations
  const contentToCopy = fs.readFileSync(sourcePath, 'utf8');
  fs.writeFileSync(destPath, contentToCopy, 'utf8');
  console.log('Successfully copied contents to "destination.txt".');

  // Read directory contents
  const files = fs.readdirSync(path.join(__dirname, 'file-explorer'));
  console.log(`\nFiles inside directory (${path.join(__dirname, 'file-explorer')}):`);
  files.forEach((f) => console.log(` - ${f}`));

  // Clean up all generated temporary exercise files
  cleanup([
    'products.js',
    'shop.js',
    'data.js',
    'fileManager.js',
    'Hello World.txt',
    'Bye World.txt',
    'math-app',
    'file-explorer'
  ]);
}

runAllExercises().catch(console.error);