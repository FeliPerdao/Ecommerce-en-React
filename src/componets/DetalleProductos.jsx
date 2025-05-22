import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const DetalleProductos = ({ productos }) => {
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
