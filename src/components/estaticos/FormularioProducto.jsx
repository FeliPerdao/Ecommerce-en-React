import React, { useState } from "react";

const FormularioProducto = ({ onSubmit, initialData, setOpen }) => {
  const [producto, setProducto] = useState(
    initialData || {
      name: "",
      price: "",
      description: "",
      stock: "",
      img: "/images/blank.jpg",
      category: "oferta",
      detail: "Sin detalles adicionales",
    }
  );
  const [errores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(producto);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <h2>
          {producto.id ? `Editar Producto ${producto.id}` : "Agregar Producto"}
        </h2>
        <button type="button" onClick={() => setOpen(false)}>
          X
        </button>
      </div>
      <div>
        <label>Nombre: </label>
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
        <label>Precio: </label>
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
        <label>Stock: </label>
        <input
          type="number"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
          required
          min="0"
        />
        {errores.stock && <p style={{ color: "red" }}>{errores.stock}</p>}
      </div>
      <div>
        <label>Categoría: </label>
        <select
          name="category"
          value={producto.category}
          onChange={handleChange}
          required
          min="0"
        >
          <option value="" disabled>
            -- Seleccioná una categoría --
          </option>
          <option value="oferta">Oferta</option>
          <option value="promo">Promo</option>
          <option value="premium">Premium</option>
        </select>
        {errores.category && <p style={{ color: "red" }}>{errores.category}</p>}
      </div>
      <div>
        <label>URL de Imagen: </label>
        <input
          type="text"
          name="img"
          value={producto.img}
          onChange={handleChange}
          required
        />
        {errores.img && <p style={{ color: "red" }}>{errores.img}</p>}
      </div>
      <div>
        <label>Descripción: </label>
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
      <button type="submit">
        {producto.id ? "Editar Producto" : "Agregar Producto"}
      </button>
    </form>
  );
};

export default FormularioProducto;
