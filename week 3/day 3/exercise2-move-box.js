// Get the moving box and its container.
const box = document.getElementById('animate');
const container = document.getElementById('container');
const moveBtn = document.getElementById('moveBtn');

let position = 0;
let intervalId;

// Move the box to the right by 1px every millisecond.
function myMove() {
  clearInterval(intervalId);

  intervalId = setInterval(() => {
    // Stop when the box reaches the right edge of the container.
    if (position >= container.clientWidth - box.clientWidth) {
      clearInterval(intervalId);
      return;
    }

    position += 1;
    box.style.left = position + 'px';
  }, 1);
}

moveBtn.addEventListener('click', myMove);
