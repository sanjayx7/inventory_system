import React from 'react';
import './ProductCard.css'; 

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            {product.ProductImage && (
                <img src={product.ProductImage} alt={product.ProductName} className="product-image" />
            )}
            <div className="product-details">
                <h2 className="product-name">{product.ProductName}</h2>
                <p><strong>Product Code:</strong> {product.ProductCode}</p>
                <p><strong>HSN Code:</strong> {product.HSNCode}</p>
                <p><strong>Total Stock:</strong> {product.TotalStock}</p>
                <p><strong>Created By:</strong> {product.CreatedUser}</p>
                <p><strong>Active:</strong> {product.Active ? 'Yes' : 'No'}</p>
            </div>
        </div>
    );
};

export default ProductCard;
