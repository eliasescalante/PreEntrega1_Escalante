import { useState, createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Agregar un producto al carrito
    const addToCart = (product, quantity) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity }];
            }
        });
    };

    // Calcular el total del carrito
    const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Vaciar el carrito
    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, totalAmount, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
