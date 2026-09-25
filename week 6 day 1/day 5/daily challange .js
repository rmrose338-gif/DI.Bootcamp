const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// ============================================================================
// DATA STRUCTURES & STORES
// ============================================================================
const emojis = [
  { emoji: '😀', name: 'Smile' },
  { emoji: '🐶', name: 'Dog' },
  { emoji: '🌮', name: 'Taco' },
  { emoji: '🚀', name: 'Rocket' },
  { emoji: '🍕', name: 'Pizza' },
  { emoji: '🔥', name: 'Fire' },
  { emoji: '🎉', name: 'Party' },
  { emoji: '🎸', name: 'Guitar' },
  { emoji: '🥑', name: 'Avocado' },
  { emoji: '🐱', name: 'Cat' },
  { emoji: '🍦', name: 'Ice Cream' },
  { emoji: '⚽', name: 'Soccer Ball' }
];

// In-memory leaderboard
let leaderboard = [
  { name: 'Alex', score: 8 },
  { name: 'Sam', score: 5 },
  { name: 'Jordan', score: 3 }
];

// Helper: Get random integers
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// ============================================================================
// API ENDPOINTS
// ============================================================================

// GET /api/next-question - Returns a random emoji and 4 multiple-choice options
app.get('/api/next-question', (req, res) => {
  const targetIndex = getRandomInt(emojis.length);
  const targetEmoji = emojis[targetIndex];

  // Distractor options selection
  const optionsSet = new Set([targetEmoji.name]);
  while (optionsSet.size < 4 && optionsSet.size < emojis.length) {
    const randomOption = emojis[getRandomInt(emojis.length)].name;
    optionsSet.add(randomOption);
  }

  // Shuffle options
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  res.json({
    emoji: targetEmoji.emoji,
    options
  });
});

// POST /api/guess - Checks if guess is correct
app.post('/api/guess', (req, res) => {
  const { emoji, guess } = req.body;

  if (!emoji || !guess) {
    return res.status(400).json({ error: 'Emoji character and guess are required' });
  }

  const found = emojis.find((e) => e.emoji === emoji);

  if (!found) {
    return res.status(404).json({ error: 'Emoji not found in database' });
  }

  const isCorrect = found.name.toLowerCase() === guess.trim().toLowerCase();

  res.json({
    isCorrect,
    correctAnswer: found.name
  });
});

// GET /api/leaderboard - Returns sorted top scores
app.get('/api/leaderboard', (req, res) => {
  const sorted = [...leaderboard].sort((a, b) => b.score - a.score).slice(0, 5);
  res.json(sorted);
});

// POST /api/leaderboard - Adds player score to leaderboard
app.post('/api/leaderboard', (req, res) => {
  const { name, score } = req.body;

  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'Player name and score are required' });
  }

  leaderboard.push({ name: name.trim(), score });
  leaderboard.sort((a, b) => b.score - a.score);

  res.json({ message: 'Score saved successfully!', leaderboard: leaderboard.slice(0, 5) });
});

// ============================================================================
// FRONTEND UI (Single Page Application)
// ============================================================================
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Emoji Guessing Game</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
        .game-card { background: #ffffff; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); text-align: center; max-width: 450px; width: 100%; }
        .emoji-display { font-size: 5rem; margin: 1rem 0; min-height: 100px; }
        .options-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 1rem; }
        button.option-btn { background: #4a90e2; color: #fff; border: none; padding: 12px; border-radius: 6px; font-size: 1rem; cursor: pointer; transition: background 0.2s; }
        button.option-btn:hover { background: #357abd; }
        .score-board { font-size: 1.2rem; font-weight: bold; margin-bottom: 1rem; color: #333; }
        .feedback { min-height: 30px; font-weight: bold; margin-bottom: 1rem; }
        .feedback.correct { color: #2ecc71; }
        .feedback.incorrect { color: #e74c3c; }
        .leaderboard-section { margin-top: 2rem; border-top: 1px solid #eee; padding-top: 1rem; }
        .leaderboard-list { list-style: none; padding: 0; text-align: left; }
        .leaderboard-list li { display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px dashed #ddd; }
        .save-score-form { display: flex; gap: 8px; margin-top: 1rem; }
        .save-score-form input { flex: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; }
        .save-score-form button { background: #2ecc71; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; }
      </style>
    </head>
    <body>

      <div class="game-card">
        <h2>🎯 Emoji Guessing Game</h2>
        <div class="score-board">Current Score: <span id="score">0</span></div>

        <div id="emojiDisplay" class="emoji-display">❓</div>
        <div id="feedback" class="feedback"></div>

        <form id="guessForm">
          <div id="optionsContainer" class="options-grid"></div>
        </form>

        <div class="save-score-form">
          <input type="text" id="playerName" placeholder="Enter name for leaderboard">
          <button type="button" onclick="saveScore()">Save Score</button>
        </div>

        <div class="leaderboard-section">
          <h3>🏆 Top Scores</h3>
          <ul id="leaderboardList" class="leaderboard-list"></ul>
        </div>
      </div>

      <script>
        let currentScore = 0;
        let currentEmoji = '';

        async function fetchQuestion() {
          const feedback = document.getElementById('feedback');
          feedback.textContent = '';
          feedback.className = 'feedback';

          const res = await fetch('/api/next-question');
          const data = await res.json();

          currentEmoji = data.emoji;
          document.getElementById('emojiDisplay').textContent = currentEmoji;

          const optionsContainer = document.getElementById('optionsContainer');
          optionsContainer.innerHTML = '';

          data.options.forEach(option => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'option-btn';
            btn.textContent = option;
            btn.onclick = () => submitGuess(option);
            optionsContainer.appendChild(btn);
          });
        }

        async function submitGuess(selectedOption) {
          const res = await fetch('/api/guess', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emoji: currentEmoji, guess: selectedOption })
          });

          const result = await res.json();
          const feedback = document.getElementById('feedback');

          if (result.isCorrect) {
            currentScore += 1;
            document.getElementById('score').textContent = currentScore;
            feedback.textContent = '✅ Correct! Great job!';
            feedback.className = 'feedback correct';
          } else {
            feedback.textContent = \`❌ Wrong! Correct answer was: \${result.correctAnswer}\`;
            feedback.className = 'feedback incorrect';
          }

          setTimeout(fetchQuestion, 1500);
        }

        async function loadLeaderboard() {
          const res = await fetch('/api/leaderboard');
          const data = await res.json();
          const list = document.getElementById('leaderboardList');
          list.innerHTML = '';

          data.forEach(entry => {
            const li = document.createElement('li');
            li.innerHTML = \`<span>\${entry.name}</span> <strong>\${entry.score} pts</strong>\`;
            list.appendChild(li);
          });
        }

        async function saveScore() {
          const nameInput = document.getElementById('playerName');
          const name = nameInput.value.trim();

          if (!name) {
            alert('Please enter a name first!');
            return;
          }

          await fetch('/api/leaderboard', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, score: currentScore })
          });

          nameInput.value = '';
          loadLeaderboard();
          alert('Score saved to leaderboard!');
        }

        // Initialize game on load
        fetchQuestion();
        loadLeaderboard();
      </script>
    </body>
    </html>
  `);
});

// ============================================================================
// START SERVER
// ============================================================================
app.listen(PORT, () => {
  console.log(`🎮 Emoji Game running at http://localhost:${PORT}`);
});