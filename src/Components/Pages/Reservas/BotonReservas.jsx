import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import styles from './Reserva.module.css';
import { getToken } from '../../token/tokenService';
import Swal from 'sweetalert2';

const BotonReservas = ({ vehiculoId }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { decodeToken, removeToken } = useAuth();
	// const location = useLocation();

	const handleReservarClick = (e) => {

		const token = getToken();

		if (!token) {
			// localStorage.setItem('redirectPath', location.pathname);
			// Si el usuario no está autenticado, redirigirlo a la página de iniciar sesión
			navigate('/iniciarSesion');
			// Mostrar un mensaje indicando que necesita iniciar sesión
			Swal.fire({
				title: 'Por favor inicia sesión para reservar.',
				icon: 'warning',
				confirmButtonColor: '#43BE32',
				confirmButtonText: 'Aceptar',
			}).then(result => {
				if (result.isConfirmed) {
					// Redirigir al usuario a la página de iniciar sesión si confirma
					navigate('/iniciarSesion');
				}
			});
		} else {
			// Si el usuario está autenticado, redirigirlo a la página de detalle del producto o de reserva cuando este
			navigate(`/reservas/${vehiculoId}`);
			{
				/* queda pendiente cambiarlo a pagina de reservas cuando este lista */
			}
		}
	};

	// Revisar si hay un path de redirección guardado en el localStorage
	// useEffect(() => {
	// 	const token = getToken();
	// 	const redirectPath = localStorage.getItem('redirectPath');
	// 	if (redirectPath && token) {
	// 		// Eliminar el path de redirección guardado en el localStorage
	// 		localStorage.removeItem('redirectPath');
	// 		// Redirigir al usuario a la ubicación previa al iniciar sesión
	// 		navigate(redirectPath);
	// 	}
	// }, [navigate]);

	return (
		<button onClick={handleReservarClick} className={styles.btReservas}>
			Reservar
		</button>
	);
};

export default BotonReservas;
