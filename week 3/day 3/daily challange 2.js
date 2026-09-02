// Get the input field from the HTML.
const input = document.getElementById('lettersOnly');

// Listen to the user's typing.
input.addEventListener('input', () => {
  // Keep only letters (A-Z or a-z).
  input.value = input.value.replace(/[^a-zA-Z]/g, '');
});
