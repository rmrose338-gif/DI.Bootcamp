const form = document.getElementById('emailForm');
const emailInput = document.getElementById('email');

function validateEmailWithoutRegex(email) {
  const atIndex = email.indexOf('@');
  const dotIndex = email.lastIndexOf('.');

  if (
    atIndex > 0 &&
    dotIndex > atIndex + 1 &&
    dotIndex < email.length - 1 &&
    email.includes('@')
  ) {
    return true;
  }

  return false;
}

function validateEmailWithRegex(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const emailValue = emailInput.value.trim();

  const isValidWithoutRegex = validateEmailWithoutRegex(emailValue);
  const isValidWithRegex = validateEmailWithRegex(emailValue);

  if (isValidWithoutRegex && isValidWithRegex) {
    alert('Valid email address!');
  } else {
    alert('Invalid email address. Please try again.');
  }
});
