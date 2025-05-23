import React, { useState } from "react";
import Header from "../componets/estaticos/Header";
import Footer from "../componets/estaticos/Footer";
import loading from "../assets/loading.gif";
import ProductList from "../componets/ProductList";
import { useCart } from "../context/CartContext";

const GaleriaDeProductos = () => {
  const {
    productos,
    cargando,
    handleAddToCart,
  } = useCart(); // <- traés todo lo que necesites

  const categorias = ["promo", "oferta", "premium", "otra"];
  const [selectedCategories, setSelectedCategories] = useState([
    "promo",
    "oferta",
    "premium",
  ]);

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts =
    selectedCategories.lenght === 0
      ? productos
      : productos.filter((producto) =>
          selectedCategories.includes(producto.category)
        );

  return (
    <>
      <Header />
      <h1>Galería de Productos</h1>
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

      {cargando ? (
        <img src={loading} alt="loading" />
      ) : (
        <ProductList />
      )}
      <Footer />
    </>
  );
};

export default GaleriaDeProductos;
