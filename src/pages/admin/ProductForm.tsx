import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Product } from '../../types/database';

interface ProductFormProps {
    product?: Product | null;
    onSave: (product: Partial<Product>) => Promise<void>;
    onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onClose }) => {
    const [formData, setFormData] = useState<Partial<Product>>(
        product || {
            name: '',
            price: 0,
            category: 'Apparel',
            description: '',
            stock: 0,
            images: [],
            details: [],
            sizes: ['6Y', '8Y', '10Y', '12Y']
        }
    );
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await onSave(formData);
            onClose();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content product-form-modal">
                <div className="modal-header">
                    <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <button className="close-btn" onClick={onClose}><X size={24} /></button>
                </div>
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label>Product Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Price (₹)</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Stock</label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={e => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="Apparel">Apparel</option>
                            <option value="Accessories">Accessories</option>
                            <option value="New Arrivals">New Arrivals</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-dark" disabled={saving}>
                            {saving ? 'Saving...' : 'Save Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
