// Exercise 1: Random Number
// 1. Get a random number between 1 and 100.
// 2. Console.log all even numbers from 0 to the random number.

const randomNumber = Math.floor(Math.random() * 100) + 1;
console.log("Random number:", randomNumber);

for (let i = 0; i <= randomNumber; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// Example output:
// Random number: 27
// 0
// 2
// 4
// 6
// 8
// 10
// 12
// 14
// 16
// 18
// 20
// 22
// 24
// 26

// Exercise 2: Capitalized letters
function capitalize(string) {
  const evenCapitalized = [...string]
    .map((char, index) => (index % 2 === 0 ? char.toUpperCase() : char))
    .join('');

  const oddCapitalized = [...string]
    .map((char, index) => (index % 2 !== 0 ? char.toUpperCase() : char))
    .join('');

  return [evenCapitalized, oddCapitalized];
}

console.log(capitalize('abcdef')); // ['AbCdEf', 'aBcDeF']

// Exercise 3: Is palindrome?
function isPalindrome(string) {
  const cleanedString = string
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  return cleanedString === cleanedString.split('').reverse().join('');
}

console.log(isPalindrome('madam')); // true
console.log(isPalindrome('A man, a plan, a canal, Panama')); // true
console.log(isPalindrome('hello')); // false

// Exercise 4: Biggest Number
function biggestNumberInArray(arrayNumber) {
  if (!Array.isArray(arrayNumber) || arrayNumber.length === 0) {
    return 0;
  }

  const numericValues = arrayNumber
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value));

  if (numericValues.length === 0) {
    return 0;
  }

  return Math.max(...numericValues);
}

console.log(biggestNumberInArray([-1, 0, 3, 100, 99, 2, 99])); // 100
console.log(biggestNumberInArray(['a', 3, 4, 2])); // 4
console.log(biggestNumberInArray([])); // 0

// Exercise 5: Unique Elements
function uniqueElements(array) {
  return [...new Set(array)];
}

console.log(uniqueElements([1, 2, 3, 3, 3, 3, 4, 5])); // [1, 2, 3, 4, 5]

// Exercise 6: Calendar
function createCalendar(year, month) {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  weekdays.forEach((day) => {
    const th = document.createElement('th');
    th.textContent = day;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const firstWeekdayIndex = (firstDayOfMonth.getDay() + 6) % 7; // Monday = 0

  let dayCounter = 1;
  let weekRow;

  for (let i = 0; i < 6; i++) {
    weekRow = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');

      if (i === 0 && j < firstWeekdayIndex) {
        cell.textContent = '';
      } else if (dayCounter > daysInMonth) {
        cell.textContent = '';
      } else {
        cell.textContent = dayCounter;
        dayCounter += 1;
      }

      weekRow.appendChild(cell);
    }

    tbody.appendChild(weekRow);

    if (dayCounter > daysInMonth) {
      break;
    }
  }

  table.appendChild(tbody);
  return table;
}

// Example usage in browser:
// const calendarTable = createCalendar(2012, 9);
// document.body.appendChild(calendarTable);


