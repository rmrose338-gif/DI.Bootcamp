// ==========================================
// Exercise 1 : Menu
// ==========================================
const menu = [
  {
    type: "starter",
    name: "Houmous with Pita"
  },
  {
    type: "starter",
    name: "Vegetable Soup with Houmous peas"
  },
  {
    type: "dessert",
    name: "Chocolate Cake"
  }
];

// 1. Check if at least one element is a dessert using .some() & ternary operator
const hasDessert = menu.some(item => item.type === "dessert") ? "Yes, dessert exists." : "No dessert found.";
console.log(hasDessert);

// 2. Check if all elements are starters using .every()
const allStarters = menu.every(item => item.type === "starter");
console.log("Are all items starters?", allStarters);

// 3. Check for main course; if absent, push one to array
const hasMainCourse = menu.some(item => item.type === "main");
if (!hasMainCourse) {
  menu.push({ type: "main", name: "Grilled Salmon" });
}
console.log("Updated Menu:", menu);

// 4. Add 'vegetarian' key based on vegetarian array keywords
const vegetarian = ["vegetable", "houmous", "eggs", "vanilla", "potatoes"];

menu.forEach(item => {
  const nameLower = item.name.toLowerCase();
  item.vegetarian = vegetarian.some(ingredient => nameLower.includes(ingredient));
});

console.log("Menu with Vegetarian status:", menu);


// ==========================================
// Exercise 2 : Chop into chunks
// ==========================================
function string_chop(str, size) {
  if (!str || size <= 0) return [];
  const chunks = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size));
  }
  return chunks;
}

console.log(string_chop('developers', 2)); 
// Output: ["de", "ve", "lo", "pe", "rs"]


// ==========================================
// Exercise 3 : You said string ?
// ==========================================
function search_word(text, word) {
  if (!text || !word) return `'${word}' was found 0 times.`;
  // Use regex with 'gi' flags for case-insensitive global search
  const regex = new RegExp(`\\b${word}\\b`, 'gi');
  const matches = text.match(regex);
  const count = matches ? matches.length : 0;
  return `'${word}' was found ${count} times.`;
}

console.log(search_word('The quick brown fox', 'fox')); 
// Output: "'fox' was found 1 times."


// ==========================================
// Exercise 4 : Reverse Array (In-Place)
// ==========================================
function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // Swap elements in-place without creating a new array
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    
    left++;
    right--;
  }
  return arr;
}

console.log(reverseArray([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]
console.log(reverseArray([1, 2]));          // [2, 1]
console.log(reverseArray([]));              // []
console.log(reverseArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])); // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]