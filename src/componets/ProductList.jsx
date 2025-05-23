import React from "react";
import Productos from "./Productos";
import "./styleProductos.css";
import { useCart } from "../context/CartContext";

const ProductList = () => {
  const { productos, handleAddToCart } = useCart();
  
  console.log("productos recibido:", productos);

  if (!Array.isArray(productos) || productos.length === 0)
  return <p>No hay productos disponibles.</p>;

  return (
    <>
      <h2>Galería de Productos</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {productos.map((producto) => (
          <Productos
            key={producto.id}
            producto={producto}
            addToCart={handleAddToCart}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
