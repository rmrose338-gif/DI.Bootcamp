// Exercise 1: Select a kind of Music
const genres = document.getElementById("genres");

// 1. Display the value of the selected option
console.log(genres.value);

// 2. Add a new option to the select tag
const classicOption = document.createElement("option");
classicOption.value = "classic";
classicOption.textContent = "Classic";
genres.appendChild(classicOption);

// 3. The newly added option should be selected by default
genres.value = "classic";

console.log(genres.value);

// Exercise 2: Delete colors
const colorSelect = document.getElementById("colorSelect");
const removeButton = document.querySelector('input[type="button"]');

function removecolor() {
  const selectedIndex = colorSelect.selectedIndex;

  if (selectedIndex >= 0) {
    colorSelect.remove(selectedIndex);
  }
}
removeButton.addEventListener("click", removecolor);



// Exercise 3: Create a shopping list
let shoppingList = [];
const root = document.getElementById("root");

function addItem() {
  const input = document.getElementById("itemInput");
  const item = input.value.trim();

  if (item !== "") {
    shoppingList.push(item);
    renderList();
    input.value = "";
  }
}

function clearAll() {
  shoppingList = [];
  renderList();
}

function renderList() {
  let list = document.getElementById("shoppingList");

  if (!list) {
    list = document.createElement("ul");
    list.id = "shoppingList";
    root.appendChild(list);
  }

  list.innerHTML = "";

  shoppingList.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

const form = document.createElement("form");
const input = document.createElement("input");
input.type = "text";
input.id = "itemInput";
input.placeholder = "Type an item";

const addButton = document.createElement("button");
addButton.type = "button";
addButton.textContent = "AddItem";
addButton.addEventListener("click", addItem);

const clearButton = document.createElement("button");
clearButton.type = "button";
clearButton.textContent = "ClearAll";
clearButton.addEventListener("click", clearAll);

form.appendChild(input);
form.appendChild(addButton);
form.appendChild(clearButton);
root.appendChild(form);

