import React from "react";
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";

const AcercaDe = () => {
  return (
    <>
      <Header />
      <div className="p-8 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
        <p className="text-lg leading-relaxed text-gray-700">
          Somos un equipo apasionado por la tecnología, el diseño funcional y la
          eficiencia. Creamos soluciones digitales que realmente sirven, sin
          humo ni palabrerío de más.
        </p>
        <p className="mt-4 text-gray-600">
          Nuestra misión es hacer productos que funcionen tan bien que hasta tu
          suegra pueda usarlos. Nos importa la experiencia del usuario, la
          accesibilidad y el rendimiento. Y sí, también tomamos buen café.
        </p>
      </div>
    </>
  );
};

export default AcercaDe;
