import React, {createContext, useContext, useState} from "react";

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem('auth') || false)

    const checkAuth = () => {
        if (localStorage.getItem('auth') === 'true') {
            setIsAuth(true)
            return true
        }
    }
    const setLogOut = () => {
        setIsAuth(false)
        localStorage.clear()
    }
    const setAuth = () => {
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <AuthContext.Provider value={{
            setAuth,
            checkAuth,
            setLogOut,
            isAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}
