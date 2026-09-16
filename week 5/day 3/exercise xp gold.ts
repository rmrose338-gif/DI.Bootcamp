
// Exercise 1: Class Inheritance with Protected Access Modifiers

class Employee {
  protected name: string;
  protected salary: number;

  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  public getDetails(): string {
    return `Name: ${this.name}, Salary: $${this.salary}`;
  }
}

class Manager extends Employee {
  public department: string;

  constructor(name: string, salary: number, department: string) {
    super(name, salary);
    this.department = department;
  }

  public override getDetails(): string {
    return `Name: ${this.name}, Salary: $${this.salary}, Department: ${this.department}`;
  }
}

const manager = new Manager("Alice", 85000, "Engineering");
console.log(manager.getDetails());



// Exercise 2: Using Readonly with Access Modifiers

class Car {
  public readonly make: string;
  private readonly model: string;
  public year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  public getCarDetails(): string {
    return `${this.year} ${this.make} ${this.model}`;
  }
}

const myCar = new Car("Toyota", "Corolla", 2022);
console.log(myCar.getCarDetails());

// Attempting modifications (commented out because they trigger TypeScript compilation errors):
// myCar.make = "Honda";  // Error: Cannot assign to 'make' because it is a read-only property.
// myCar.model = "Civic"; // Error: Property 'model' is private and cannot be modified or accessed outside class.


// Exercise 3: Static Properties and Methods in Classes

class MathUtils {
  public static PI: number = 3.14159;

  public static circumference(radius: number): number {
    return 2 * MathUtils.PI * radius;
  }
}

console.log("Circumference:", MathUtils.circumference(5));



// Exercise 4: Interface with Function Types

interface Operation {
  (a: number, b: number): number;
}

const addition: Operation = (a, b) => a + b;
const multiplication: Operation = (a, b) => a * b;

console.log("Addition:", addition(10, 5));
console.log("Multiplication:", multiplication(10, 5));


// Exercise 5: Extending Interfaces with Optional and Readonly Properties


interface Shape {
  color: string;
  getArea(): number;
}

interface Rectangle extends Shape {
  readonly width: number;
  readonly height: number;
  getPerimeter(): number;
}

class RectangleShape implements Rectangle {
  public color: string;
  public readonly width: number;
  public readonly height: number;

  constructor(color: string, width: number, height: number) {
    this.color = color;
    this.width = width;
    this.height = height;
  }

  public getArea(): number {
    return this.width * this.height;
  }

  public getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const myRect = new RectangleShape("Blue", 10, 5);
console.log(`Area (${myRect.color}):`, myRect.getArea());
console.log(`Perimeter (${myRect.color}):`, myRect.getPerimeter());