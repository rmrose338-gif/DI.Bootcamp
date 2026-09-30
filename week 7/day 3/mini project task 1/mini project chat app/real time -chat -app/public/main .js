const socket = io();

const joinContainer = document.getElementById('join-container');
const chatContainer = document.getElementById('chat-container');
const joinForm = document.getElementById('join-form');
const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');
const roomName = document.getElementById('room-name');
const usersList = document.getElementById('users-list');
const leaveBtn = document.getElementById('leave-btn');

let currentUsername = '';

// Request browser notification permissions on load
if ('Notification' in window && Notification.permission !== 'granted') {
  Notification.requestPermission();
}

// Join Room Handler
joinForm.addEventListener('submit', (e) => {
  e.preventDefault();

  currentUsername = document.getElementById('username').value.trim();
  const room = document.getElementById('room').value;

  if (!currentUsername) return;

  // Emit join event
  socket.emit('joinRoom', { username: currentUsername, room });

  // Update UI state
  roomName.innerText = `Room: ${room}`;
  joinContainer.classList.add('hidden');
  chatContainer.classList.remove('hidden');
});

// Receive Message Handler
socket.on('message', (data) => {
  renderMessage(data);

  // Browser Notification if app is in background
  if (document.hidden && Notification.permission === 'granted' && data.user !== 'System') {
    new Notification(`New message from ${data.user}`, {
      body: data.text
    });
  }

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Update Room Active Users
socket.on('roomUsers', (users) => {
  usersList.innerHTML = users.map(user => `<li>🟢 ${user}</li>`).join('');
});

// Send Chat Message
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msgInput = document.getElementById('msg');
  const msgText = msgInput.value.trim();

  if (!msgText) return;

  socket.emit('chatMessage', msgText);
  msgInput.value = '';
  msgInput.focus();
});

// Render incoming messages to the screen
function renderMessage({ user, text, time }) {
  const div = document.createElement('div');
  div.classList.add('message');

  if (user === 'System') {
    div.classList.add('system-message');
    div.innerHTML = `<p>${text}</p>`;
  } else {
    if (user === currentUsername) {
      div.classList.add('my-message');
    }
    div.innerHTML = `
      <div class="meta"><strong>${user}</strong> <span>${time}</span></div>
      <p class="text">${escapeHTML(text)}</p>
    `;
  }

  chatMessages.appendChild(div);
}

// Utility to prevent XSS
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// Leave Room Handler
leaveBtn.addEventListener('click', () => {
  window.location.reload();
});