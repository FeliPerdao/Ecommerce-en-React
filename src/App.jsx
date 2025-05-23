import { useState, useEffect, useContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AcercaDe from "./pages/AcercaDe";
import Contacto from "./pages/Contacto";
import GaleriaDeProductos from "./pages/GaleriaDeProductos";
import DetalleProductos from "./componets/DetalleProductos";
import Login from "./pages/login";
import RutaProtegida from "./auth/RutaProtegida";
import Admin from "./pages/Admin";
import { useAuth } from "./context/AuthContext";
//import { CartContext } from "./context/CartContext";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/acercade" element={<AcercaDe />} />

      <Route path="/productos" element={<GaleriaDeProductos />} />

      <Route path="/productos/:id" element={<DetalleProductos />} />

      <Route path="/contacto" element={<Contacto />} />

      <Route
        path="/admin"
        element={
          <RutaProtegida>
            <Admin />
          </RutaProtegida>
        }
      />

      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
