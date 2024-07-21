// src/ProductForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [formData, setFormData] = useState({
        ProductID: '',
        ProductCode: '',
        ProductName: '',
        ProductImage: null,
        CreatedUser: '',
        IsFavourite: false,
        Active: true,
        HSNCode: '',
        TotalStock: '',
        variants: []
    });

    const [currentVariant, setCurrentVariant] = useState({
        name: '',
        subvariants: []
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else if (type === 'checkbox') {
            setFormData({ ...formData, [name]: checked });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleVariantChange = (e) => {
        setCurrentVariant({ ...currentVariant, [e.target.name]: e.target.value });
    };

    const handleSubvariantChange = (index, e) => {
        const newSubvariants = [...currentVariant.subvariants];
        newSubvariants[index] = { option: e.target.value };
        setCurrentVariant({ ...currentVariant, subvariants: newSubvariants });
    };

    const addVariant = () => {
        setFormData({
            ...formData,
            variants: [...formData.variants, currentVariant]
        });
        setCurrentVariant({ name: '', subvariants: [] });
    };

    const addSubvariant = () => {
        setCurrentVariant({
            ...currentVariant,
            subvariants: [...currentVariant.subvariants, { option: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('ProductID', formData.ProductID);
        data.append('ProductCode', formData.ProductCode);
        data.append('ProductName', formData.ProductName);
        data.append('CreatedUser', formData.CreatedUser);
        data.append('IsFavourite', formData.IsFavourite);
        data.append('Active', formData.Active);
        data.append('HSNCode', formData.HSNCode);
        data.append('TotalStock', formData.TotalStock);

        if (formData.ProductImage) {
            data.append('ProductImage', formData.ProductImage);
        }

        // Add variants
        data.append('variants', JSON.stringify(formData.variants));

        try {
            const response = await axios.post('http://localhost:8000/api/products/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Product added successfully!');
            console.log(response.data);
        } catch (error) {
            alert('Error adding product');
            console.error(error.response.data); 
        }
    };

    return (
        <div>
            <h1>Add New Product with Variants</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product ID:</label>
                    <input type="number" name="ProductID" value={formData.ProductID} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Product Code:</label>
                    <input type="text" name="ProductCode" value={formData.ProductCode} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Product Name:</label>
                    <input type="text" name="ProductName" value={formData.ProductName} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Product Image:</label>
                    <input type="file" name="ProductImage" onChange={handleInputChange} />
                </div>
                <div>
                    <label>Created User:</label>
                    <input type="text" name="CreatedUser" value={formData.CreatedUser} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Is Favourite:</label>
                    <input type="checkbox" name="IsFavourite" checked={formData.IsFavourite} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Active:</label>
                    <input type="checkbox" name="Active" checked={formData.Active} onChange={handleInputChange} />
                </div>
                <div>
                    <label>HSN Code:</label>
                    <input type="text" name="HSNCode" value={formData.HSNCode} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Total Stock:</label>
                    <input type="number" step="0.01" name="TotalStock" value={formData.TotalStock} onChange={handleInputChange} />
                </div>

                <h2>Variants</h2>
                <div>
                    <label>Variant Name:</label>
                    <input type="text" name="name" value={currentVariant.name} onChange={handleVariantChange} />
                    <button type="button" onClick={addSubvariant}>Add Subvariant</button>
                </div>
                {currentVariant.subvariants.map((subvariant, index) => (
                    <div key={index}>
                        <label>Subvariant Option {index + 1}:</label>
                        <input type="text" value={subvariant.option} onChange={(e) => handleSubvariantChange(index, e)} />
                    </div>
                ))}
                <button type="button" onClick={addVariant}>Add Variant</button>

                <h2>Current Variants</h2>
                {formData.variants.map((variant, index) => (
                    <div key={index}>
                        <h3>Variant {index + 1}: {variant.name}</h3>
                        {variant.subvariants.map((subvariant, subIndex) => (
                            <p key={subIndex}>Subvariant: {subvariant.option}</p>
                        ))}
                    </div>
                ))}

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
