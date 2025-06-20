import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import FormularioProducto from "../components/estaticos/FormularioProducto";
import loading from "../assets/loading.gif";

const Admin = () => {
  const { productos, urlApi, cargando, fetchProductos } = useProducts(); //El fetchProducts viene como Context para actualizar despues de apretar boton
  const [open, setOpen] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch(urlApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto), //Manda el producto en texto plano
      });

      if (!respuesta.ok) {
        throw new Error("Error al agregar producto");
      }
      await respuesta.json();
      alert("Producto agregado correctamente");
      fetchProductos();
    } catch (error) {
      console.log(error.message);
    }
    setOpen(false);
  };

  const editarProducto = async (producto) => {
    try {
      const res = await fetch(`${urlApi}/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto), //Manda el producto en texto plano
      });

      if (!res.ok) throw new Error("Error al editar el producto.");
      
      await res.json();
      alert("Producto editado correctamente");
      fetchProductos();
    } catch (err) {
      console.error(err);
    }
    setProductoEditando(null);
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
        fetchProductos();
      } catch (error) {
        alert("Hubo un problema al eliminar el producto", error);
      }
    }
  };

  return (
    <div className="container">
      {cargando ? (
        <p>
          <img src={loading} alt="loading" />
        </p>
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
            {productos.map((product) => (
              <li
                key={product.id}
                className="listItem"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="listItemImage"
                  style={{ maxWidth: "100px", height: "100%" }}
                />
                <span>{product.name}</span>
                <span>${product.price}</span>
                <div>
                  <button
                    className="editButton"
                    onClick={() => {
                      setProductoEditando(product);
                      setOpen(true);
                    }}
                  >
                    Editar
                  </button>
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
          <button onClick={() => setOpen(true)}>Agregar nuevo producto</button>
          {open && (
            <FormularioProducto
              onSubmit={productoEditando ? editarProducto : agregarProducto}
              initialData={productoEditando}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Admin;
