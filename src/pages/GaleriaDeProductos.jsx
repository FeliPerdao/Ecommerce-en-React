import React, { useEffect } from "react";
import Header from "../componets/estaticos/Header";
import Footer from "../componets/estaticos/Footer";
import loading from "../assets/loading.gif";
import ProductList from "../componets/ProductList";
import { useProducts } from "../context/ProductsContext";

const GaleriaDeProductos = () => {
  const {
    cargando,
    categorias,
    handleCheckboxChange,
    selectedCategories,
    setIsGaleria,
  } = useProducts();

  useEffect(() => {
    setIsGaleria(true);
    return () => setIsGaleria(false); // Resetea isGaleria cuando el componente es desmontado.
  }, []);

  return (
    <>
      <Header />
      <h1>Galería de Productos</h1>
      {
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          {categorias.map((category) => (
            <label
              key={category}
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCheckboxChange(category)}
              />
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </label>
          ))}
        </div>
      }

      {cargando ? <img src={loading} alt="loading" /> : <ProductList />}
      <Footer />
    </>
  );
};

export default GaleriaDeProductos;
