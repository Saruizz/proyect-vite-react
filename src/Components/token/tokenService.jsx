import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = 'jwtToken';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const removeToken = () => localStorage.removeItem(TOKEN_KEY);

export const decodeToken = () => {
	const token = localStorage.getItem(TOKEN_KEY);
	if (token) {
		try {
			// Decodificar el token
			const decodedToken = jwtDecode(token)
			console.log(decodedToken);
            return decodedToken;
		} catch (error) {
			console.log('decodeToken: ', error.message);
			return null;
		}
	}
};