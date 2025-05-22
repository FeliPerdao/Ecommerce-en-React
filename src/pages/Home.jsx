import React from "react";
import Header from "../componets/estaticos/Header";
import Footer from "../componets/estaticos/Footer";
import loading from "../assets/loading.gif";
import ProductList from "../componets/ProductList";

const Home = ({
  productos,
  cargando,
  cart,
  addToCart,
  handleRemoveFromCart,
}) => {
  return (
    <>
      <Header cartItems={cart} handleRemoveFromCart={handleRemoveFromCart} />
      <main>
        <h1>Bienvenidos a la tienda Placebo</h1>
        <p>Tu carrito no lo necesita, pero vos sí.</p>
        <p>
          Cosas completamente inútiles con una utilidad emocional
          incuestionable.
        </p>
        {cargando ? (
          <img src={loading} alt="loading" />
        ) : (
          <ProductList
            addToCart={addToCart}
            productos={productos}
            loading={loading}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Home;
