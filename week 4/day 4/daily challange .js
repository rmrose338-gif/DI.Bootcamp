
// 1st Daily Challenge: Array Manipulation 

function makeAllCaps(words) {
  return new Promise((resolve, reject) => {
    const isAllStrings = words.every((word) => typeof word === "string");
    if (isAllStrings) {
      resolve(words.map((word) => word.toUpperCase()));
    } else {
      reject("Error: Not all elements in the array are strings.");
    }
  });
}

function sortWords(words) {
  return new Promise((resolve, reject) => {
    if (words.length > 4) {
      resolve([...words].sort());
    } else {
      reject("Error: Array length must be greater than 4.");
    }
  });
}

// Tests for Daily Challenge 1:
console.log("--- 1st Daily Challenge Tests ---");

makeAllCaps([1, "pear", "banana"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch((error) => console.log(error)); 
  // Output: Error: Not all elements in the array are strings.

makeAllCaps(["apple", "pear", "banana"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch((error) => console.log(error)); 
  // Output: Error: Array length must be greater than 4.

makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
  .then((arr) => sortWords(arr))
  .then((result) => console.log(result))
  .catch((error) => console.log(error)); 
  // Output: ["APPLE", "BANANA", "KIWI", "MELON", "PEAR"]

// 2nd Daily Challenge: Morse Code Translator

const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;

function toJs() {
  return new Promise((resolve, reject) => {
    try {
      const morseObj = JSON.parse(morse);
      if (Object.keys(morseObj).length === 0) {
        reject("Error: Morse object is empty.");
      } else {
        resolve(morseObj);
      }
    } catch (err) {
      reject("Error: Invalid JSON format.");
    }
  });
}

function toMorse(morseJS) {
  return new Promise((resolve, reject) => {
    const userInput = prompt("Enter a word or a sentence:");
    if (!userInput) {
      reject("Error: No input provided.");
      return;
    }

    const chars = userInput.toLowerCase().split("");
    const translation = [];

    for (const char of chars) {
      if (char === " ") continue; // Ignore spaces

      if (morseJS[char]) {
        translation.push(morseJS[char]);
      } else {
        reject(`Error: Character "${char}" doesn't exist in the morse javascript object.`);
        return;
      }
    }

    resolve(translation);
  });
}

function joinWords(morseTranslation) {
  const resultString = morseTranslation.join("\n");
  
  // Output to browser console
  console.log(resultString);

  // Render to page (DOM)
  const element = document.createElement("pre");
  element.textContent = resultString;
  document.body.appendChild(element);
}

// Execution for Daily Challenge 2:
toJs()
  .then((morseJS) => toMorse(morseJS))
  .then((morseTranslation) => joinWords(morseTranslation))
  .catch((error) => console.log(error));