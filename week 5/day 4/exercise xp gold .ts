
// Exercise 1

interface User {
  name: string;
  email: string;
}

interface Admin {
  adminLevel: number;
}

// Combine User and Admin using an intersection type
type AdminUser = User & Admin;

// Function using 'in' operator as a type guard to safely check and extract properties
function getProperty<T extends object, K extends string>(obj: T, propName: K): any {
  if (propName in obj) {
    return (obj as any)[propName];
  }
  return undefined;
}

const adminUserObj: AdminUser = {
  name: "Sarah",
  email: "sarah@example.com",
  adminLevel: 1,
};

console.log("Exercise 1 (Valid Prop):", getProperty(adminUserObj, "email"));
console.log("Exercise 1 (Invalid Prop):", getProperty(adminUserObj, "age"));



//  Exercise 2

// Constructable type representing built-in constructor functions (e.g., Number, Boolean, String)
type Constructor<T> = new (val: any) => T;

function castToType<T>(value: any, targetConstructor: Constructor<T> | Function): T {
  // Pass value into the constructor function to perform conversion/casting
  return (targetConstructor as Function)(value) as T;
}

// Casting string to number
const castedNumber = castToType<number>("123.45", Number);
// Casting string to boolean
const castedBoolean = castToType<boolean>("true", Boolean);

console.log("Exercise 2 (String -> Number):", castedNumber, typeof castedNumber);
console.log("Exercise 2 (String -> Boolean):", castedBoolean, typeof castedBoolean);



//  Exercise 3

// Constrain generic T so it can only be number or string
function getArrayLength<T extends number | string>(items: T[]): number {
  // Type assertion ensuring TypeScript treats items as an array before reading .length
  const arrayItems = items as T[];
  return arrayItems.length;
}

const numberArr: number[] = [10, 20, 30, 40];
const stringArr: string[] = ["alpha", "beta", "gamma"];

console.log("Exercise 3 (Number Array Length):", getArrayLength(numberArr));
console.log("Exercise 3 (String Array Length):", getArrayLength(stringArr));


//  Exercise 4

interface StorageInterface<T> {
  add(item: T): void;
  get(index: number): T | undefined;
}

// Class 'Box' implementing the generic 'StorageInterface'
class Box<T> implements StorageInterface<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }
}

const stringBox = new Box<string>();
stringBox.add("TypeScript");
stringBox.add("Generics");

const numberBox = new Box<number>();
numberBox.add(100);
numberBox.add(200);

console.log("Exercise 4 (String Box):", stringBox.get(0));
console.log("Exercise 4 (Number Box):", numberBox.get(1));


//  Exercise 5

interface Item<T> {
  value: T;
}

// Class Queue constrained to items extending the Item interface structure
class Queue<T, I extends Item<T>> {
  private collection: I[] = [];

  add(item: I): void {
    this.collection.push(item);
  }

  remove(): I | undefined {
    return this.collection.shift();
  }
}

// Instantiating Queue with string payload items
const stringQueue = new Queue<string, Item<string>>();
stringQueue.add({ value: "Task 1" });
stringQueue.add({ value: "Task 2" });

console.log("Exercise 5 (Removed String Item):", stringQueue.remove()?.value);

// Instantiating Queue with number payload items
const numberQueue = new Queue<number, Item<number>>();
numberQueue.add({ value: 500 });
numberQueue.add({ value: 1000 });

console.log("Exercise 5 (Removed Number Item):", numberQueue.remove()?.value);