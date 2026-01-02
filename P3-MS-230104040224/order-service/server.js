require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5002;

let orders = [];

app.get('/orders', (req, res) => res.json(orders));

app.post('/orders', async (req, res) => {
  const newOrder = { id: orders.length + 1, ...req.body };
  orders.push(newOrder);
  
  // Kirim notifikasi ke Notification Service
  await axios.post(`${process.env.NOTIF_SERVICE}/notifications`, {
    message: `Pesanan baru dibuat: ${newOrder.id}`
  });

  res.status(201).json(newOrder);
});

app.listen(PORT, () => {
  console.log(`✅ Order Service running on http://localhost:${PORT}`);
});
