import React, { createContext, useContext, useState, useEffect } from "react";
import { useProducts } from "./ProductsContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { productos } = useProducts();
  
  const [cart, setCart] = useState([]); 
  
  const handleAddToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id); // Prueba si el producto a agregar ya existe en el carrito
    if (productInCart) {
      setCart(
        cart.map((item) =>
          item.id === productInCart.id
            ? { ...item, quantity: item.quantity + product.quantity }  // Si existe, actualiza la cantidad
            : item // Si no existe, lo deja igual
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: product.quantity }]); // Si no existe, lo agrega al carrito
    }
  };

  const handleRemoveFromCart = (product) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === product.id
            ? item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null
            : item
        )
        .filter(Boolean)
    );
  };

const handleRemoveItem = (product) => {
  setCart((prev) => prev.filter((item) => item.id !== product.id)); // Elimina el producto del carrito
}

 const handleClearCart = () => setCart([]);

const handleLimiteStock = () => {
    setCart((prev) =>
      prev.map((item) => {
        const prod = productos.find((p) => p.id === item.id);
        const cantidad = Math.min(item.quantity, prod?.stock ?? item.quantity);
        return { ...item, quantity: cantidad };
      })
    );
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddToCart,
        handleRemoveItem,
        handleRemoveFromCart,
        handleClearCart,
        handleLimiteStock,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
