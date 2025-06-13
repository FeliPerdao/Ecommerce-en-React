import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./styleEstatico.css";

const ThemeSetter = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`buttons ${theme}`}

    >
      Cambiar a {theme === "light" ? "modo oscuro" : "modo claro"}
    </button>
  );
};
export default ThemeSetter;
