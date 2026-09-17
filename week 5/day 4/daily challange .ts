
//  Advanced Type Guards with Discriminated Unions


// 1. Define Discriminated Union Types
type User = {
  type: "user";
  name: string;
  age: number;
};

type Product = {
  type: "product";
  id: number;
  price: number;
};

type Order = {
  type: "order";
  orderId: string;
  amount: number;
};

// Combine all types into a single union
type DataItem = User | Product | Order;

// Custom Type Guard Functions
function isUser(item: DataItem): item is User {
  return item.type === "user";
}

function isProduct(item: DataItem): item is Product {
  return item.type === "product";
}

function isOrder(item: DataItem): item is Order {
  return item.type === "order";
}

// 2. Main processing function using narrowing and type guards
function handleData(items: DataItem[]): string[] {
  return items.map((item) => {
    // Narrowing using custom type guards (or checking item.type directly)
    if (isUser(item)) {
      return `Hello ${item.name}, you are ${item.age} years old.`;
    } else if (isProduct(item)) {
      return `Product ID ${item.id} is priced at $${item.price.toFixed(2)}.`;
    } else if (isOrder(item)) {
      return `Order #${item.orderId} total amount: $${item.amount.toFixed(2)}.`;
    } else {
      // 3. Exhaustiveness checking for unexpected or unhandled cases
      const _exhaustiveCheck: never = item;
      return `Unhandled item type: ${JSON.stringify(_exhaustiveCheck)}`;
    }
  });
}


//  Test Cases

const testItems: DataItem[] = [
  { type: "user", name: "Alice", age: 29 },
  { type: "product", id: 101, price: 49.99 },
  { type: "order", orderId: "ORD-9876", amount: 120.5 },
  { type: "user", name: "Bob", age: 35 },
];

const results = handleData(testItems);

results.forEach((outputLine) => console.log(outputLine));