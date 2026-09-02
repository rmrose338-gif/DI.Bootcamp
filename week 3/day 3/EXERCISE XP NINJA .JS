// Calculate the tip for each person based on bill, service quality, and number of people.
function calculateTip() {
  // Get values from the inputs in the HTML form.
  const billAmount = document.getElementById('billAmt').value;
  const serviceQuality = document.getElementById('serviceQual').value;
  let numberOfPeople = document.getElementById('numOfPeople').value;

  // If the bill is empty or service quality is 0, ask the user to enter valid values.
  if (serviceQuality == 0 || billAmount === '') {
    alert('Please enter the bill amount and service quality.');
    return;
  }

  // If number of people is empty or less than 1, use 1 by default and hide the 'each' message.
  if (numberOfPeople === '' || numberOfPeople < 1) {
    numberOfPeople = 1;
    document.getElementById('each').style.display = 'none';
  } else {
    document.getElementById('each').style.display = 'block';
  }

  // Calculate the average tip per person.
  const total = (billAmount * serviceQuality) / numberOfPeople;
  const roundedTotal = total.toFixed(2);

  // Show the total tip section and display the calculated value.
  document.getElementById('totalTip').style.display = 'block';
  document.getElementById('tip').textContent = roundedTotal;
}

// Hide the total section before the function is called.
document.getElementById('totalTip').style.display = 'none';

// Run calculateTip when the calculate button is clicked.
document.getElementById('calculate').onclick = calculateTip;

// Exercise 3: Get the user's geolocation coordinates.
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

