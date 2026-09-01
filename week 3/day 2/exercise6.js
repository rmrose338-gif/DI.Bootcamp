// ===== Exercise 6: Change the navbar =====

// 2. Change the id attribute from navBar to socialNetworkNavigation
const navBar = document.getElementById("navBar");
navBar.setAttribute("id", "socialNetworkNavigation");

// 3. Add a new <li> with "Logout"
// 3.1 Create a new <li> tag
const newLi = document.createElement("li");

// 3.2 Create a new text node with "Logout"
const logoutText = document.createTextNode("Logout");

// 3.3 Append the text node to the new <li>
newLi.appendChild(logoutText);

// 3.4 Append the new <li> to the <ul>
const ul = navBar.querySelector("ul");
ul.appendChild(newLi);

// 4. Retrieve and display the first and last <li> elements
const firstLi = ul.firstElementChild;
const lastLi = ul.lastElementChild;

console.log("First link text:", firstLi.textContent);
console.log("Last link text:", lastLi.textContent);

console.log("Exercise 6 completed!");
