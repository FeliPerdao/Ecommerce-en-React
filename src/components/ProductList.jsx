import React, { useState } from "react";
import Productos from "./Productos";
import "./styleProductos.css";
import { useProducts } from "../context/ProductsContext";
import Pagination from "react-bootstrap/Pagination";

const ProductList = () => {
  const { busqueda, setBusqueda, productosRenderizados } = useProducts();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = productosRenderizados.slice(
    indexOfFirst,
    indexOfLast
  );
  const totalPages = Math.ceil(productosRenderizados.length / itemsPerPage);

  if (
    !Array.isArray(productosRenderizados) ||
    productosRenderizados.length === 0
  )
    return (
      <>
        <h2>Galería de Productos</h2>
        <p>No hay productos disponibles en la categoría seleccionada.</p>;
      </>
    );

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
        {currentProducts.map((producto) => (
          <Productos key={producto.id} producto={producto} />
        ))}
      </div>
      <div className="paginador-custom">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={i + 1 === currentPage ? "activo" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
      </div>
    </>
  );
};

export default ProductList;
