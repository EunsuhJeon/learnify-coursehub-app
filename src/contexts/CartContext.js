import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cart, setCart] = useState(()=>{
        try {
            const stored = localStorage.getItem("learnify_cart");
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(()=>{
        localStorage.setItem("learnify_cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (course) => {
        setCart((prev) => {
            if (prev.find((c) => c.id === course.id)) return prev;
            return [...prev, course];
        });
    };

    const removeFromCart = (courseId) => {
        setCart((prev) => prev.filter((c) => c.id !== courseId));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
