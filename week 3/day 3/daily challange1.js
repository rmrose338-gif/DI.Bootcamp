// Get the form and the place where the story will be shown.
const form = document.getElementById('libform');
const story = document.getElementById('story');
const shuffleButton = document.getElementById('shuffle-button');

// Store the latest valid values entered by the user.
let currentValues = null;

// List of different story templates. We pick one at random.
const storyTemplates = [
  'Once upon a time, a very {adjective} {noun} met {person} and decided to {verb} all the way to {place}.',
  'In the middle of {place}, {person} found a {adjective} {noun} and started to {verb} with great excitement.',
  'When the {noun} became {adjective}, {person} knew it was time to {verb} and escape to {place}.',
  'At {place}, {person} saw a {adjective} {noun} and shouted, "I am going to {verb}!"'
];

// Read and validate all input values.
function getWords() {
  const noun = document.getElementById('noun').value.trim();
  const adjective = document.getElementById('adjective').value.trim();
  const person = document.getElementById('person').value.trim();
  const verb = document.getElementById('verb').value.trim();
  const place = document.getElementById('place').value.trim();

  if (!noun || !adjective || !person || !verb || !place) {
    alert('Please fill in all the inputs before generating the story.');
    return null;
  }

  return { noun, adjective, person, verb, place };
}

// Replace the placeholders in a story template with the user inputs.
function generateStory(values) {
  const randomStory = storyTemplates[Math.floor(Math.random() * storyTemplates.length)];

  return randomStory
    .replace('{noun}', values.noun)
    .replace('{adjective}', values.adjective)
    .replace('{person}', values.person)
    .replace('{verb}', values.verb)
    .replace('{place}', values.place);
}

// When the form is submitted, build the story.
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const values = getWords();
  if (!values) return;

  currentValues = values;
  story.textContent = generateStory(values);
});

// Bonus: shuffle the story while keeping the same words.
if (shuffleButton) {
  shuffleButton.addEventListener('click', () => {
    if (!currentValues) {
      const values = getWords();
      if (!values) return;
      currentValues = values;
    }

    story.textContent = generateStory(currentValues);
  });
}
