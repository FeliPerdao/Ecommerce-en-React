import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import FormularioProducto from "../components/estaticos/FormularioProducto";

const Admin = () => {
  const { productos, actualizarProductos, urlApi } = useProducts();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch(urlApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });
      if (!respuesta.ok) {
        throw new Error("Error al agregar producto");
      }
      const data = await respuesta.json();
      alert("Producto agregado correctamente");
    } catch (error) {
      console.log(error.message);
    }
    setOpen(false);
  };

  const eliminarProducto = async (id) => {
    const confirmar = window.confirm("Estás seguro de eliminar el producto?");
    if (confirmar) {
      try {
        const respuesta = await fetch(`${urlApi}/${id}`, {
          method: "DELETE",
        });
        if (!respuesta.ok) throw Error("Error al eliminar");

        alert("Producto eliminado correctamente");
      } catch (error) {
        alert("Hubo un problema al eliminar el producto", error);
      }
    }
  };

  return (
    <div className="container">
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <nav>
            <ul className="nav">
              <li className="navItem">
                <Link to={`/`}>Volver a la Home</Link>
              </li>
              <li className="navItem">
                <a href="/admin">Administrador</a>
              </li>
            </ul>
          </nav>
          <h1>Panel Administrativo</h1>
          <ul className="list">
            {productos.map((product, index) => (
              <li
                key={product.id}
                className="listItem"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="listItemImage"
                />
                <span>{product.name}</span>
                <span>${product.price}</span>
                <div>
                  <button className="editButton">Editar</button>
                  <button
                    className="deleteButton"
                    onClick={() => eliminarProducto(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      <button onClick={() => setOpen(true)}>Agregar nuevo producto</button>
      {open && <FormularioProducto onAgregar={agregarProducto} />}
    </div>
  );
};

export default Admin;
