import React from "react";
import Header from "../componets/estaticos/Header";
import Footer from "../componets/estaticos/Footer";
import loading from "../assets/loading.gif";
import ProductList from "../componets/ProductList";
import { useCart } from "../context/CartContext";

const Home = () => {
  const {
    cargando,
  } = useCart(); // <- traés todo lo que necesites
  
  return (
    <>
      <Header/>
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
          <ProductList />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Home;
