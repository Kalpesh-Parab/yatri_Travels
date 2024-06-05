import { createContext, useEffect, useReducer } from "react"
import DarkModeReducer from "./darkModeReducer";

const INITIAL_STATE = {
    darkMode: false
}

export const DarkModeContext = createContext(INITIAL_STATE)

export const DarkModeContextProvider = ({children}) =>{
    const storedDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    const [state, dispatch] = useReducer(DarkModeReducer, storedDarkMode || INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(state))
    }, [state]);

    return(
        <DarkModeContext.Provider value={{darkMode: state.darkMode, dispatch}}>
            {children}
        </DarkModeContext.Provider>
    )
}