const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET all products
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// CREATE a product
router.post('/', async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    
    // Validate input
    if (!name || !price || !quantity) {
      return res.status(400).json({ 
        error: "Name, price, and quantity are required" 
      });
    }

    const result = await pool.query(
      'INSERT INTO products (name, price, quantity) VALUES ($1, $2, $3) RETURNING *',
      [name, price, quantity]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    const result = await pool.query(
      'UPDATE products SET name = $1, price = $2, quantity = $3 WHERE id = $4 RETURNING *',
      [name, price, quantity, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;