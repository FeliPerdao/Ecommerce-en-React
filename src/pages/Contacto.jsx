import React from "react";
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";
import { FaGithub, FaLinkedin } from "react-icons/fa";
const Contacto = () => {
  return (
    <>
      <Header />
      <div className="p-8 max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Contacto</h1>
        <p className="text-lg mb-4 text-gray-700">
          ¿Querés trabajar conmigo o simplemente charlar de código? Acá te dejo
          mis redes:
        </p>
        <div className="flex justify-center gap-6 text-3xl text-gray-800">
          <a
            href="https://github.com/FeliPerdao"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
            title="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/filipeperdao/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </>
  );
};

export default Contacto;
