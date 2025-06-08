import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import FormularioProducto from "../components/estaticos/FormularioProducto";

const Admin = () => {
  const { productos, actualizarProductos } = useProducts();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const productosGuardados = localStorage.getItem("productos");

    if (!productosGuardados) {
      //En la primera vez se carga desde data.json
      fetch("/data/data.json")
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("productos", JSON.stringify(data));
          actualizarProductos(data);
          setLoading(false);
        })
        .catch((err) => console.error("Error cargando productos:", err));
    } else {
      //Si ya hay algo en localStorage
      actualizarProductos(JSON.parse(productosGuardados));
      setLoading(false);
    }
  }, []);

  const agregarProducto = (nuevoProducto) => {
    const nuevosProductos = [...productos, nuevoProducto];
    localStorage.setItem("productos", JSON.stringify(nuevosProductos));
    actualizarProductos(nuevosProductos);
    setOpen(false);
  };

  const eliminarProducto = (index) => {
    const nuevosProductos = productos.filter((_, i) => i !== index);
    localStorage.setItem("productos", JSON.stringify(nuevosProductos));
    actualizarProductos(nuevosProductos);
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
                    onClick={() => eliminarProducto(index)}
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
