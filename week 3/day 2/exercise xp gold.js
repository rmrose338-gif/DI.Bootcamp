// ===== Exercise 1: is_Blank =====

// Function to check whether a string is blank or not
function isBlank(str) {
  return str.trim() === '';
}

// Test cases
console.log(isBlank('')); // --> true
console.log(isBlank('abc')); // --> false
console.log(isBlank('   ')); // --> true (spaces only)
console.log(isBlank('hello')); // --> false

// ===== Exercise 2: Abbrev_name =====

// Function to convert a string into an abbreviated form
function abbrevName(str) {
  // Split the string into words
  const words = str.trim().split(' ');
  
  // First word stays as is, remaining words are abbreviated to first letter + period
  let abbreviated = words[0];
  
  for (let i = 1; i < words.length; i++) {
    abbreviated += ' ' + words[i].charAt(0).toUpperCase() + '.';
  }
  
  return abbreviated;
}

// Test cases
console.log(abbrevName("Robin Singh")); // --> "Robin S."
console.log(abbrevName("john doe")); // --> "John D."
console.log(abbrevName("alice bob charlie")); // --> "Alice B. C."

// ===== Exercise 3: SwapCase =====

// Function to swap the case of each character in a string
function swapCase(str) {
  let swapped = '';
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    
    // If character is uppercase, convert to lowercase
    if (char === char.toUpperCase() && char !== char.toLowerCase()) {
      swapped += char.toLowerCase();
    }
    // If character is lowercase, convert to uppercase
    else if (char === char.toLowerCase() && char !== char.toUpperCase()) {
      swapped += char.toUpperCase();
    }
    // If character is not a letter, keep it as is
    else {
      swapped += char;
    }
  }
  
  return swapped;
}

// Test cases
console.log(swapCase('The Quick Brown Fox')); // --> "tHE qUICK bROWN fOX"
console.log(swapCase('Hello World')); // --> "hELLO wORLD"
console.log(swapCase('123 ABC xyz')); // --> "123 abc XYZ"

// ===== Exercise 4: Omnipresent value =====

// Function to check if a value is omnipresent in all subarrays
function isOmnipresent(arr, value) {
  // Check if the value exists in every subarray
  for (let i = 0; i < arr.length; i++) {
    const subarray = arr[i];
    
    // If value is not found in this subarray, return false
    if (!subarray.includes(value)) {
      return false;
    }
  }
  
  // If value is found in all subarrays, return true
  return true;
}

// Alternative solution using every() method
function isOmnipresentAlt(arr, value) {
  return arr.every(subarray => subarray.includes(value));
}

// Test cases
console.log(isOmnipresent([[3, 4], [8, 3, 2], [3], [9, 3], [5, 3], [4, 3]], 3)); // --> true
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1)); // --> true
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6)); // --> false
console.log(isOmnipresent([[2, 2], [2, 5], [2, 2]], 2)); // --> true
console.log(isOmnipresent([[1, 2], [3, 4], [5, 6]], 7)); // --> false



