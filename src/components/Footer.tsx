import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-container container">
                <div className="footer-grid">
                    <div className="footer-column branding">
                        <Link to="/" className="footer-logo">ORIXA</Link>
                        <p className="footer-description">
                            Elevating modern fashion with a minimal aesthetic. Designed for the bold and the elegant.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link"><Instagram size={20} /></a>
                            <a href="#" className="social-link"><Facebook size={20} /></a>
                            <a href="#" className="social-link"><Twitter size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-column">
                        <h3>Shop</h3>
                        <ul>
                            <li><Link to="/shop">All Products</Link></li>
                            <li><Link to="/collections">Collections</Link></li>
                            <li><Link to="/arrivals">New Arrivals</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>Company</h3>
                        <ul>
                            <li><Link to="/about">Our Story</Link></li>
                            <li><Link to="/press">Press</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>Newsletter</h3>
                        <p className="newsletter-text">Join us for exclusive previews and updates.</p>
                        <form className="newsletter-form">
                            <input type="email" placeholder="YOUR EMAIL" aria-label="Email" />
                            <button type="submit"><Mail size={18} /></button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} ORIXA. All rights reserved.</p>
                    <div className="footer-bottom-links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
