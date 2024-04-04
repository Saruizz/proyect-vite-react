import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../../../token/tokenService';
import styles from './ListarCarros.module.css';
import { useNavigate } from 'react-router-dom';
import img from '../../../../assets/img';
import Swal from 'sweetalert2';

const CarList = () => {
	const [vehiculos, setVehiculos] = useState([{ imagenes: [] }]);
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(
					'http://localhost:8081/vehiculos/listar',
				);
				setVehiculos(response.data);
			} catch (error) {
				console.error('Error al obtener la lista de carros:', error);
			}
		};

		fetchUsers();
	}, []);


	const handleDelete = (event, vehiculoId) => {
		event.preventDefault();

		Swal.fire({
			icon: 'warning',
			title: '¡Advertencia!',
			text: '¿Está seguro que desea eliminar el vehículo?',
			confirmButtonText: 'Aceptar',
			confirmButtonColor: '#FF0000',
			showCancelButton: true, // Mostrar el botón de cancelar
			cancelButtonText: 'Cancelar',
			cancelButtonColor: '#6c757d',
		}).then(result => {
			if (result.isConfirmed) {
				// Usuario hizo clic en "Aceptar"
				const token = getToken();
				axios
					.delete(`http://localhost:8081/vehiculos/eliminar/${vehiculoId}`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					})
					.then(response => {
						if (response.status === 200) {
							// Eliminar el vehículo de la lista de vehículos (actualiza el estado)
							const updatedVehicles = vehiculos.filter(
								vehiculo => vehiculo.id !== vehiculoId,
							);
							setVehiculos(updatedVehicles);
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
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				// Usuario hizo clic en "Cancelar" o cerró el SweetAlert
				console.log('Eliminación cancelada por el usuario.');
			}
		});
	};

	return (
		<div className={styles.appListarCarros}>
			<div className={styles.contTitulo}>
				<img
					className={styles.imgVover}
					src={img.volver}
					alt='Volver'
					onClick={handleGoBack}
				/>
				<h1>Lista de productos</h1>
			</div>
			<table class={styles.table}>
				<thead>
					<tr class={styles.trTable}>
						<th>ID</th>
						<th>Imagen</th>
						<th>Nombre</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{vehiculos.map((vehiculo, index) => (
						<tr key={vehiculo.id}>
							<td class={styles.nombreId}>{vehiculo.id}</td>
							<td class={styles.nombreImg}>
								<img
									src={
										vehiculo.imagenes.length > 0 ? vehiculo.imagenes[0].url : ''
									}
									style={{ width: '300px', height: 'auto' }}
								/>
							</td>
							<td class={styles.nombreList}>{vehiculo.nombre}</td>

							<td class={styles.botonesListar}>
								<button
									className={styles.editarCarro}
									onClick={() => handleEdit(vehiculo.id)}
								>
									Editar Carro
								</button>
								<button
									className={styles.eliminarCarro}
									onClick={() => handleDelete(event, vehiculo.id)}
								>
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
