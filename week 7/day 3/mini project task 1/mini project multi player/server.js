const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static frontend files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

let gameState = null;

function initializeGame() {
  const GRID_SIZE = 10;
  
  // Safe starting zones to ensure players/bases aren't blocked immediately
  const reserved = new Set(['0,0', '0,1', '1,0', '1,1', '9,9', '9,8', '8,9', '8,8']);
  const obstacles = [];

  while (obstacles.length < 14) {
    const r = Math.floor(Math.random() * GRID_SIZE);
    const c = Math.floor(Math.random() * GRID_SIZE);
    const key = `${r},${c}`;
    if (!reserved.has(key) && !obstacles.some(o => o.x === c && o.y === r)) {
      obstacles.push({ x: c, y: r });
    }
  }

  gameState = {
    gridSize: GRID_SIZE,
    turn: 'player1',
    winner: null,
    bases: {
      player1: { x: 0, y: 0, hp: 3 },
      player2: { x: 9, y: 9, hp: 3 }
    },
    players: {
      player1: { x: 0, y: 0 },
      player2: { x: 9, y: 9 }
    },
    obstacles,
    log: ['⚔️ Game initialized! Player 1 starts.']
  };
}

// REST Endpoints
app.get('/api/game', (req, res) => {
  if (!gameState) initializeGame();
  res.json(gameState);
});

app.post('/api/game/reset', (req, res) => {
  initializeGame();
  res.json({ message: 'Game restarted', gameState });
});

app.post('/api/game/move', (req, res) => {
  const { player, direction } = req.body;

  if (!gameState) initializeGame();

  if (gameState.winner) {
    return res.status(400).json({ error: 'The game has ended! Click Restart to play again.' });
  }

  if (gameState.turn !== player) {
    return res.status(400).json({ error: `It is currently ${gameState.turn.toUpperCase()}'s turn!` });
  }

  const current = gameState.players[player];
  let target = { ...current };

  switch (direction) {
    case 'up': target.y -= 1; break;
    case 'down': target.y += 1; break;
    case 'left': target.x -= 1; break;
    case 'right': target.x += 1; break;
    default:
      return res.status(400).json({ error: 'Invalid move direction.' });
  }

  // 1. Grid Boundary Validation
  if (target.x < 0 || target.x >= gameState.gridSize || target.y < 0 || target.y >= gameState.gridSize) {
    return res.status(400).json({ error: 'Out of bounds! Move within the 10x10 grid.' });
  }

  // 2. Obstacle Collision Validation
  if (gameState.obstacles.some(o => o.x === target.x && o.y === target.y)) {
    return res.status(400).json({ error: 'Blocked! You cannot move through obstacles.' });
  }

  // Execute Position Update
  gameState.players[player] = target;
  const opponent = player === 'player1' ? 'player2' : 'player1';
  const enemyBase = gameState.bases[opponent];

  // Game Victory Condition 1: Direct Tile Capture
  if (target.x === enemyBase.x && target.y === enemyBase.y) {
    gameState.winner = player;
    gameState.log.unshift(`🏆 ${player.toUpperCase()} reached ${opponent}'s base and captured it!`);
    return res.json(gameState);
  }

  // Game Victory Condition 2: Adjacent Base Attack Mechanics
  const isAdjacentX = Math.abs(target.x - enemyBase.x) <= 1;
  const isAdjacentY = Math.abs(target.y - enemyBase.y) <= 1;
  let attackStatus = '';

  if (isAdjacentX && isAdjacentY) {
    enemyBase.hp -= 1;
    attackStatus = ` 💥 Attacked ${opponent}'s base! (Base HP: ${enemyBase.hp}/3)`;
    if (enemyBase.hp <= 0) {
      gameState.winner = player;
      gameState.log.unshift(`🏆 ${player.toUpperCase()} destroyed ${opponent}'s base and WINS!`);
      return res.json(gameState);
    }
  }

  // Switch Turn
  gameState.turn = opponent;
  gameState.log.unshift(`➡️ ${player.toUpperCase()} moved ${direction}.${attackStatus}`);

  res.json(gameState);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎮 Game Server active at: http://localhost:${PORT}`);
});