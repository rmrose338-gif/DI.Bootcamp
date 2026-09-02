// Exercise1: change the article content and style using DOM properties and events.
const article = document.querySelector('article');
const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');
const h3 = document.querySelector('h3');
const paragraphs = document.querySelectorAll('p');
const boldButton = document.getElementById('makeBoldBtn');

console.log(h1);

const lastParagraph = article.querySelectorAll('p')[paragraphs.length - 1];
lastParagraph.remove();

h2.addEventListener('click', () => {
  h2.style.backgroundColor = 'red';
});

h3.addEventListener('click', () => {
  h3.style.display = 'none';
});

boldButton.addEventListener('click', () => {
  paragraphs.forEach((p) => {
    p.style.fontWeight = 'bold';
  });
});

h1.addEventListener('mouseover', () => {
  const randomSize = Math.floor(Math.random() * 101);
  h1.style.fontSize = `${randomSize}px`;
});

const secondParagraph = paragraphs[1];
secondParagraph.addEventListener('mouseover', () => {
  secondParagraph.classList.add('fade-out');
});

secondParagraph.addEventListener('mouseleave', () => {
  secondParagraph.classList.remove('fade-out');
});


