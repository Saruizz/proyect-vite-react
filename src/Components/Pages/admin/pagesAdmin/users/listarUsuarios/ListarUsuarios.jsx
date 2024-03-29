import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ListarUsuarios.module.css';
import { getToken } from '../../../../../token/tokenService';

const ListarUsuarios = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		try {
			const token = getToken();
			axios.get('http://localhost:8081/usuarios/listar', {
                headers: {
                    Authorization: `Bearer ${token}` // Enviar el token en el encabezado de autorización
                }
            }).then(res => {
				const usuariosConPermiso = res.data.map(user => ({...user, permiso: 'Ninguno'}));
				setUsers(usuariosConPermiso);
			});
		} catch (error) {
			console.error('Error al obtener la lista de usuarios:', error);
		}
	}, []);

	
	const handleAgregar = (userId) => { 
		const token = getToken();
		axios.put(`http://localhost:8081/usuarios/permisos/${users.id}`, {
			permiso: 'Administrador'
		}, {
            headers: {
                Authorization: `Bearer ${token}` // Enviar el token en el encabezado de autorización
            }
        }).then(() => {
			// Actualizar el estado local 
			setUsers(prevUsers =>
				prevUsers.map(user =>
					user.id === userId
						? { ...user, permiso: 'Administrador' }
						: user
				)
			);
		}).catch(error => {
			console.error('Error al actualizar los permisos del usuario:', error);
		});
	};

	const handleQuitar = (userId) => {

		axios.put(`http://localhost:8081/usuarios/permisos/${users.id}`, {
			permiso: 'Ninguno'
		}).then(() => {
			setUsers(prevUsers =>
				prevUsers.map(user =>
					user.id === userId
						? { ...user, permiso: 'Ninguno' }
						: user
				)
			);
		}).catch(error => {
			console.error('Error al quitar los permisos del usuario:', error);
		});
	};

	return (
		<div className={styles.usuarios}>
			<h1>Lista de usuarios</h1>
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
								<td>{user.permiso}</td>
								<td className={styles.permiso}>
									<button className = {styles.botonAgregar} 
									onClick={() => handleAgregar(user.id)}>
										Añadir permisos
									</button>
									<button className = {styles.botonQuitar} onClick={() => handleQuitar(user.id)}>
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
