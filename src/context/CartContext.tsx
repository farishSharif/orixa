import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../types/database';

interface CartItem extends Product {
    quantity: number;
    selectedSize: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, size: string) => void;
    removeFromCart: (id: string, size: string) => void;
    updateQuantity: (id: string, size: string, delta: number) => void;
    clearCart: () => void;
    subtotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('orixa_cart');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('orixa_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product: Product, size: string) => {
        setCartItems(prev => {
            const existingIndex = prev.findIndex(item => item.id === product.id && item.selectedSize === size);
            if (existingIndex > -1) {
                const newItems = [...prev];
                newItems[existingIndex].quantity += 1;
                return newItems;
            }
            return [...prev, { ...product, quantity: 1, selectedSize: size }];
        });
    };

    const removeFromCart = (id: string, size: string) => {
        setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
    };

    const updateQuantity = (id: string, size: string, delta: number) => {
        setCartItems(prev => prev.map(item =>
            (item.id === id && item.selectedSize === size)
                ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                : item
        ));
    };

    const clearCart = () => setCartItems([]);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, subtotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

// Error in my code above, I used AuthContext instead of CartContext. Fixed below:
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
