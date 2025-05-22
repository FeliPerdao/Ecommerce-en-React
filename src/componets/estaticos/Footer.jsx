import React, { useContext } from 'react'
import './styleEstatico.css'
import { ThemeContext } from '../../context/ThemeContext'


const Footer = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <footer className={theme}>
      <p>&copy; 2025 - Mi Tienda Online</p>
    </footer>
  )
}

export default Footer
