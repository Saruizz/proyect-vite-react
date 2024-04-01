import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import styles from '../Home/Cards/CardHome.module.css';
import { jwtDecode } from "jwt-decode";
import { getToken } from '../../token/tokenService';

const BotonReservas = ({id}) => {
	const navigate = useNavigate();
	const { decodeToken, removeToken } = useAuth();

	const handleReservarClick = () => {
		const token = getToken();

		if (!token) {
			// Si el usuario no está autenticado, redirigirlo a la página de iniciar sesión
			navigate('/iniciarSesion');
			// Mostrar un mensaje indicando que necesita iniciar sesión
			alert('Por favor inicia sesión para reservar.');
		} else {
			// Si el usuario está autenticado, redirigirlo a la página de detalle del producto o de reserva cuando este
        navigate(`/detalle`); {/* queda pendiente cambiarlo a pagina de reservas cuando este lista */}
		}
	};

	return <button onClick={handleReservarClick} className={styles.btCard}>Reservar</button>;
};

export default BotonReservas;
