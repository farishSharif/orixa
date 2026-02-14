import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { dataService } from '../lib/dataService';
import type { Product } from '../types/database';
import './Home.css';

const Home: React.FC = () => {
    const [newArrivals, setNewArrivals] = useState<Product[]>([]);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            try {
                const data = await dataService.getProducts();
                setNewArrivals(data.slice(0, 4));
            } catch (error) {
                console.error('Error fetching new arrivals:', error);
            }
        };
        fetchNewArrivals();

        const subscription = dataService.subscribeToProducts(() => {
            fetchNewArrivals();
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-image-container">
                    <img src="/assets/images/hero_boys.png" alt="ORIXA Boys' Premium Fashion" className="hero-img" />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content container">
                    <h2 className="fade-in">Tailored for Boys</h2>
                    <h1 className="fade-in" style={{ animationDelay: '0.2s' }}>ORIXA</h1>
                    <p className="fade-in" style={{ animationDelay: '0.4s' }}>Premium, minimalist fashion for the young elite.</p>
                    <div className="hero-actions fade-in" style={{ animationDelay: '0.6s' }}>
                        <Link to="/shop" className="btn btn-primary">Shop Collection</Link>
                        <Link to="/about" className="btn btn-outline">Our Story</Link>
                    </div>
                </div>
            </section>

            {/* Featured Collections */}
            <section className="collections section-padding container">
                <div className="section-header">
                    <h2>Featured Collections</h2>
                    <Link to="/collections" className="view-all">View All <ArrowRight size={18} /></Link>
                </div>
                <div className="collections-grid">
                    <div className="collection-card large">
                        <div className="collection-img-wrapper">
                            <div className="placeholder-img" style={{ background: '#f0f0f0', height: '100%', minHeight: '400px' }}></div>
                            <div className="collection-info">
                                <h3>Spring/Summer 26</h3>
                                <Link to="/shop?collection=ss26" className="link-underline">Explore</Link>
                            </div>
                        </div>
                    </div>
                    <div className="collection-card">
                        <div className="collection-img-wrapper">
                            <div className="placeholder-img" style={{ background: '#e8e8e8', height: '100%', minHeight: '250px' }}></div>
                            <div className="collection-info">
                                <h3>Essentials</h3>
                                <Link to="/shop?collection=essentials" className="link-underline">Shop Now</Link>
                            </div>
                        </div>
                    </div>
                    <div className="collection-card">
                        <div className="collection-img-wrapper">
                            <div className="placeholder-img" style={{ background: '#dfdfdf', height: '100%', minHeight: '250px' }}></div>
                            <div className="collection-info">
                                <h3>Accessories</h3>
                                <Link to="/shop?collection=accessories" className="link-underline">Shop Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Arrivals Preview */}
            <section className="new-arrivals section-padding">
                <div className="container">
                    <div className="section-header">
                        <h2>New Arrivals</h2>
                        <Link to="/shop?sort=newest" className="view-all">Shop Newest <ArrowRight size={18} /></Link>
                    </div>
                    <div className="products-grid">
                        {newArrivals.map((product) => (
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
                </div>
            </section>
        </div>
    );
};

export default Home;
