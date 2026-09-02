// Part I: setTimeout alerts after 2 seconds
setTimeout(() => {
  alert('Hello World');
}, 2000);

// Part II: setTimeout adds a paragraph after 2 seconds
setTimeout(() => {
  const container = document.getElementById('container');
  const paragraph = document.createElement('p');
  paragraph.textContent = 'Hello World';
  container.appendChild(paragraph);
}, 2000);

// Part III: setInterval adds a paragraph every 2 seconds,
// and stops when there are 5 paragraphs or the user clicks the button.
const container = document.getElementById('container');
const clearButton = document.getElementById('clear');

let intervalId = setInterval(() => {
  const paragraph = document.createElement('p');
  paragraph.textContent = 'Hello World';
  container.appendChild(paragraph);

  if (container.getElementsByTagName('p').length >= 5) {
    clearInterval(intervalId);
  }
}, 2000);

clearButton.addEventListener('click', () => {
  clearInterval(intervalId);
});
