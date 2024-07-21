// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';
import Layout from './Layout'; // Import the Layout component
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
        <Layout>
            <div className="container">
                <h2 className="page-title">Product List</h2>
                <div className="mb-3">
                    <Link to="/add-product" className="btn btn-primary button-spacing">Add New Product</Link>
                    <Link to="/manage-stock" className="btn btn-primary button-spacing">Manage Stock</Link>
                </div>
                <div className="row product-list">
                    {products.map((product) => (
                        <div className="col-md-4" key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default ProductList;
