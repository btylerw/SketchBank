import { useContext, createContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');
    function handleThemeChange() {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }
    
    return <ThemeContext.Provider value={{ theme, setTheme, handleThemeChange }}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;

export const useTheme = () => {
    return useContext(ThemeContext);
}