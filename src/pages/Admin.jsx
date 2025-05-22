import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Admin = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ id: null, name: "", price: "" });
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch("/data/data.json")
            .then((response) => response.json())
            .then((data) => {
                setTimeout(() => {
                    setProducts(data);
                    setLoading(false);
                }, 500);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError(true);
                setLoading(false);
            });
    }, []);

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
                    <h1 className="title">Panel Administrativo</h1>
                    <form className="form">
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre del producto"
                            className="input"
                            required
                        />
                        <input
                            type="number"
                            name="price"
                            placeholder="Precio del producto"
                            className="input"
                            required
                        />
                        <button type="submit" className="button">
                            {form.id ? "Editar" : "Crear"}
                        </button>
                    </form>
                    <ul className="list">
                        {products.map((product) => (
                            <li key={product.id} className="listItem">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="listItemImage"
                                />
                                <span>{product.name}</span>
                                <span>${product.price}</span>
                                <div>
                                    <button className="editButton">Editar</button>

                                    <button className="deleteButton">Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default Admin;
