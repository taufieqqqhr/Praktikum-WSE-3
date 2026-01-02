require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;

// Data user login
const users = [
  { username: "mhs1", password: "123456" },
  { username: "admin", password: "admin123" }
];

// Endpoint cek server
app.get('/', (req, res) => {
  res.send('Auth Service OK');
});

// Endpoint login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`✅ Auth Service running at http://localhost:${PORT}`);
});
