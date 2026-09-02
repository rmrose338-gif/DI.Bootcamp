let allBoldItems;

function getBoldItems() {
  allBoldItems = document.querySelectorAll('strong');
}

function highlight() {
  getBoldItems();
  allBoldItems.forEach((item) => {
    item.style.color = 'blue';
  });
}

function returnItemsToDefault() {
  getBoldItems();
  allBoldItems.forEach((item) => {
    item.style.color = 'black';
  });
}

const sentence = document.getElementById('sentence');

sentence.addEventListener('mouseover', highlight);
sentence.addEventListener('mouseout', returnItemsToDefault);
