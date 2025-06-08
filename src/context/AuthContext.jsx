import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

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

      const foundUser = users.find(
        //Busca si hay usuario y password en user.json
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
      setError({ email: "Error al iniciar sesión, intente más tarde:", err });
    }
  };

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
