require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware verifikasi token
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

app.get('/', (req, res) => res.send('API Gateway OK'));

// Proxy routes
app.use('/api/products', verifyToken, async (req, res) => {
  const result = await axios.get(`${process.env.PRODUCT_SERVICE}/products`);
  res.json(result.data);
});

app.use('/api/orders', verifyToken, async (req, res) => {
  const result = await axios.get(`${process.env.ORDER_SERVICE}/orders`);
  res.json(result.data);
});

app.use('/api/notifications/my', verifyToken, async (req, res) => {
  const result = await axios.get(`${process.env.NOTIF_SERVICE}/notifications/my`);
  res.json(result.data);
});

app.listen(PORT, () => {
  console.log(`✅ API Gateway running on http://localhost:${PORT}`);
});
