// src/components/Layout.js
import React from 'react';
import './Layout.css'; // Ensure this path is correct

const Layout = ({ children }) => {
    return (
        <div>
            <header className="header">
                Inventory Management System
            </header>
            <div className="container">
                {children}
            </div>
        </div>
    );
};

export default Layout;
