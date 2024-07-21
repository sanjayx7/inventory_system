// src/components/StockManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout';
import './StockManagement.css';

const StockManagement = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedVariant, setSelectedVariant] = useState('');
    const [amount, setAmount] = useState('');
    const [action, setAction] = useState('add');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductChange = (e) => {
        setSelectedProduct(e.target.value);
        setSelectedVariant(''); // Reset variant when product changes
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = action === 'add' ? 'add-stock' : 'remove-stock';

        try {
            await axios.post(`http://localhost:8000/api/products/${selectedProduct}/${endpoint}/`, {
                variant: selectedVariant,
                amount
            });
            setSuccess(`Stock ${action === 'add' ? 'added' : 'removed'} successfully.`);
            setError('');
            setSelectedProduct('');
            setSelectedVariant('');
            setAmount('');
        } catch (error) {
            setError(`Error ${action === 'add' ? 'adding' : 'removing'} stock.`);
            setSuccess('');
        }
    };

    return (
        <Layout>
            <div className="container">
                <h2 className="page-title">Stock Management</h2>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Product:</label>
                        <select value={selectedProduct} onChange={handleProductChange}>
                            <option value="">Select Product</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Variant:</label>
                        <select value={selectedVariant} onChange={(e) => setSelectedVariant(e.target.value)} disabled={!selectedProduct}>
                            <option value="">Select Variant</option>
                            {selectedProduct && products.find(product => product.id === selectedProduct)?.variants.map((variant, index) => (
                                <option key={index} value={variant.name}>{variant.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Amount:</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Action:</label>
                        <select value={action} onChange={(e) => setAction(e.target.value)}>
                            <option value="add">Add Stock</option>
                            <option value="remove">Remove Stock</option>
                        </select>
                    </div>
                    <button type="submit">{action === 'add' ? 'Add Stock' : 'Remove Stock'}</button>
                </form>
            </div>
        </Layout>
    );
};

export default StockManagement;
