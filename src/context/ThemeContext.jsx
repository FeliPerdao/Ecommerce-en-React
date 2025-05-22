import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    // Cambia el tema entre "light" y "dark"
    useEffect(() => {
        document.body.className = "";   //Limpia clases anteriores
        document.body.classList.add(theme); // Agrega la clase del tema actual
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => ( prev === "light" ? "dark" : "light"));
    }

    // Proporciona el contexto a los componentes hijos
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};