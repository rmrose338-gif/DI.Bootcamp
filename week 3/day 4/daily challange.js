let client = "John";

const groceries = {
    fruits: ["pear", "apple", "banana"],
    vegetables: ["tomatoes", "cucumber", "salad"],
    totalPrice: "20$",
    other: {
        paid: true,
        meansOfPayment: ["cash", "creditCard"]
    }
};

// 1. Display the 3 fruits with forEach
const displayGroceries = () => {
    groceries.fruits.forEach((fruit) => {
        console.log(fruit);
    });
};

// 2. Clone / copy behavior and reference behavior
const cloneGroceries = () => {
    // Primitive value: strings are copied by value
    let user = client;
    client = "Betty";
    console.log("user:", user); // John
    console.log("client:", client); // Betty
    // No, the user variable does not change when client changes because strings are primitive values and are passed by value.

    // Object reference: objects are shared by reference
    let shopping = groceries;
    shopping.totalPrice = "35$";
    console.log("shopping.totalPrice:", shopping.totalPrice); // 35$
    console.log("groceries.totalPrice:", groceries.totalPrice); // 35$
    // Yes, both reflect the change because shopping and groceries point to the same object reference.

    shopping.other.paid = false;
    console.log("shopping.other.paid:", shopping.other.paid); // false
    console.log("groceries.other.paid:", groceries.other.paid); // false
    // Yes, nested objects are also shared by reference, so changing paid inside shopping.other affects groceries.other too.
};

// 3. Invoke the function
cloneGroceries();
displayGroceries();
