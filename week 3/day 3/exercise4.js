// Get the form and the input fields.
const form = document.getElementById('MyForm');
const radiusInput = document.getElementById('radius');
const volumeInput = document.getElementById('volume');

// When the form is submitted, calculate the sphere volume.
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the page from refreshing.

  const radius = Number(radiusInput.value);

  // Validate the input before calculating.
  if (Number.isNaN(radius) || radius <= 0) {
    volumeInput.value = 'Please enter a valid radius';
    return;
  }

  // Volume formula: V = 4/3 * π * r^3
  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
  volumeInput.value = volume.toFixed(2);
});
