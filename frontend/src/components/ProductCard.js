// src/ProductCard.js
import React from 'react';
import './ProductCard.css'; // Import custom CSS for ProductCard

const ProductCard = ({ product }) => {
    return (
        <div className="card">
            <img src={product.ProductImage} alt={product.ProductName} className="card-img-top" />
            <div className="card-body">
                <h5 className="card-title">{product.ProductName}</h5>
                <p className="card-text">Stock: {product.TotalStock}</p>
            </div>
        </div>
    );
};

export default ProductCard;
