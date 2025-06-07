import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
/* import { CartContext } from '../context/CartContext'
import { ProductsContext } from '../context/ProductsContext'*/
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { setIsAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    let validationErrors = {};
    if (!email) validationErrors.email = "El email es obligatorio";
    if (!password) validationErrors.password = "La contraseña es obligatoria";

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const res = await fetch("data/users.json");
      const users = await res.json();

      const foundUser = users.find( //Busca si hay usuario y password en user.json
        (user) => user.email === email && user.password === password
      );

      if (!foundUser) {
        setError({ email: "Credenciales inválidas" });
      } else {
        if (foundUser.role === "admin") {
          setIsAuthenticated(true);
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setError({ email: "Error al iniciar sesión, intente más tarde" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "400px",
        margin: "auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label
          htmlFor="formBasicEmail"
          style={{ marginBottom: "0.5rem", fontWeight: "bold" }}
        >
          Email address
        </label>
        <input
          id="formBasicEmail"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "0.25rem",
            border: `1px solid ${error.email ? "red" : "#ced4da"}`,
          }}
        />
        {error.email && (
          <div
            style={{ color: "red", fontSize: "0.875rem", marginTop: "0.25rem" }}
          >
            {error.email}
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label
          htmlFor="formBasicPassword"
          style={{ marginBottom: "0.5rem", fontWeight: "bold" }}
        >
          Password
        </label>
        <input
          id="formBasicPassword"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "0.5rem",
            borderRadius: "0.25rem",
            border: `1px solid ${error.password ? "red" : "#ced4da"}`,
          }}
        />
        {error.password && (
          <div
            style={{ color: "red", fontSize: "0.875rem", marginTop: "0.25rem" }}
          >
            {error.password}
          </div>
        )}
      </div>

      <button
        type="submit"
        style={{
          padding: "0.75rem",
          borderRadius: "0.25rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default Login;
