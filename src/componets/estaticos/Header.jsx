import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styleEstatico.css";
import Cart from "../Cart";
import ThemeSetter from "./ThemeSetter";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

const Header = ({
  cartItems,
  handleRemoveFromCart,
  handleRemoveItem,
  handleClearCart,
  productos,
  handleLimiteStock
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const location = useLocation();

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
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <input
            type="checkbox"
            checked={isAuthenticated}
            onChange={(e) => setIsAuthenticated(e.target.checked)}
          />
          Administrador
        </label>
        <ThemeSetter />
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
            <Cart
              cartItems={cartItems}
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              handleRemoveFromCart={handleRemoveFromCart}
              handleClearCart={handleClearCart}
              handleRemoveItem={handleRemoveItem}
              productos={productos}
              handleLimiteStock={handleLimiteStock}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
