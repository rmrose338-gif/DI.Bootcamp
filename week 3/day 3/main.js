function calculateTip() {
  const billAmount = document.getElementById('billAmt').value;
  const serviceQuality = document.getElementById('serviceQual').value;
  let numberOfPeople = document.getElementById('numOfPeople').value;

  if (serviceQuality == 0 || billAmount === '') {
    alert('Please enter the bill amount and service quality');
    return;
  }

  if (numberOfPeople === '' || numberOfPeople < 1) {
    numberOfPeople = 1;
    document.getElementById('each').style.display = 'none';
  } else {
    document.getElementById('each').style.display = 'block';
  }

  const total = (billAmount * serviceQuality) / numberOfPeople;
  const roundedTotal = total.toFixed(2);

  document.getElementById('totalTip').style.display = 'block';
  document.getElementById('tip').textContent = roundedTotal;
}

document.getElementById('totalTip').style.display = 'none';
document.getElementById('calculate').onclick = calculateTip;
