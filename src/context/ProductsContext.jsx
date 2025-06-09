import React, { createContext, useContext, useState, useEffect } from "react";

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  const urlApi = "https://6846f66a7dbda7ee7ab10a0f.mockapi.io/PlaceboAPI";
  const [productos, setProductos] = useState([]);
  const categorias = ["promo", "oferta", "premium"];
  const [selectedCategories, setSelectedCategories] = useState([
    "promo",
    "oferta",
    "premium",
  ]);
  const [isGaleria, setIsGaleria] = useState(false);;
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isGaleria) {
      setSelectedCategories(["promo", "oferta", "premium"]); //Si no está en galería, mostrar todas las categorías
    }
  }, [isGaleria]);

  useEffect(() => {
    fetch(urlApi)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setTimeout(() => {
          setProductos(datos);
          setCargando(false);
        }, 200);
      })
      .catch((err) => {
        console.error("Error al cargar los datos:", err);
        setCargando(false);
        setError(true);
      });
  }, []);

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts  = isGaleria
    ? productos.filter((producto) =>
            selectedCategories.includes(producto.category)
        )
    : productos;

  return (
    <ProductsContext.Provider
      value={{
        productos,
        categorias,
        selectedCategories,
        setSelectedCategories,
        cargando,
        error,
        handleCheckboxChange,
        filteredProducts,
        setIsGaleria,
        urlApi
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
