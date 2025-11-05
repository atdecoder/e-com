require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const cookieParser = require('cookie-parser');

const db = require('./src/db');
const router = require('./src/routes/routes');

const app = express();
const allowedOrigins = [
    "http://localhost:3000",
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// db.init();

app.use('/api/v1', router);

// GET /products
// supports ?limit= &page= &category= &search=
app.get('/products', (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit || '10'), 100);
    const page = Math.max(parseInt(req.query.page || '1'), 1);
    const offset = (page - 1) * limit;
    const category = req.query.category;
    const search = req.query.search;
    const products = db.getAll({ limit, offset, category, search });
    res.json({ success: true, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST /products
app.post('/products', (req, res) => {
  try {
    const { name, price, category, in_stock } = req.body;
    if (!name || price == null) return res.status(400).json({ success: false, error: 'name and price required' });
    const id = uuidv4();
    db.createProduct({ id, name, price: parseFloat(price), category: category || null, in_stock: in_stock ? 1 : 0 });
    res.status(201).json({ success: true, data: { id, name, price, category, in_stock } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
