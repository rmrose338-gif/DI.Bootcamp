const API_URL = '/api/game';
let currentTurn = 'player1';

document.addEventListener('DOMContentLoaded', () => {
  fetchGameState();
  document.addEventListener('keydown', handleKeyPress);
});

async function fetchGameState() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    render(data);
  } catch (err) {
    console.error('Error connecting to backend server:', err);
  }
}

function render(state) {
  currentTurn = state.turn;
  const board = document.getElementById('grid-board');
  board.innerHTML = '';

  // Render 10x10 cells
  for (let r = 0; r < state.gridSize; r++) {
    for (let c = 0; c < state.gridSize; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      // 1. Render Obstacles
      if (state.obstacles.some(o => o.x === c && o.y === r)) {
        cell.classList.add('obstacle');
        cell.innerText = '🪨';
      }

      // 2. Render Player 1 Base
      if (state.bases.player1.x === c && state.bases.player1.y === r) {
        cell.classList.add('p1-base');
        cell.innerText = '🏰';
      }

      // 3. Render Player 2 Base
      if (state.bases.player2.x === c && state.bases.player2.y === r) {
        cell.classList.add('p2-base');
        cell.innerText = '🏰';
      }

      // 4. Render Player Units
      if (state.players.player1.x === c && state.players.player1.y === r) {
        cell.classList.add('player-1');
        cell.innerText = '🛡️';
      }
      if (state.players.player2.x === c && state.players.player2.y === r) {
        cell.classList.add('player-2');
        cell.innerText = '⚔️';
      }

      board.appendChild(cell);
    }
  }

  // Update UI Elements
  const turnDisplay = document.getElementById('turn-display');
  turnDisplay.innerText = state.turn.toUpperCase();
  turnDisplay.style.color = state.turn === 'player1' ? 'var(--p1-color)' : 'var(--p2-color)';

  // Update Base HP Bars
  const p1HpPercent = (state.bases.player1.hp / 3) * 100;
  const p2HpPercent = (state.bases.player2.hp / 3) * 100;
  document.getElementById('p1-hp-fill').style.width = `${Math.max(0, p1HpPercent)}%`;
  document.getElementById('p2-hp-fill').style.width = `${Math.max(0, p2HpPercent)}%`;

  // Update Log
  const logList = document.getElementById('log-list');
  logList.innerHTML = state.log.map(entry => `<li>${entry}</li>`).join('');

  // Declare Victory
  const banner = document.getElementById('winner-banner');
  if (state.winner) {
    banner.classList.remove('hidden');
    banner.innerText = `🎉 ${state.winner.toUpperCase()} IS VICTORIOUS!`;
  } else {
    banner.classList.add('hidden');
  }
}

async function makeMove(direction) {
  try {
    const res = await fetch(`${API_URL}/move`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player: currentTurn, direction })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error);
      return;
    }

    render(data);
  } catch (err) {
    console.error('Failed to issue move request:', err);
  }
}

async function resetGame() {
  try {
    const res = await fetch(`${API_URL}/reset`, { method: 'POST' });
    const data = await res.json();
    render(data.gameState);
  } catch (err) {
    console.error('Failed to reset game:', err);
  }
}

function handleKeyPress(e) {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault(); // Prevent page scrolling
  }
  
  switch (e.key) {
    case 'ArrowUp': makeMove('up'); break;
    case 'ArrowDown': makeMove('down'); break;
    case 'ArrowLeft': makeMove('left'); break;
    case 'ArrowRight': makeMove('right'); break;
  }
}