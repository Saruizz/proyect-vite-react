import { useState, useEffect } from 'react';
import { useAuth } from '../../../AuthContext';
import { getToken } from '../../token/tokenService';
import styles from './ListaReservas.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import img from '../../../assets/img';

const ListaReservas = () => {
	const { userData } = useAuth();
	const [reserva, setReserva] = useState([]);
	const token = getToken();

	useEffect(() => {
		const fetchReservas = async () => {
			try {
				if (userData && userData.idUsuario) {
					const response = await axios.get(
						`http://localhost:8081/reservas/usuario/${userData.idUsuario}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						},
					);
					setReserva(
						response.data.map(reserva => ({
							...reserva,
							fechaEntregaFormateada: formatDate(reserva.fechaEntrega),
							fechaDevolucionFormateada: formatDate(reserva.fechaDevolucion),
						})),
					);
					//setReserva(response.data);
				} else {
					console.error('userData is not available yet.');
				}
			} catch (error) {
				console.error('Error al obtener la lista de reservas:', error);
			}
		};

		fetchReservas();
	}, [userData, token]);

	const formatDate = dateString => {
		// Assuming dateString is in a format suitable for parsing (e.g., YYYY-MM-DD)
		const date = new Date(dateString);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
		const year = date.getFullYear();

		return `${day}/${month}/${year}`;
	};

	const handleCancelar = reservaId => {
		const token = getToken();
		const confirmDelete = window.confirm(
			'¿Está seguro de que desea eliminar el vehículo?',
		);
		if (confirmDelete) {
			axios
				.delete(`http://localhost:8081/reservas/eliminar/${reservaId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(response => {
					console.log('Reserva cancela exitosamente');
					window.location.reload();
				})
				.catch(error => {
					console.error('Error al eliminar el vehículo:', error);
				});
		}
	};

	return (
		<div className={styles.appListaReservas}>
			<div className={styles.divTabla}>
				<div className={styles.divh2}>
					<h2>Lista de reservas</h2>
				</div>
				<table className={styles.table}>
					<thead className={styles.trTable}>
						<tr>
							<th>Producto</th>
							<th>Rango de fechas</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{reserva.map(reservaItem => (
							<tr key={reservaItem.id}>
								<td className={styles.nombreList}>
									{reservaItem.vehiculo.nombre}
								</td>
								<td className={styles.fechas}>
									{reservaItem.fechaEntregaFormateada} -
									{reservaItem.fechaDevolucionFormateada}
								</td>
								<td className={styles.contbrn}>
									<button
										className={styles.btnCancel}
										onClick={() => handleCancelar(reservaItem.id)}
									>
										Cancelar Reserva
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ListaReservas;
