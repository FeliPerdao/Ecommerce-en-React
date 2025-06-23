import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import { AdminProvider } from "./context/AdminContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <ProductsProvider>
        <AdminProvider>
          <AuthProvider>
            <ThemeProvider>
              <CartProvider>
                <App />
                <ToastContainer />
              </CartProvider>
            </ThemeProvider>
          </AuthProvider>
        </AdminProvider>
      </ProductsProvider>
    </Router>
  </StrictMode>
);
