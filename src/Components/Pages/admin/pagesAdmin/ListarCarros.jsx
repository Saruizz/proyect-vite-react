import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../../../token/tokenService';
import styles from './ListarCarros.module.css';

const CarList = () => {
	const [users, setUsers] = useState([{ imagenes: [] }]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(
					'http://localhost:8081/vehiculos/listar',
				);
				setUsers(response.data);
			} catch (error) {
				console.error('Error al obtener la lista de carros:', error);
			}
		};

		fetchUsers();
	}, []);

	const handleDelete = vehiculoId => {
		//console.log(vehiculoId);
		const token = getToken();
		const confirmDelete = window.confirm(
			'¿Está seguro de que desea eliminar el vehículo?',
		);
		if (confirmDelete) {
			axios
				.delete(`http://localhost:8081/vehiculos/eliminar/${vehiculoId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(response => {
					// Verificar si la eliminación fue exitosa
					if (response.status === 200) {
						// Eliminar el vehículo de la lista de vehículos (actualiza el estado)
						const updatedVehicles = vehicles.filter(
							vehicle => vehicle.id !== vehiculoId,
						);
						setVehicles(updatedVehicles);
						console.log(
							`Vehículo con id ${vehiculoId} eliminado exitosamente.`,
						);
					} else {
						console.error('Error al eliminar el vehículo:', response.data);
					}
				})
				.catch(error => {
					console.error('Error al eliminar el vehículo:', error);
				});
		}
	};

	return (
		<div className={styles.appListarCarros}>
			<h2>Lista de carros</h2>
			<table>
				<thead>
					<tr>
						<th>Imagen</th>
						<th>Nombre</th>
						<th>ID</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, index) => (
						<tr key={user.id}>
							<td>
								<img
									src={user.imagenes.length > 0 ? user.imagenes[0].url : ''}
									style={{ width: '200px', height: 'auto' }}
								/>
							</td>
							<td>{user.nombre}</td>
							<td>{user.id}</td>
							<td>
								<button onClick={() => handleEdit(user.id)}>
									Editar Carro
								</button>
								<button onClick={() => handleDelete(user.id)}>
									Eliminar Carro
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CarList;
