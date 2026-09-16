// ==========================================
// Daily Challenge: Building a Library System
// ==========================================

export {}; // Prevents scope conflict errors in shared environments

// 1. Interface Book
interface Book {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre?: string; // Optional property
}

// 2. Class Library
class Library {
  // Marked as protected so derived classes (like DigitalLibrary) can access the list
  protected books: Book[] = [];

  public addBook(book: Book): void {
    this.books.push(book);
  }

  public getBookDetails(isbn: string): Book | string {
    const foundBook = this.books.find((book) => book.isbn === isbn);
    if (foundBook) {
      return foundBook;
    }
    return `Book with ISBN ${isbn} not found.`;
  }
}

// 3. Class DigitalLibrary
class DigitalLibrary extends Library {
  public readonly website: string;

  constructor(website: string) {
    super(); // Calls constructor of parent Library class
    this.website = website;
  }

  public listBooks(): string[] {
    return this.books.map((book) => book.title);
  }
}

// Execution and Test
const myDigitalLibrary = new DigitalLibrary("https://digital-library.example.com");

// Add Books
myDigitalLibrary.addBook({
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  isbn: "978-0743273565",
  publishedYear: 1925,
  genre: "Classic Fiction",
});

myDigitalLibrary.addBook({
  title: "1984",
  author: "George Orwell",
  isbn: "978-0451524935",
  publishedYear: 1949,
});

// Output Library Information
console.log("Library Website:", myDigitalLibrary.website);

console.log("\n--- All Book Titles ---");
console.log(myDigitalLibrary.listBooks());

console.log("\n--- Book Details (ISBN: 978-0743273565) ---");
console.log(myDigitalLibrary.getBookDetails("978-0743273565"));