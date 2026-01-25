import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Star } from 'lucide-react';
import { dataService } from '../lib/dataService';
import { useCart } from '../context/CartContext';
import type { Product } from '../types/database';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('');
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const data = await dataService.getProductById(id);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Loading product details...</div>;
    if (!product) return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Product not found.</div>;

    return (
        <div className="product-detail-page container">
            <nav className="breadcrumb">
                <Link to="/">Home</Link> <ChevronRight size={14} />
                <Link to="/shop">Shop</Link> <ChevronRight size={14} />
                <span>{product.name}</span>
            </nav>

            <div className="product-layout">
                {/* Gallery */}
                <div className="product-gallery">
                    <div className="main-image">
                        {product.images?.[activeImage] ? (
                            <img src={product.images[activeImage]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div className="placeholder-img" style={{ background: '#f5f5f5', aspectRatio: '3/4' }}></div>
                        )}
                    </div>
                    {product.images && product.images.length > 1 && (
                        <div className="thumbnail-list">
                            {product.images.map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`thumbnail ${activeImage === idx ? 'active' : ''}`}
                                    onClick={() => setActiveImage(idx)}
                                >
                                    <img src={img} alt={`${product.name} ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="product-info">
                    <div className="product-header">
                        <h1>{product.name}</h1>
                        <div className="product-rating">
                            <div className="stars">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill={i <= 4 ? "currentColor" : "none"} />)}
                            </div>
                            <span className="reviews">4.8 (24 Reviews)</span>
                        </div>
                        <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
                    </div>

                    <div className="product-description">
                        <p>{product.description}</p>
                    </div>

                    <div className="product-options">
                        <div className="option-section">
                            <div className="option-header">
                                <h3>Select Size</h3>
                                <button className="size-guide">Size Guide</button>
                            </div>
                            <div className="size-buttons">
                                {product.sizes && product.sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="product-actions">
                        <button
                            className="btn btn-dark add-to-cart"
                            onClick={() => {
                                if (!selectedSize) {
                                    alert('Please select a size');
                                    return;
                                }
                                addToCart(product, selectedSize);
                            }}
                        >
                            <ShoppingBag size={20} /> Add to Cart
                        </button>
                        <button className="btn btn-outline-dark wishlist-btn">
                            Add to Wishlist
                        </button>
                    </div>

                    <div className="product-extra-info">
                        <details open>
                            <summary>Details & Composition</summary>
                            <ul>
                                {product.details && product.details.map((detail, i) => <li key={i}>{detail}</li>)}
                            </ul>
                        </details>
                        <details>
                            <summary>Shipping & Returns</summary>
                            <p>Free standard shipping on orders over ₹5,000. Returns accepted within 30 days.</p>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
