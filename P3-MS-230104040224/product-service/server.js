require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

let products = [
  { id: 1, name: "Laptop", price: 10000000 },
  { id: 2, name: "Mouse", price: 100000 }
];

app.get('/products', (req, res) => res.json(products));

app.listen(PORT, () => {
  console.log(`✅ Product Service running on http://localhost:${PORT}`);
});
