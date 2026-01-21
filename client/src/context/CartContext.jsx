import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        } else {
            // Hydrate with mock data for demonstration
            setCartItems([
                {
                    id: 101,
                    name: 'Ethereal Diamond Ring',
                    price: 1250,
                    image: 'https://images.unsplash.com/photo-1603561591411-cd7eb5a1b5b3?q=80&w=2069&auto=format&fit=crop',
                    quantity: 1,
                    size: '6',
                    metal: '18k Gold'
                }
            ]);
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1, variant = {}) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (item) => item.id === product.id && item.size === variant.size && item.metal === variant.metal
            );

            if (existingItemIndex > -1) {
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += quantity;
                return newItems;
            } else {
                return [...prevItems, { ...product, quantity, ...variant }];
            }
        });
    };

    const removeFromCart = (itemId, variant = {}) => {
        setCartItems((prevItems) => prevItems.filter(item => !(item.id === itemId && item.size === variant.size && item.metal === variant.metal)));
    };

    const updateQuantity = (itemId, quantity, variant = {}) => {
        if (quantity < 1) return;
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId && item.size === variant.size && item.metal === variant.metal ? { ...item, quantity } : item
            )
        );
    };

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};
