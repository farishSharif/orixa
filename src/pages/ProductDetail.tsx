import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, ChevronRight, Star } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedSize, setSelectedSize] = useState('');
    const [activeImage, setActiveImage] = useState(0);

    const allProducts = [
        {
            id: 1,
            name: 'ORIXA Signature Blazer',
            price: 4999.00,
            category: 'Apparel',
            description: 'A premium tailored blazer for boys, crafted from high-quality wool blend for a sophisticated look. Perfect for formal occasions and celebrations.',
            details: ['Wool Blend Fabric', 'Tailored Fit', 'Satin Lining', 'Dry clean only'],
            sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'],
            images: ['/assets/images/placeholder.png', '/assets/images/placeholder.png', '/assets/images/placeholder.png']
        },
        {
            id: 2,
            name: 'Slim Fit Chinos',
            price: 2499.00,
            category: 'Apparel',
            description: 'Classic slim-fit chinos designed for both style and comfort. These trousers feature a soft cotton twill with a hint of stretch.',
            details: ['98% Cotton, 2% Elastane', 'Slim fit', 'Adjustable waistband', 'Machine washable'],
            sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'],
            images: ['/assets/images/placeholder.png', '/assets/images/placeholder.png', '/assets/images/placeholder.png']
        },
        {
            id: 3,
            name: 'Linen Summer Shirt',
            price: 1899.00,
            category: 'Apparel',
            description: 'A breathable linen shirt perfect for warm weather. Minimalist design with a clean button-down front.',
            details: ['100% Organic Linen', 'Breathable fabric', 'Natural buttons', 'Easy through the body'],
            sizes: ['6Y', '8Y', '10Y', '12Y', '14Y'],
            images: ['/assets/images/placeholder.png', '/assets/images/placeholder.png', '/assets/images/placeholder.png']
        }
    ];

    const product = allProducts.find(p => p.id === Number(id)) || allProducts[0];

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
                        <div className="placeholder-img" style={{ background: '#f5f5f5', aspectRatio: '3/4' }}></div>
                    </div>
                    <div className="thumbnail-list">
                        {product.images.map((_img, idx) => (
                            <div
                                key={idx}
                                className={`thumbnail ${activeImage === idx ? 'active' : ''}`}
                                onClick={() => setActiveImage(idx)}
                            >
                                <div className="placeholder-img" style={{ background: '#f5f5f5', aspectRatio: '1/1' }}></div>
                            </div>
                        ))}
                    </div>
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
                                {product.sizes.map(size => (
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
                        <button className="btn btn-dark add-to-cart">
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
                                {product.details.map((detail, i) => <li key={i}>{detail}</li>)}
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
