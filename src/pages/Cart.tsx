import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowLeft, CreditCard } from 'lucide-react';
import './Cart.css';

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Cotton Crew Neck', price: 1299.00, size: '8Y', quantity: 1 },
        { id: 2, name: 'Slim Fit Chinos', price: 2499.00, size: '10Y', quantity: 1 },
    ]);

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const removeItem = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-page container">
            <h1>Your Bag</h1>

            {cartItems.length === 0 ? (
                <div className="empty-cart" style={{ textAlign: 'center', padding: '100px 0' }}>
                    <p style={{ marginBottom: '2rem' }}>Your bag is empty.</p>
                    <Link to="/shop" className="btn btn-dark">Start Shopping</Link>
                </div>
            ) : (
                <div className="cart-layout">
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="item-img-placeholder" style={{ background: '#f5f5f5', width: '120px', aspectRatio: '3/4' }}></div>
                                <div className="item-details">
                                    <div className="item-header">
                                        <h3>{item.name}</h3>
                                        <button className="remove-btn" onClick={() => removeItem(item.id)}><Trash2 size={18} /></button>
                                    </div>
                                    <p className="item-meta">Size: {item.size}</p>
                                    <div className="item-footer">
                                        <div className="quantity-control">
                                            <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                                        </div>
                                        <p className="item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Link to="/shop" className="continue-link">
                            <ArrowLeft size={16} /> Continue Shopping
                        </Link>
                    </div>

                    <aside className="cart-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="summary-total">
                            <span>Total</span>
                            <span>₹{subtotal.toLocaleString('en-IN')}</span>
                        </div>
                        <Link to="/checkout" className="btn btn-dark checkout-btn">
                            Checkout <CreditCard size={18} />
                        </Link>
                        <div className="summary-extra">
                            <p>Free returns within 30 days.</p>
                            <p>Secure checkout powered by Stripe.</p>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
};

export default Cart;
