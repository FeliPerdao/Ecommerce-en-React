import { createContext, useEffect, useState } from "react";
import { useProducts } from "./ProductsContext";
import Swal from "sweetalert2";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
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
      Swal.fire({
        title: ":)",
        text: "Producto agregado correctamente",
        icon: "success",
      });
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
      Swal.fire({
        title: ":)",
        text: "Producto editado correctamente",
        icon: "success",
      });
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

        Swal.fire({
          title: ":)",
          text: "Producto eliminado correctamente",
          icon: "success",
        });
        fetchProductos();
      } catch (error) {
        alert("Hubo un problema al eliminar el producto", error);
      }
    }
  };

  return (
    <AdminContext.Provider
      value={{
        open,
        setOpen,
        productoEditando,
        setProductoEditando,
        agregarProducto,
        editarProducto,
        eliminarProducto,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
