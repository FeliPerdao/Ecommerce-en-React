import React from "react";
import "./styleCart.css";

const Cart = ({ cartItems, isOpen, onClose, handleRemoveFromCart }) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
    
  return (
    <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2 style={{ color: "black" }}><i style={{ color:'black' }} className='fa-solid fa-cart-shopping'></i> Carrito de Compras</h2>
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
                  <i className="fa-solid fa-trash"></i> -1
                </button>
              </li>
            ))}
          </ul>
            <div className='cart-total'>
              Total de la compra: ${total}
            </div>
            </>
        )}
      </div>
    </div>
  );
};

export default Cart;
