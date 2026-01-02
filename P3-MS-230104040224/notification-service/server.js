require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5003;

let notifications = [];

app.post('/notifications', (req, res) => {
  notifications.push(req.body);
  res.status(201).json(req.body);
});

app.get('/notifications/my', (req, res) => {
  res.json(notifications);
});

app.listen(PORT, () => {
  console.log(`✅ Notification Service running on http://localhost:${PORT}`);
});
