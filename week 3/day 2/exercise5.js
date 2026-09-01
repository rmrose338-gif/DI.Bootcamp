// ===== Exercise 5: Users =====

// 1. Retrieve the div and console.log it
const container = document.getElementById("container");
console.log("Container div:", container);

// 2. Change the name "Pete" to "Richard"
const allLis = document.querySelectorAll("li");
for (let li of allLis) {
  if (li.textContent === "Pete") {
    li.textContent = "Richard";
  }
}

// 3. Delete the second <li> of the second <ul>
const allUls = document.querySelectorAll("ul");
const secondUl = allUls[1];
const secondLiOfSecondUl = secondUl.querySelectorAll("li")[1];
secondLiOfSecondUl.remove();

// 4. Change the name of the first <li> of each <ul> to your name
for (let ul of allUls) {
  const firstLi = ul.querySelector("li");
  firstLi.textContent = "Yourname";
}

// 3. Using Javascript - Add classes
// 1. Add class "student_list" to both ul's
for (let ul of allUls) {
  ul.classList.add("student_list");
}

// 2. Add classes "university" and "attendance" to the first <ul>
const firstUl = allUls[0];
firstUl.classList.add("university", "attendance");

console.log("Classes added to ul elements");

// 4. Using Javascript - Styling
// 1. Add light blue background and padding to the div
container.style.backgroundColor = "lightblue";
container.style.padding = "20px";

// 2. Hide the <li> that contains "Dan"
for (let li of allLis) {
  if (li.textContent === "Dan") {
    li.style.display = "none";
  }
}

// 3. Add border to the <li> that contains "Richard"
for (let li of allLis) {
  if (li.textContent === "Richard") {
    li.style.border = "2px solid black";
  }
}

// 4. Change the font size of the whole body
document.body.style.fontSize = "18px";

// 5. Bonus: If background color of div is light blue, alert with users in div
if (window.getComputedStyle(container).backgroundColor === "rgb(173, 216, 230)") {
  // Get the users from the ul's under the container
  const lists = container.parentElement.querySelectorAll(".list");
  let users = [];
  
  for (let list of lists) {
    const items = list.querySelectorAll("li");
    for (let item of items) {
      if (item.style.display !== "none") {
        users.push(item.textContent);
      }
    }
  }
  
  if (users.length > 0) {
    alert(`Hello ${users.join(" and ")}`);
  }
}

console.log("Exercise 5 completed!");
