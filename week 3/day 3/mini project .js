// Get the main container and the two toggle buttons.
const container = document.getElementById('container');
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');

// When Sign Up is clicked, add the class that triggers the slider animation.
signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});

// When Sign In is clicked, remove the class to return to the default form.
signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});
