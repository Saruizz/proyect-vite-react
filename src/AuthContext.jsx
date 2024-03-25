import React, { createContext, useContext, useState } from 'react';
import { decodeToken, removeToken } from './Components/token/tokenService';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [decode, setDecode] = useState(decodeToken());

    const login = () => {
        // Lógica de inicio de sesión aquí
        setDecode(decodeToken());
    };

    const logout = () => {
        removeToken();
        setDecode(null);
        console.log('decode',decode)
    };

    return (
        <AuthContext.Provider value={{ decode, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);