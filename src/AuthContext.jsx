import React, { createContext, useContext, useState, useEffect } from 'react';
import { decodeToken, removeToken, getToken } from './Components/token/tokenService'; // Asumiendo que tienes una función getToken en tu archivo tokenService

// Crea el contexto de autenticación
export const AuthContext = createContext();

// Exporta el proveedor de autenticación y el hook personalizado
export const AuthProvider = ({ children }) => {
    const [decode, setDecode] = useState(decodeToken());
    const [userData, setUserData] = useState(null);

    // Función para cargar userData desde localStorage si es necesario
    const loadUserDataFromLocalStorage = () => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    };

    // Verificar userData al cargar el componente
    useEffect(() => {
        if (!userData) {
            loadUserDataFromLocalStorage();
        }
    }, []);

    const login = () => {
        // Lógica de inicio de sesión aquí
        setDecode(decodeToken());
    };

    const logout = () => {
        removeToken();
        localStorage.removeItem('userData')
        setDecode(null);
        setUserData(null); // Limpiar userData al cerrar sesión
    };

    const updateUserData = (data) => {
        setUserData(data); // Actualiza el userData con el nuevo valor
        localStorage.setItem('userData', JSON.stringify(data)); // Guardar userData en localStorage
    };

    return (
        <AuthContext.Provider value={{ decode, login, logout, userData, updateUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
