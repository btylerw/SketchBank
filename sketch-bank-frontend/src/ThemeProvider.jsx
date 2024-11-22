import { useContext, createContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');
    function handleThemeChange() {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    const siteTheme = {
        'dark': {
            theme: 'dark',
            color: 'white',
            background: 'black',
            placeholdercolor: 'grey',
        },
        'light': {
            theme: 'light',
            color: 'black',
            background: 'white',
            placeholdercolor: 'grey',
        }
    }
    
    return <ThemeContext.Provider value={{ theme, setTheme, handleThemeChange, siteTheme }}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;

export const useTheme = () => {
    return useContext(ThemeContext);
}