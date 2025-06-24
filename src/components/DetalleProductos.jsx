import React from "react";
import { Link, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";

const DetalleProductos = () => {
  const { productos } = useProducts();
  const { id } = useParams();

  const product = productos.find((producto) => producto.id == id);

  return (
    <div>
      <h1>Detalle del producto: {id}</h1>
      {product ? (
        <>
          <h2>{product.name}</h2>
          <p>{product.detail}</p>
        </>
      ) : (
        <h2>Producto no encontrado</h2>
      )}
      <button>
        <Link to="/">Volver al inicio</Link>
      </button>
    </div>
  );
};

export default DetalleProductos;
