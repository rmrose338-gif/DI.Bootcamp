function compareToTen(num) {
  return new Promise((resolve, reject) => {
    if (num <= 10) {
      resolve(`${num} is less than or equal to 10`);
    } else {
      reject(`${num} is greater than 10`);
    }
  });
}

// Test 1: Should reject
compareToTen(15)
  .then(result => console.log(result))
  .catch(error => console.log(error)); // Output: 15 is greater than 10

// Test 2: Should resolve
compareToTen(8)
  .then(result => console.log(result))
  .catch(error => console.log(error)); // Output: 8 is less than or equal to 10



  const myPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("success");
  }, 4000);
});

// Testing the promise
myPromise.then((result) => {
  console.log(result); // Logs "success" after waiting 4 seconds
});





// 1. A promise that resolves immediately with the value 3
const resolvedPromise = Promise.resolve(3);

resolvedPromise.then((value) => {
  console.log(value); // Output: 3
});

// 2. A promise that rejects immediately with the string "Boo!"
const rejectedPromise = Promise.reject("Boo!");

rejectedPromise.catch((error) => {
  console.log(error); // Output: Boo!

});








