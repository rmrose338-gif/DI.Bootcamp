
// Exercise 1: Class with Access Modifiers

class Employee {
  private name: string;
  private salary: number;
  public position: string;
  protected department: string;

  constructor(name: string, salary: number, position: string, department: string) {
    this.name = name;
    this.salary = salary;
    this.position = position;
    this.department = department;
  }

  public getEmployeeInfo(): string {
    return `Name: ${this.name}, Position: ${this.position}`;
  }
}

const emp = new Employee("Alice", 75000, "Developer", "Engineering");
console.log(emp.getEmployeeInfo());



// Exercise 2: Readonly Properties in a Class

class Product {
  readonly id: number;
  public name: string;
  public price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  public getProductInfo(): string {
    return `Product: ${this.name}, Price: $${this.price}`;
  }
}

const item = new Product(101, "Laptop", 1200);
console.log(item.getProductInfo());

// Attaching modification test:
// Uncommenting the line below will trigger TypeScript compiler error: 
// "Cannot assign to 'id' because it is a read-only property."
// item.id = 202;



// Exercise 3: Class Inheritance

class Animal {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public makeSound(): string {
    return "Some generic sound";
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  public override makeSound(): string {
    return "bark";
  }
}

const myDog = new Dog("Buddy");
console.log(`${myDog.name} says: ${myDog.makeSound()}`);



// Exercise 4: Static Properties and Methods

class Calculator {
  public static add(a: number, b: number): number {
    return a + b;
  }

  public static subtract(a: number, b: number): number {
    return a - b;
  }
}

console.log("Add:", Calculator.add(10, 5));
console.log("Subtract:", Calculator.subtract(10, 5));



// Exercise 5: Extending Interfaces

interface User {
  readonly id: number;
  name: string;
  email: string;
}

interface PremiumUser extends User {
  membershipLevel?: string;
}

function printUserDetails(user: PremiumUser): void {
  console.log(`User ID: ${user.id}`);
  console.log(`Name: ${user.name}`);
  console.log(`Email: ${user.email}`);
  if (user.membershipLevel) {
    console.log(`Membership Level: ${user.membershipLevel}`);
  }
}

const premiumMember: PremiumUser = {
  id: 1,
  name: "Sarah",
  email: "sarah@example.com",
  membershipLevel: "Gold"
};

printUserDetails(premiumMember);