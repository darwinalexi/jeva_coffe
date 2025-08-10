
import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const increment = (product) => {
        setCartItems((prev) => {
            const exist = prev.find((item) => item.id === product.id);
            if (exist) {
                if (exist.quantity < product.unidades_disponibles) {
                    return prev.map((item) =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                } else {
                    alert("Stock máximo alcanzado");
                    return prev;
                }
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    const decrement = (product) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, increment, decrement }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
