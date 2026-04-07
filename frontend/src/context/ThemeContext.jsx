import { createContext, useContext, useState } from "react";

//createContext() → crée un "conteneur global" qui peut stocker des données accessibles partout dans l'application.
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      {/*rend dark et toggleDark disponibles pour tous les composantsenfants*/}
      {children} {/*toute l'application */}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
