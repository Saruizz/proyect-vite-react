import React, { createContext, useContext, useState } from 'react';
import { decodeToken, removeToken } from './Components/token/tokenService';

// Crea el contexto de autenticación
export const AuthContext = createContext();

// Exporta el proveedor de autenticación y el hook personalizado
export const AuthProvider = ({ children }) => {
    const [decode, setDecode] = useState(decodeToken());
    const [userData, setUserData] = useState(null);

    const login = () => {
        // Lógica de inicio de sesión aquí
        setDecode(decodeToken());
    };

    const logout = () => {
        removeToken();
        setDecode(null);
        console.log('decode', decode);
    };

    const updateUserData = (data) => {
        setUserData(data); // Actualiza el userData con el nuevo valor
    };
    return (
        <AuthContext.Provider value={{ decode, login, logout, userData, updateUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
