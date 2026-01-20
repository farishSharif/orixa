import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import './Shop.css';

const Shop: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    // Sample data
    const products = [
        { id: 1, name: 'Cotton Crew Neck', price: 1299.00, category: 'Apparel' },
        { id: 2, name: 'Slim Fit Chinos', price: 2499.00, category: 'Apparel' },
        { id: 3, name: 'Linen Summer Shirt', price: 1899.00, category: 'Apparel' },
        { id: 4, name: 'Leather School Bag', price: 3499.00, category: 'Accessories' },
        { id: 5, name: 'Knit Wool Sweater', price: 2999.00, category: 'Apparel' },
        { id: 6, name: 'Daily Essential Tee', price: 899.00, category: 'Apparel' },
        { id: 7, name: 'Formal Dinner Blazer', price: 6999.00, category: 'Apparel' },
        { id: 8, name: 'Classic Leather Belt', price: 999.00, category: 'Accessories' },
    ];

    const categories = ['All', 'Apparel', 'Accessories', 'New Arrivals'];

    return (
        <div className="shop-page container">
            <div className="shop-header">
                <h1>Shop All</h1>
                <div className="shop-controls">
                    <div className="filter-dropdown">
                        <button className="control-btn">
                            Sort by <ChevronDown size={16} />
                        </button>
                    </div>
                    <button className="control-btn filter-btn">
                        Filter <Filter size={16} />
                    </button>
                </div>
            </div>

            <div className="shop-layout">
                <aside className="shop-sidebar">
                    <div className="sidebar-section">
                        <h3>Categories</h3>
                        <ul>
                            {categories.map(cat => (
                                <li key={cat}>
                                    <button
                                        className={`filter-link ${activeFilter === cat ? 'active' : ''}`}
                                        onClick={() => setActiveFilter(cat)}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="sidebar-section">
                        <h3>Price</h3>
                        <ul>
                            <li><button className="filter-link">Under ₹1500</button></li>
                            <li><button className="filter-link">₹1500 - ₹5000</button></li>
                            <li><button className="filter-link">₹5000+</button></li>
                        </ul>
                    </div>
                </aside>

                <section className="product-list">
                    <div className="shop-products-grid">
                        {products.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="product-img-wrapper">
                                    <div className="placeholder-img" style={{ background: '#f5f5f5', aspectRatio: '3/4' }}></div>
                                    <Link to={`/product/${product.id}`} className="add-to-cart-quick">View Details</Link>
                                </div>
                                <div className="product-meta">
                                    <h3>{product.name}</h3>
                                    <p className="price">₹{product.price.toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Shop;
