import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`}>
            <div className="header-container container">
                <div className="header-left">
                    <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <nav className="nav-desktop">
                        <Link to="/shop" className="nav-link">Shop</Link>
                        <Link to="/collections" className="nav-link">Collections</Link>
                        <Link to="/about" className="nav-link">About</Link>
                    </nav>
                </div>

                <div className="header-center">
                    <Link to="/" className="logo">ORIXA</Link>
                </div>

                <div className="header-right">
                    <button className="icon-btn search-btn">
                        <Search size={22} />
                    </button>
                    <Link to="/account" className="icon-btn">
                        <User size={22} />
                    </Link>
                    <Link to="/cart" className="icon-btn cart-btn">
                        <ShoppingBag size={22} />
                        <span className="cart-count">0</span>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}>
                    <X size={32} />
                </button>
                <nav className="mobile-nav">
                    <Link to="/shop" className="mobile-nav-link">Shop All</Link>
                    <Link to="/collections" className="mobile-nav-link">Collections</Link>
                    <Link to="/arrivals" className="mobile-nav-link">New Arrivals</Link>
                    <Link to="/about" className="mobile-nav-link">Our Story</Link>
                    <Link to="/account" className="mobile-nav-link">Account</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
