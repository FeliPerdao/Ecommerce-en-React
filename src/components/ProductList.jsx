import React from "react";
import Productos from "./Productos";
import "./styleProductos.css";
import { useProducts } from "../context/ProductsContext";

const ProductList = () => {
  const { busqueda, setBusqueda, productosRenderizados } = useProducts();

  if (
    !Array.isArray(productosRenderizados) ||
    productosRenderizados.length === 0
  )
    return <p>No hay productos disponibles en la categoría seleccionada.</p>;

  return (
    <>
      <h2>Galería de Productos</h2>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {productosRenderizados.map((producto) => (
          <Productos key={producto.id} producto={producto} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
