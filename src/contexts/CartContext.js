import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

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
