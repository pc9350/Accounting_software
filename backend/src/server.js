const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const pool = require('./config/db');

const app = express();
const port = process.env.PORT || 3001;


// Configure CORS for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'your_frontend_url'  // Replace with your Vercel frontend URL
    : 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
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

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    environment: process.env.NODE_ENV,
    timestamp: new Date()
  });
});

// Routes
app.use('/api/products', productsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Accounting App API' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Environment:', process.env.NODE_ENV || 'development');
});