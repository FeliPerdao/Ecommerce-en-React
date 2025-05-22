import React, { useState } from "react";
import './styleProductos.css';
import { Link } from "react-router-dom";


const Productos = ({producto, addToCart}) => {

  const [cantidad, setCantidad] = useState(1);

  const increase = () => setCantidad(prev => (prev < producto.stock ? prev + 1 : prev));
  const decrease = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <section className='card'>
      <div className='imageContainer'>
        <img  src={producto.img} alt="" className='imagen' />
      </div>
      <h3 className='nombre'>{producto.name}</h3>
      <p className='descripcion'>{producto.description}</p>
      <p className='precio'>${producto.price}</p>
      <p className='stock'>stock: {producto.stock}</p>

      <div className='cantidadContainer'>
        <button className='qtyButton' onClick={decrease}>-</button>
        <span> {cantidad} </span>
        <button className='qtyButton' onClick={increase}>+</button>
      </div>

      <button onClick={() => addToCart({...producto, quantity: cantidad})}>Agregar al carrito</button>

      <Link to={`/productos/${producto.id}`}>Ver detalle</Link>

    </section>
  );
};

export default Productos;
