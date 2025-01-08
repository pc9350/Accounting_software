import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import Layout from './components/Layout';
import Products from './pages/Products';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;