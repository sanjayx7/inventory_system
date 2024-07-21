// src/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import './ProductList.css'; 

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products/');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching products');
                setLoading(false);
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-4">
            <h1>Product List</h1>
            <Link to="/add-product" className="btn btn-primary mb-3 button-spacing">Add New Product</Link>
            <Link to="/add-stock" className="btn btn-primary mb-3 button-spacing">Add Stock</Link>
            <Link to="/remove-stock" className="btn btn-primary mb-3 button-spacing">Remove Stock</Link>
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4" key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>

          
    );
};

export default ProductList;