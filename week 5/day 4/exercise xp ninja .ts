
// Exercise 1

type Identifiable = { id: string };
type Timestamped = { createdAt: Date };

// Combine two types using an intersection type
type Entity = Identifiable & Timestamped;

// Generic Class storing items constrained to the Intersection Type
class Container<T extends Entity> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  remove(id: string): T | undefined {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      return this.items.splice(index, 1)[0];
    }
    return undefined;
  }

  list(): T[] {
    return [...this.items];
  }
}

// Testing Exercise 1
type UserEntity = Entity & { name: string };

const userContainer = new Container<UserEntity>();
userContainer.add({ id: "u1", createdAt: new Date(), name: "Alice" });
userContainer.add({ id: "u2", createdAt: new Date(), name: "Bob" });

console.log("Exercise 1 (List All):", userContainer.list());
console.log("Exercise 1 (Remove u1):", userContainer.remove("u1"));


//  Exercise 2
interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

function parseResponse<T>(rawJsonResponse: string): ApiResponse<T> {
  // Parse raw JSON input
  const parsed = JSON.parse(rawJsonResponse);

  // Cast the parsed object to the expected generic ApiResponse structure
  const response = parsed as ApiResponse<T>;

  // Cast data explicitly to type T
  response.data = response.data as T;

  return response;
}

// Testing Exercise 2
interface UserProfile {
  username: string;
  role: string;
}

const mockJsonResponse = '{"status": 200, "message": "Success", "data": {"username": "johndoe", "role": "admin"}}';
const parsedResult = parseResponse<UserProfile>(mockJsonResponse);

console.log("Exercise 2 (Parsed Response):", parsedResult.data.username);



//  Exercise 3
class Repository<T> {
  private storage: Map<string, unknown> = new Map();

  add(key: string, item: T): void {
    this.storage.set(key, item);
  }

  retrieve(key: string): T {
    const item = this.storage.get(key);
    if (item === undefined) {
      throw new Error(`Item with key '${key}' not found in repository.`);
    }
    // Type assertion ensuring the unknown value is treated as type T upon retrieval
    return item as T;
  }

  list(): T[] {
    // Type assertion mapping raw map values back to array of T
    return Array.from(this.storage.values()) as T[];
  }
}

// Testing Exercise 3
interface Product {
  sku: string;
  price: number;
}

const productRepo = new Repository<Product>();
productRepo.add("p100", { sku: "LAPTOP-01", price: 1200 });
productRepo.add("p200", { sku: "PHONE-02", price: 800 });

console.log("Exercise 3 (Retrieve p100):", productRepo.retrieve("p100"));
console.log("Exercise 3 (List Products):", productRepo.list());