import React from "react";
import Productos from "./Productos";
import "./styleProductos.css";
import { useProducts } from "../context/ProductsContext";

const ProductList = () => {
  const { filteredProducts } = useProducts();

  console.log("productos recibido:", filteredProducts);

  if (!Array.isArray(filteredProducts) || filteredProducts.length === 0)
    return <p>No hay productos disponibles en la categoría seleccionada.</p>;

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
        {filteredProducts.map((producto) => (
          <Productos key={producto.id} producto={producto} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
