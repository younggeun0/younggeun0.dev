import { createContext, useEffect, useState } from "react";
import { themes } from "./themes";

const ThemeContext = createContext<any>({});

const ThemeContextProvider = ({ children }: any) => {
    const [theme, setTheme] = useState<any>(null);

    useEffect(() => {
        if (theme == null) {
            const local = localStorage.getItem("theme");
            setTheme(themes[local as "light" | "dark"] || themes.dark);
            return;
        }

        document.body.dataset.theme = theme.type;
        localStorage.setItem("theme", theme.type);
    }, [theme]);
    
    const toggleTheme = () => {
        if (theme.type === "light") {
            setTheme(themes.dark);
        } else {
            setTheme(themes.light);
        }
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export { ThemeContext, ThemeContextProvider };
