const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const pool = require('./config/db');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// // Add this test route to check database connection
// app.get('/test-db', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT NOW()');
//     res.json({ 
//       message: 'Database connected!',
//       time: result.rows[0].now 
//     });
//   } catch (err) {
//     console.error('Database Error:', err);
//     res.status(500).json({ 
//       error: err.message,
//       details: err
//     });
//   }
// });

// Routes
app.use('/api/products', productsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Accounting App API' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});