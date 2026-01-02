require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authMiddleware = require('./authMiddleware');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Data dummy
let data = [
  { id: 1, name: "Data Rahasia A" },
  { id: 2, name: "Data Rahasia B" }
];

// Endpoint untuk cek server
app.get('/', (req, res) => {
  res.send('Data Service OK');
});

// Endpoint terlindungi GET
app.get('/data', authMiddleware, (req, res) => {
  res.json({ user: req.user.username, data });
});

// Endpoint terlindungi POST
app.post('/data', authMiddleware, (req, res) => {
  const newData = { id: data.length + 1, ...req.body };
  data.push(newData);
  res.status(201).json(newData);
});

app.listen(PORT, () => {
  console.log(`✅ Data Service running at http://localhost:${PORT}`);
});
