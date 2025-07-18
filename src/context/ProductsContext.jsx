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
  const [isGaleria, setIsGaleria] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  const fetchProductos = async () => {
    //funcion exportada para hacer actualizar despues de apretar un moton que modifica objetos.
    setCargando(true);
    try {
      const respuesta = await fetch(urlApi);
      const datos = await respuesta.json();
      setProductos(datos);
    } catch (err) {
      console.error("Error al cargar los datos:", err);
      setError(true);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (!isGaleria) {
      setSelectedCategories(["promo", "oferta", "premium"]); //Si no está en galería, mostrar todas las categorías
    }
  }, [isGaleria]);

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const productosRenderizados = productos.filter((producto) => {
    const coincideCategoria = isGaleria
      ? selectedCategories.includes(producto.category)
      : true;

    const coincideBusqueda = producto?.name
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });

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
        setIsGaleria,
        urlApi,
        fetchProductos,
        busqueda,
        setBusqueda,
        productosRenderizados,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
