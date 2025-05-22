import React, { useState } from "react";
import Header from "../componets/estaticos/Header";
import Footer from "../componets/estaticos/Footer";
import loading from "../assets/loading.gif";
import ProductList from "../componets/ProductList";

const GaleriaDeProductos = ({
  productos,
  cargando,
  cart,
  addToCart,
  handleRemoveFromCart,
}) => {
  const categorias = ["promo", "oferta", "premium", 'otra'];
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
      <Header cartItems={cart} handleRemoveFromCart={handleRemoveFromCart} />
      <h1>Galería de Productos</h1>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {categorias.map((category) => (
          <label 
            key={category}
            style={{display: 'flex', alignItems:'center', gap: '6px'}}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCheckboxChange(category)}
              />
            {category.charAt(0).toUpperCase() + category.slice(1)}
            </label>
        )
        )}
      </div>

      {cargando ? (
        <img src={loading} alt="loading" />
      ) : (
        <ProductList
          addToCart={addToCart}
          productos={filteredProducts}
          loading={loading}
        />
      )}
      <Footer />
    </>
  );
};

export default GaleriaDeProductos;
