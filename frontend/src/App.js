// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import StockManagement from './components/StockManagement';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/manage-stock" element={<StockManagement />} />
            </Routes>
        </Router>
    );
};

export default App;
