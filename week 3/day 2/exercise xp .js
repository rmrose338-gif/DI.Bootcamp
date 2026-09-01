// ===== Exercise 1: Find the numbers divisible by 23 =====

// 1. Create a function called displayNumbersDivisible() with optional parameter divisor
// Bonus: Add divisor parameter (default to 23)
function displayNumbersDivisible(divisor = 23) {
  let sum = 0;
  let divisibleNumbers = [];

  // 2. Loop through numbers 0 to 500
  for (let i = 0; i <= 500; i++) {
    // 3. Check if number is divisible by divisor
    if (i % divisor === 0) {
      divisibleNumbers.push(i);
      sum += i;
    }
  }

  // 3. Console.log all the numbers divisible by divisor
  console.log(`Numbers divisible by ${divisor}:`, divisibleNumbers.join(" "));
  
  // 4. Console.log the sum of all numbers divisible by divisor
  console.log(`Sum: ${sum}`);
}

// Test with divisor 23
console.log("--- Testing with divisor 23 ---");
displayNumbersDivisible(23);

// Bonus: Test with different divisors
console.log("\n--- Testing with divisor 3 ---");
displayNumbersDivisible(3);

console.log("\n--- Testing with divisor 45 ---");
displayNumbersDivisible(45);

// ===== Exercise 2: Shopping List =====

// 1. Add stock and prices objects
const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry": 1
}  

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry": 10
} 

// 2. Create a shoppingList array with banana, orange, and apple
const shoppingList = ["banana", "orange", "apple"];

// 3. Create a function called myBill() that takes no parameters
function myBill() {

  let total = 0;

  // Loop through shoppingList
  for (let i = 0; i < shoppingList.length; i++) {
    let item = shoppingList[i];

    // 4.1 Check if item is in stock
    if (item in stock) {
      // Check if quantity is greater than 0
      if (stock[item] > 0) {
        // 4.2 Get the price from the prices object
        let itemPrice = prices[item];
        total += itemPrice;

        // Bonus: Decrease stock by 1
        stock[item]--;
        console.log(`Added ${item} to bill (price: $${itemPrice}). Stock remaining: ${stock[item]}`);
      } else {
        console.log(`${item} is out of stock`);
      }
    } else {
      console.log(`${item} is not in the store`);
    }
  }

  return total;
}

// 5. Call the myBill() function
console.log("\n--- Exercise 2: Shopping List ---");
let totalBill = myBill();
console.log(`Total bill: $${totalBill}`);

// Show updated stock after purchase
console.log("\nUpdated stock after purchase:");
console.log(stock);

// ===== Exercise 3: What's in my wallet? =====

// 1 & 2. Create a function named changeEnough(itemPrice, amountOfChange)
// Determine if you can afford the item
function changeEnough(itemPrice, amountOfChange) {
  // Define coin values: quarters, dimes, nickels, pennies
  const coinValues = [0.25, 0.10, 0.05, 0.01];
  
  // Calculate total change available
  let totalChange = 0;
  for (let i = 0; i < amountOfChange.length; i++) {
    totalChange += amountOfChange[i] * coinValues[i];
  }
  
  // Round to 2 decimal places to avoid floating point precision issues
  totalChange = Math.round(totalChange * 100) / 100;
  
  // Return true if total change >= itemPrice, false otherwise
  return totalChange >= itemPrice;
}

// 4. Test the function with examples
console.log("\n--- Exercise 3: What's in my wallet? ---");
console.log(`changeEnough(4.25, [25, 20, 5, 0]) => ${changeEnough(4.25, [25, 20, 5, 0])}`);
// Explanation: 25*0.25 + 20*0.10 + 5*0.05 + 0*0.01 = 6.25 + 2 + 0.25 + 0 = 8.50 >= 4.25 => true

console.log(`changeEnough(14.11, [2, 100, 0, 0]) => ${changeEnough(14.11, [2, 100, 0, 0])}`);
// Explanation: 2*0.25 + 100*0.10 + 0*0.05 + 0*0.01 = 0.50 + 10 + 0 + 0 = 10.50 < 14.11 => false

console.log(`changeEnough(0.75, [0, 0, 20, 5]) => ${changeEnough(0.75, [0, 0, 20, 5])}`);
// Explanation: 0*0.25 + 0*0.10 + 20*0.05 + 5*0.01 = 0 + 0 + 1.00 + 0.05 = 1.05 >= 0.75 => true

// ===== Exercise 4: Vacation Costs =====

// BONUS IMPLEMENTATION: All prompts in totalVacationCost()
// Functions receive parameters instead of using prompt inside

// 1. Define hotelCost() - receives number of nights as parameter
function hotelCost(nights) {
  const pricePerNight = 140;
  return nights * pricePerNight;
}

// 2. Define planeRideCost() - receives destination as parameter
function planeRideCost(destination) {
  const prices = {
    "London": 183,
    "Paris": 220
  };
  
  // Return specific price or default 300 for other destinations
  return prices[destination] || 300;
}

// 3. Define rentalCarCost() - receives number of days as parameter
function rentalCarCost(days) {
  const pricePerDay = 40;
  let totalCost = days * pricePerDay;
  
  // 5% discount if renting for more than 10 days
  if (days > 10) {
    totalCost = totalCost * 0.95;  // Apply 5% discount
  }
  
  return totalCost;
}

// 4. Define totalVacationCost() - gathers all user input and combines costs
function totalVacationCost() {
  console.log("\n--- Exercise 4: Vacation Costs Calculator ---");
  
  // Get hotel nights from user
  let nights;
  while (true) {
    nights = prompt("How many nights would you like to stay in the hotel?");
    if (nights !== null && !isNaN(nights) && nights > 0) {
      nights = Number(nights);
      break;
    }
    console.log("Please enter a valid number of nights.");
  }
  
  // Get plane destination from user
  let destination;
  while (true) {
    destination = prompt("What is your destination? (London, Paris, or other)");
    if (destination !== null && destination.trim() !== "" && isNaN(destination)) {
      destination = destination.trim();
      break;
    }
    console.log("Please enter a valid destination (text only).");
  }
  
  // Get rental car days from user
  let days;
  while (true) {
    days = prompt("How many days would you like to rent the car?");
    if (days !== null && !isNaN(days) && days > 0) {
      days = Number(days);
      break;
    }
    console.log("Please enter a valid number of days.");
  }
  
  // Calculate individual costs
  const hotelTotal = hotelCost(nights);
  const planeTotal = planeRideCost(destination);
  const carTotal = rentalCarCost(days);
  
  // Calculate total vacation cost
  const totalCost = hotelTotal + planeTotal + carTotal;
  
  // Display results
  console.log(`\nVacation Cost Breakdown:`);
  console.log(`Hotel: $${hotelTotal} (${nights} nights × $140/night)`);
  console.log(`Plane ticket to ${destination}: $${planeTotal}`);
  const discountInfo = days > 10 ? ` (5% discount applied)` : "";
  console.log(`Car rental: $${carTotal.toFixed(2)} (${days} days × $40/day${discountInfo})`);
  console.log(`\nTotal Vacation Cost: $${totalCost.toFixed(2)}`);
  
  return totalCost;
}

// 5. Call the function totalVacationCost()
// Uncomment the line below to run the vacation calculator with prompts
// totalVacationCost();

// Demo version without prompts (for testing/display purposes)
console.log("\n--- Exercise 4: Vacation Costs (Demo) ---");
const demoHotel = hotelCost(5);
const demoPlane = planeRideCost("Paris");
const demoCar = rentalCarCost(12);
const demoTotal = demoHotel + demoPlane + demoCar;

console.log(`Demo Calculation:`);
console.log(`Hotel (5 nights): $${demoHotel}`);
console.log(`Plane to Paris: $${demoPlane}`);
console.log(`Car rental (12 days with 5% discount): $${demoCar.toFixed(2)}`);
console.log(`Total Vacation Cost: $${demoTotal.toFixed(2)}`);


