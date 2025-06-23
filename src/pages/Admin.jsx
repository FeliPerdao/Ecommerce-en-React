import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import FormularioProducto from "../components/estaticos/FormularioProducto";
import loading from "../assets/loading.gif";
import { AdminContext } from "../context/AdminContext";

const Admin = () => {
  const { productos, urlApi, cargando, fetchProductos } = useProducts(); //El fetchProducts viene como Context para actualizar despues de apretar boton
  const {
    open,
    setOpen,
    productoEditando,
    setProductoEditando,
    agregarProducto,
    editarProducto,
    eliminarProducto,
  } = useContext(AdminContext);

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
          <button
            onClick={() => {
              setOpen(true);
              setProductoEditando(null);
            }}
          >
            Agregar nuevo producto
          </button>
          {open && (
            <FormularioProducto
              onSubmit={productoEditando ? editarProducto : agregarProducto}
              initialData={productoEditando}
              setOpen={setOpen}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Admin;
