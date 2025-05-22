//ese módulo para crear contexto del carrito está desactivado.

import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  //const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    fetch("/data/data.json")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setTimeout(() => {
          setProductos(datos);
          setCargando(false);
        }, 200);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
        setCargando(false);
        setError(true);
      });
  }, []);

  const handleAddToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart(
        cart.map((item) =>
          item.id === productInCart.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: product.quantity }]); // Solo si no existe
    }
  };

  const handleRemoveFromCart = (product) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === product.id) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return null; // Remove the item from the cart if quantity is 1
            }
          } else {
            return item; // Keep the item in the cart if it's not the one being removed
          }
        })
        .filter((item) => item !== null); // Filter out null items
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        productos,
        cargando,
        error,
        handleAddToCart,
        handleRemoveFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
