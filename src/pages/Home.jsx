import React from "react";
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";
import loading from "../assets/loading.gif";
import ProductList from "../components/ProductList";
import { useProducts } from "../context/ProductsContext";

const Home = () => {
  const { cargando } = useProducts();

  return (
    <>
      <Header />
      <main>
        <h1>Bienvenidos a la tienda Placebo</h1>
        <p>Tu carrito no lo necesita, pero vos sí.</p>
        <p>
          Cosas completamente inútiles con una utilidad emocional
          incuestionable.
        </p>
        {cargando ? <img src={loading} alt="loading" /> : <ProductList />}
      </main>
      <Footer />
    </>
  );
};

export default Home;
