import {   createContext, useContext, useState } from "react";

const themeContext = createContext();

export default function ThemeProvider({children}){
    const [theme, setTheme] = useState('dark');

    const handleTheme = () => {
        setTheme( ()=> (theme === "dark" ? "light" : "dark"))
    }

    return(
        <themeContext.Provider value={{theme, handleTheme}}>
            {children}
        </themeContext.Provider> 
    )
}

export const useTheme = () =>  useContext(themeContext); 