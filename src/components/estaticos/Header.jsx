import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./styleEstatico.css";
import Cart from "../Cart";
import ThemeSetter from "./ThemeSetter";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  return (
    <header>
      <div
        className="theme-btn-container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <ThemeSetter />
        <div
          className="theme-btn-container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "0 20px",
            gap: "10px",
          }}
        >
          {isAuthenticated ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Link to="/admin">
                <button className={`buttons ${theme}`}>
                  Panel Administrador
                </button>
              </Link>
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                }}
                className={`buttons ${theme}`}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className={`buttons ${theme}`}>Login</button>
            </Link>
          )}
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              className={`link ${
                location.pathname === "/" ? "active-link" : ""
              }`}
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/acercade"
              className={`link ${
                location.pathname === "/acercade" ? "active-link" : ""
              }`}
            >
              Sobre Nosotros
            </Link>
          </li>
          <li>
            <Link
              to="/productos"
              className={`link ${
                location.pathname.startsWith("/productos") ? "active-link" : ""
              }`}
            >
              Galeria de Productos
            </Link>
          </li>
          <li>
            <Link
              to="/contacto"
              className={`link ${
                location.pathname === "/contacto" ? "active-link" : ""
              }`}
            >
              Contacto
            </Link>
          </li>
          <li className="cartnav">
            <button className="btnCart" onClick={() => setIsCartOpen(true)}>
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
