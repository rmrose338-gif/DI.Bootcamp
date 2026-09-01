// ===== Exercise 7: My Book List =====

// 2. Create an array called allBooks with 2 books
const allBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image: "https://covers.openlibrary.org/b/id/7725175-M.jpg",
    alreadyRead: true
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    image: "https://covers.openlibrary.org/b/id/8426092-M.jpg",
    alreadyRead: false
  }
];

// 4. Render each book inside the section
const listBooksSection = document.querySelector(".listBooks");

for (let book of allBooks) {
  // Create a div for the book
  const bookDiv = document.createElement("div");
  bookDiv.classList.add("book");

  // Create and add image
  const img = document.createElement("img");
  img.src = book.image;
  img.width = 100;
  img.alt = book.title;
  bookDiv.appendChild(img);

  // Create and add book details (title and author)
  const bookDetails = document.createElement("div");
  bookDetails.classList.add("book-details");
  bookDetails.textContent = `${book.title} written by ${book.author}`;

  // If the book is already read, set text color to red
  if (book.alreadyRead) {
    bookDetails.style.color = "red";
  }

  bookDiv.appendChild(bookDetails);

  // Append the book div to the section
  listBooksSection.appendChild(bookDiv);
}

console.log("Exercise 7 completed!");
