import React from "react";
import Productos from "./Productos";
import './styleProductos.css';

const ProductList = ({ productos, addToCart }) => {


  console.log("productos recibido:", productos); // 👈 esto te dice la verdad

  return (
    <>
      <h2>Galería de Productos</h2>

      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
      {productos.map((producto) => (
        <Productos key={producto.id} producto={producto} addToCart={addToCart}/>
      ))}
      </div>
    </>
  );
};

export default ProductList;
