const button = document.getElementById('getLocationBtn');
const output = document.getElementById('locationOutput');

button.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      output.textContent = `Latitude: ${latitude}\nLongitude: ${longitude}`;
    }, () => {
      output.textContent = 'Geolocation failed or was denied by the user.';
    });
  } else {
    output.textContent = 'Geolocation is not supported by this browser.';
  }
});
