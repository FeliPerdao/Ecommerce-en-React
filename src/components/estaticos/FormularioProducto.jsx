import React, { useState } from "react";

const FormularioProducto = ({ onAgregar }) => {
  const [producto, setProducto] = useState({
    name: "",
    price: "",
    description: "",
    stock: 0,
    img: "",
    category: "oferta",
    detail: "Sin detalles adicionales",
  });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAgregar(producto); //usa la función que viene del admin para agregar
    setProducto({
      //retorna a campos vacíos
      name: "",
      price: "",
      description: "",
      stock: 0,
      img: "",
      category: "oferta",
      detail: "Sin detalles adicionales",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={producto.name}
          onChange={handleChange}
          required
        />
        {errores.name && <p style={{ color: "red" }}>{errores.name}</p>}
      </div>
      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="price"
          value={producto.price}
          onChange={handleChange}
          required
          min="0"
        />
        {errores.price && <p style={{ color: "red" }}>{errores.price}</p>}
      </div>
      <div>
        <label>Descripción:</label>
        <input
          type="text"
          name="description"
          value={producto.description}
          onChange={handleChange}
          required
        />
        {errores.description && (
          <p style={{ color: "red" }}>{errores.description}</p>
        )}
      </div>
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default FormularioProducto;
