import React, { useEffect } from "react";
import "./styleCart.css";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Cart = ({ isOpen, onClose }) => {
  const {
    cart,
    handleRemoveFromCart,
    handleRemoveItem,
    handleClearCart,
    handleLimiteStock,
  } = useCart();

  const { productos } = useProducts();

  const cartItems = cart;

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const exceededStock = cartItems.some((item) => {
      const product = productos.find((p) => p.id === item.id);
      return product && item.quantity > product.stock;
    });

    if (exceededStock) {
      alert(
        "Algunos productos exceden el stock disponible. Se ajustarán automáticamente."
      );
      handleLimiteStock();
    }
  }, [cartItems, productos, handleLimiteStock]);

  return (
    <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2 style={{ color: "black" }}>
          <i
            style={{ color: "black" }}
            className="fa-solid fa-cart-shopping"
          ></i>{" "}
          Carrito de Compras
        </h2>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>

      <div className="cart-content">
        {cartItems.length === 0 ? (
          <p style={{ color: "red" }}>El carrito está vacío</p>
        ) : (
          <>
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <span>
                      {item.quantity} x {item.name}
                    </span>
                    <span>
                      ${item.price}/un - Total: ${item.quantity * item.price}
                    </span>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    -1
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleRemoveItem(item)}
                  >
                    <i className="fa-solid fa-trash"> </i>
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-total">Total de la compra: ${total}</div>
            <div>
              <button
                className="buy-btn"
                onClick={() => {
                  handleClearCart();
                  toast.info("Compra finalizada!");
                }}
              >
                Finalizar Compra
              </button>
            </div>
            <div>
              <button
                className="delete-btn"
                onClick={() => {
                  handleClearCart();
                  toast.info("Carrito vaciado!");
                }}
              >
                Esvaciar Carrito
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
