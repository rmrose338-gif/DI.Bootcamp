const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'foo');
});

// Promise.all accepts an array of promises (and non-promise values)
Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log(values); // Output after 3 seconds: [3, 42, "foo"]
  })
  .catch((error) => {
    console.error("One of the promises rejected:", error);
  });

/*
 * HOW PROMISE.ALL WORKS AND WHY THIS IS THE OUTPUT:
 * 
 * 1. Parallel Execution: Promise.all takes an iterable (like an array) of promises and runs them concurrently.
 * 2. Non-Promise Values: Non-promise values in the array (like the number 42) are automatically wrapped 
 *    in an instantly-resolved Promise via Promise.resolve(42).
 * 3. Waiting for the Slowest Task: The returned promise waits until ALL input promises have successfully 
 *    resolved. Since promise3 takes 3 seconds, the entire Promise.all waits 3 seconds before continuing.
 * 4. Preserved Order: The results array matches the original array order ([promise1, promise2, promise3]), 
 *    not the order in which the promises finished.
 * 5. Short-Circuiting on Error ("All-or-Nothing"): If any single promise in the array rejects, 
 *    Promise.all immediately rejects, skipping .then() and jumping straight to .catch().
 */



function timesTwoAsync(x) {
  return new Promise((resolve) => resolve(x * 2));
}

const arr = [1, 2, 3];
const promiseArr = arr.map(timesTwoAsync);

Promise.all(promiseArr)
  .then((result) => {
    console.log(result); // Logs: [2, 4, 6]
  })
  .catch((error) => {
    console.error("Error:", error);
  });


  