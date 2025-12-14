// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import ProductListPage from './features/products/ProductListPage';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* 1. Product Routes */}
          <Route path="/" element={<ProductListPage />} />
          <Route path="/products" element={<ProductListPage />} />
          {/* <Route path="/products/:productId" element={<ProductDetailsPage />} /> */}
          
          {/* 2. Order Routes */}
          {/* <Route path="/orders" element={<OrderListPage />} /> */}
          
          {/* 3. Catch-all for 404 */}
          <Route path="*" element={<p style={{ padding: 20 }}>404 - Page Not Found</p>} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;