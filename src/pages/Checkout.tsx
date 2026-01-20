import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CreditCard, Lock } from 'lucide-react';
import './Checkout.css';

const Checkout: React.FC = () => {
    return (
        <div className="checkout-page container">
            <nav className="breadcrumb">
                <Link to="/cart">Cart</Link> <ChevronRight size={14} />
                <span>Checkout</span>
            </nav>

            <div className="checkout-layout">
                <div className="checkout-form-section">
                    <h2>Shipping Information</h2>
                    <form className="checkout-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" placeholder="John" />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" placeholder="Doe" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" placeholder="123 Luxury Ave" />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" placeholder="New York" />
                            </div>
                            <div className="form-group">
                                <label>Postal Code</label>
                                <input type="text" placeholder="10001" />
                            </div>
                        </div>

                        <h2 style={{ marginTop: '3rem' }}>Payment Method</h2>
                        <div className="payment-options">
                            <div className="payment-method active">
                                <CreditCard size={20} />
                                <span>Credit Card / Stripe</span>
                            </div>
                        </div>

                        <div className="stripe-placeholder">
                            <div className="card-input-mock">
                                <Lock size={16} /> Secure Payment Input Field
                            </div>
                        </div>

                        <button type="submit" className="btn btn-dark place-order-btn">
                            Pay ₹3,798.00
                        </button>
                    </form>
                </div>

                <aside className="checkout-summary">
                    <h3>Your Order</h3>
                    <div className="order-items-preview">
                        <div className="order-item-mini">
                            <div className="mini-img-placeholder" style={{ background: '#f5f5f5', width: '60px', aspectRatio: '3/4' }}></div>
                            <div className="mini-details">
                                <p>Cotton Crew Neck x 1</p>
                                <p className="mini-price">₹1,299.00</p>
                            </div>
                        </div>
                        <div className="order-item-mini">
                            <div className="mini-img-placeholder" style={{ background: '#f5f5f5', width: '60px', aspectRatio: '3/4' }}></div>
                            <div className="mini-details">
                                <p>Slim Fit Chinos x 1</p>
                                <p className="mini-price">₹2,499.00</p>
                            </div>
                        </div>
                    </div>
                    <div className="summary-spacer"></div>
                    <div className="summary-row">
                        <span>Subtotal</span>
                        <span>₹3,798.00</span>
                    </div>
                    <div className="summary-row">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="summary-total">
                        <span>Total</span>
                        <span>₹3,798.00</span>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Checkout;
