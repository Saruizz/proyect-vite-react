import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ListarUsuarios.module.css';
import { getToken } from '../../../../../token/tokenService';
import { useNavigate } from 'react-router-dom';
import img from '../../../../../../assets/img';

const ListarUsuarios = () => {
	const [users, setUsers] = useState([]);
	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		try {
			const token = getToken();
			axios
				.get('http://localhost:8081/usuarios/listar', {
					headers: {
						Authorization: `Bearer ${token}`, // Enviar el token en el encabezado de autorización
					},
				})
				.then(res => {
					const usuariosConPermiso = res.data.map(user => ({
						...user,
						administrador:
							user.administrador === 1 ? 'Administrador' : 'Cliente',
					}));
					setUsers(usuariosConPermiso);
				});
		} catch (error) {
			console.error('Error al obtener la lista de usuarios:', error);
		}
	}, []);

	const handleAgregar = userId => {
		const token = getToken();
		axios
			.put(
				`http://localhost:8081/usuarios/permisos/${userId}`,
				{
					administrador: 1,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`, // Enviar el token en el encabezado de autorización
					},
				},
			)
			.then(res => {
				// Actualizar el estado local
				setUsers(usuariosPrevios =>
					usuariosPrevios.map(usuario =>
						usuario.id === userId
							? { ...usuario, administrador: 'Administrador' }
							: usuario,
					),
				);
				window.location.reload();
			})
			.catch(error => {
				console.error('Error al actualizar los permisos del usuario:', error);
			});
	};

	const handleQuitar = userId => {
		const token = getToken();
		axios
			.put(
				`http://localhost:8081/usuarios/permisos/${userId}`,
				{
					administrador: 0,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`, // Enviar el token en el encabezado de autorización
					},
				},
			)
			.then(res => {
				setUsers(prevUsers =>
					prevUsers.map(user =>
						user.id === userId ? { ...user, administrador: 'Cliente' } : user,
					),
				);
				window.location.reload();
			})
			.catch(error => {
				console.error('Error al quitar los permisos del usuario:', error);
			});
	};

	return (
		<div className={styles.usuarios}>
			<div className={styles.contTitulo}>
				<img
					className={styles.imgVover}
					src={img.volver}
					alt='Volver'
					onClick={handleGoBack}
				/>
				<h1>Lista de usuarios</h1>
			</div>
			<table>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Apellido</th>
						<th>Correo electrónico</th>
						<th>Permisos</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr key={user.id}>
							<td>{user.nombre}</td>
							<td>{user.apellido}</td>
							<td>{user.correoElectronico}</td>
							<td>{user.administrador}</td>
							<td className={styles.permiso}>
								<button
									className={styles.botonAgregar}
									onClick={() => handleAgregar(user.idUsuario)}
								>
									Añadir permisos
								</button>
								<button
									className={styles.botonQuitar}
									onClick={() => handleQuitar(user.idUsuario)}
								>
									Quitar permisos
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ListarUsuarios;
