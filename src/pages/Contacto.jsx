import React from "react";
import Header from "../componets/estaticos/Header";
import Footer from "../componets/estaticos/Footer";

const Contacto = ({cart, handleRemoveFromCart}) => {
  return (
    <>
      <Header cartItems={cart} handleRemoveFromCart={handleRemoveFromCart}/>
      <h1>Conctacto</h1>
      <Footer />
    </>
  );
};

export default Contacto;
