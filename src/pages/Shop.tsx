import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown } from 'lucide-react';
import { dataService } from '../lib/dataService';
import type { Product } from '../types/database';
import './Shop.css';

const Shop: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await dataService.getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categories = ['All', 'Apparel', 'Accessories', 'New Arrivals'];

    const filteredProducts = activeFilter === 'All'
        ? products
        : products.filter(p => p.category === activeFilter);

    if (loading) return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Loading collection...</div>;

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
                </aside>

                <section className="product-list">
                    <div className="shop-products-grid">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="product-img-wrapper">
                                    {product.images?.[0] ? (
                                        <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div className="placeholder-img" style={{ background: '#f5f5f5', aspectRatio: '3/4' }}></div>
                                    )}
                                    <Link to={`/product/${product.id}`} className="add-to-cart-quick">View Details</Link>
                                </div>
                                <div className="product-meta">
                                    <h3>{product.name}</h3>
                                    <p className="price">₹{product.price.toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {filteredProducts.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            <p>No products found in this category.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Shop;
