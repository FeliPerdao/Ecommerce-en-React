import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeSetter = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      styke={{
        padding: "10px 20px",
        margin: "20px",
        backgroundColor: theme === "light" ? "#eee" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        border: "1px solid #999",
        borderRadius: "5px",
      }}
    >
      Cambiar a {theme === "light" ? "modo oscuro" : "modo claro"}
    </button>
  );
};
export default ThemeSetter;
