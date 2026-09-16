// Exercise 1
class Employee {
  public name: string;
  private age: number;
  protected salary: number;

  constructor(name: string, age: number, salary: number) {
    this.name = name;
    this.age = age;
    this.salary = salary;
  }

  protected calculateBonus(): number {
    return this.salary * 0.10;
  }

  public getSalaryDetails(): string {
    return `Employee ${this.name} base salary: $${this.salary}`;
  }
}

class Manager extends Employee {
  constructor(name: string, age: number, salary: number) {
    super(name, age, salary);
  }

  public override getSalaryDetails(): string {
    const bonus = this.calculateBonus(); 
    const total = this.salary + bonus;    
    return `Manager ${this.name} - Base: $${this.salary}, Bonus: $${bonus}, Total: $${total}`;
  }
}

class ExecutiveManager extends Manager {
  constructor(name: string, age: number, salary: number) {
    super(name, age, salary);
  }

  public approveBudget(amount: number): string {
    return `Executive Manager ${this.name} approved a budget of $${amount}`;
  }
}

const execManager = new ExecutiveManager("David", 45, 120000);
console.log(execManager.getSalaryDetails());
console.log(execManager.approveBudget(50000));


// Exercise 2
class Shape {
  public static totalShapes: number = 0;

  constructor() {
    Shape.totalShapes++;
  }

  public static getType(): string {
    return "Generic Shape";
  }
}

class Circle extends Shape {
  public radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  public getArea(): number {
    return Math.PI * Math.pow(this.radius, 2);
  }

  public static override getType(): string {
    return "Circle";
  }
}

class Square extends Shape {
  public side: number;

  constructor(side: number) {
    super();
    this.side = side;
  }

  public getArea(): number {
    return this.side * this.side;
  }

  public static override getType(): string {
    return "Square";
  }
}

const circle = new Circle(5);
const square = new Square(4);

console.log("Shape 1 Type:", Circle.getType());
console.log("Circle Area:", circle.getArea());
console.log("Shape 2 Type:", Square.getType());
console.log("Square Area:", square.getArea());
console.log("Total Shapes Created:", Shape.totalShapes);


// Exercise 3
interface Calculator {
  a: number;
  b: number;
  operate(operation: (x: number, y: number) => number): number;
}

class AdvancedCalculator implements Calculator {
  public a: number;
  public b: number;

  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
  }

  public operate(operation: (x: number, y: number) => number): number {
    return operation(this.a, this.b);
  }

  public add(): number {
    return this.operate((x, y) => x + y);
  }

  public subtract(): number {
    return this.operate((x, y) => x - y);
  }

  public multiply(): number {
    return this.operate((x, y) => x * y);
  }
}

const calc = new AdvancedCalculator(12, 4);
console.log("Add:", calc.add());
console.log("Subtract:", calc.subtract());
console.log("Multiply:", calc.multiply());


// Exercise 4
class Device {
  public readonly serialNumber: string;

  constructor(serialNumber: string) {
    this.serialNumber = serialNumber;
  }

  public getInfo(): string {
    return `Device SN: ${this.serialNumber}`;
  }
}

class Laptop extends Device {
  public model: string;
  public price: number;

  constructor(serialNumber: string, model: string, price: number) {
    super(serialNumber);
    this.model = model;
    this.price = price;
  }

  public override getInfo(): string {
    return `Laptop Model: ${this.model}, SN: ${this.serialNumber}, Price: $${this.price}`;
  }
}

const myLaptop = new Laptop("SN-98765", "MacBook Pro", 2000);
console.log(myLaptop.getInfo());

myLaptop.model = "MacBook Pro M3";
myLaptop.price = 2200;
console.log("Updated Info:", myLaptop.getInfo());


// Exercise 5
interface Product {
  readonly name: string;
  price: number;
  discount?: number;
}

interface Electronics extends Product {
  warrantyPeriod: number;
}

class Smartphone implements Electronics {
  public readonly name: string;
  public price: number;
  public warrantyPeriod: number;
  public discount?: number;

  constructor(name: string, price: number, warrantyPeriod: number, discount?: number) {
    this.name = name;
    this.price = price;
    this.warrantyPeriod = warrantyPeriod;
  }

  public getFinalPrice(): number {
    const discountAmount = this.discount ?? 0; 
    return this.price - (this.price * (discountAmount / 100));
  }
}

const phone = new Smartphone("iPhone 15", 1000, 24, 10);
console.log(`Product: ${phone.name}`);
console.log(`Original Price: $${phone.price}`);
console.log(`Discounted Price: $${phone.getFinalPrice()}`);
console.log(`Warranty: ${phone.warrantyPeriod} months`);