const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, username: 'somebody' },
  { id: 2, username: 'somebody_else' },
];

const customers = [
  { id: 1, firstName: 'John', lastName: 'Doe' },
  { id: 2, firstName: 'Jane', lastName: 'Doe' },
  { id: 3, firstName: 'Ziv', lastName: 'Chen' },
  { id: 4, firstName: 'Isaac', lastName: 'Groisman' },
  { id: 5, firstName: 'Avner', lastName: 'Maman' },
  { id: 6, firstName: 'Megan', lastName: 'Dreyfuss' },
];

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/api/customers', (req, res) => {
  res.json(customers);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
