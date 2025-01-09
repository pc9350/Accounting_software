# Accounting & Inventory Management System

A modern web application for managing product inventory and tracking financial data. Built with React, Node.js, Express, and PostgreSQL.

## Features

### Product Management
- ✨ Add, edit, and delete products
- 🔄 Real-time quantity adjustments
- ✏️ Inline editing for quick updates
- 📊 Stock status tracking
- 💰 Total price calculations

### User Interface
- 🎨 Clean, modern design
- 📱 Responsive layout
- 🎯 Intuitive navigation
- ⚡ Real-time feedback
- 🎭 Material-UI components

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI)
- Axios
- React Router

### Backend
- Node.js
- Express.js
- PostgreSQL
- RESTful API

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pc9350/Accounting_software.git
   cd accounting-app
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install

   # Create .env file with your database credentials
   cp .env.example .env
   ```

   Update `.env` with your PostgreSQL credentials:
   ```env
   PORT=3001
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=accounting_db
   DB_PASSWORD=your_password
   DB_PORT=5432
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the development servers**

   Backend:
   ```bash
   cd backend
   npm run dev
   ```

   Frontend:
   ```bash
   cd frontend
   npm start
   ```

   The application will be available at `http://localhost:3000`

## API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/products` | Get all products |
| POST   | `/api/products` | Create a new product |
| PUT    | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

## Database Schema

### Products Table

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Table Columns

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key, auto-incrementing |
| name | VARCHAR(255) | Product name, cannot be null |
| price | DECIMAL(10,2) | Product price with 2 decimal places |
| quantity | INTEGER | Current stock quantity |
| created_at | TIMESTAMP | Record creation time, defaults to current time |


### Backend
- Deploy to Render or Heroku
- Set up environment variables
- Configure PostgreSQL database

### Frontend
- Deploy to Vercel or Netlify
- Configure build settings
- Set up environment variables

## Contact

Your Name - [Pranav Chhabra](mailto:chhabrapranav2001@gmail.com)

Project Link: [https://github.com/your-username/accounting-app](https://github.com/pc9350/Accounting_software.git)

---