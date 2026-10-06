const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  const { value } = req.body;
  console.log('Received from client:', value);
  res.json({
    message: `I received your POST request. This is what you sent me: ${value}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
