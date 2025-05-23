import { useState, useEffect, useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AcercaDe from "./pages/AcercaDe";
import Contacto from "./pages/Contacto";
import GaleriaDeProductos from "./pages/GaleriaDeProductos";
import DetalleProductos from "./componets/DetalleProductos";
import Login from "./pages/login";
import RutaProtegida from "./auth/RutaProtegida";
import Admin from "./pages/Admin";
import { useAuth } from "./context/AuthContext";
//import { CartContext } from "./context/CartContext";

function App() {
  const [cart, setCart] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth(); // Cambiado a usar el contexto de autenticación
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

  const handleRemoveItem = (product) => {
    setCart((prevCart) => { 
      return prevCart 
        .map((item) => {
          if (item.id === product.id) {
            return null; // Remove the item from the cart
          } else {
            return item; // Keep the item in the cart if it's not the one being removed
          }
        })
        .filter((item) => item !== null); // Filter out null items
    });
  }

  const handleClearCart = () => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          return null; // Remove the item from the cart
        })
        .filter((item) => item !== null); // Filter out null items
    })
  }

  const handleLimiteStock = () => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        const product = productos.find((p) => p.id === item.id);
        if (!product) return item; // Si no se encuentra el producto, no hacer nada

        const adjustedQuantity = Math.min(item.quantity, product.stock);
        return { ...item, quantity: adjustedQuantity}
      }));

  }



  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              addToCart={handleAddToCart}
              productos={productos}
              cargando={cargando}
              cart={cart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleRemoveItem={handleRemoveItem}
              handleClearCart={handleClearCart}
              handleLimiteStock={handleLimiteStock}
           />
          }
        />

        <Route
          path="/acercade"
          element={
            <AcercaDe 
              cart={cart} 
              handleRemoveFromCart={handleRemoveFromCart} 
              handleRemoveItem={handleRemoveItem}
              handleClearCart={handleClearCart}
            />
          }
        />

        <Route
          path="/productos"
          element={
            <GaleriaDeProductos
              addToCart={handleAddToCart}
              productos={productos}
              cargando={cargando}
              cart={cart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleRemoveItem={handleRemoveItem}
              handleClearCart={handleClearCart}
             />
          }
        />

        <Route
          path="/productos/:id"
          element={<DetalleProductos productos={productos} />}
        />

        <Route
          path="/contacto"
          element={
            <Contacto 
              cart={cart} 
              handleRemoveFromCart={handleRemoveFromCart} 
              handleRemoveItem={handleRemoveItem}
              handleClearCart={handleClearCart}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <RutaProtegida>
              <Admin />
            </RutaProtegida>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
