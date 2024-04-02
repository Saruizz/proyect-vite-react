import styles from './CrearCuenta.module.css';
import img from '../../../../../../assets/img';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrearCuenta = () => {
	const [nombre, setNombre] = useState('');
	const [apellido, setApellido] = useState('');
	const [correoElectronico, setCorreoElectronico] = useState('');
	const [contrasenia, setContrasenia] = useState('');
	const [confirmarContrasenia, setConfirmarContrasenia] = useState('');
	const [errores, setErrores] = useState([]);
	const [passwordConfirmed, setPasswordConfirmed] = useState(false);
	const navigate = useNavigate();

	const expresiones = {
		nombre: /^[a-zA-Záéíóúñ\s]{3,40}$/, // Letras y espacios, mínimo 3 caracteres
		apellido: /^[a-zA-Záéíóúñ\s]{3,40}$/, // Letras y espacios, mínimo 3 caracteres
		correoElectronico: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		contrasenia: /^.{8,20}$/, // Al menos 8 caracteres
	};

	/*
	const isEmailExistent = async email => {
		const response = await axios.get('http://localhost:8081/usuarios/registro');
		return response.data.exists;
	};
	*/

	async function handleSubmit(e) {
		e.preventDefault();
		const erroresValidacion = [];

		if (!expresiones.nombre.test(nombre)) {
			erroresValidacion.push('El nombre no es válido');
		}
		if (!expresiones.apellido.test(apellido)) {
			erroresValidacion.push('El apellido no es válido');
		}
		if (!expresiones.correoElectronico.test(correoElectronico)) {
			erroresValidacion.push('El correo electrónico no es válido');
		}
		if (!expresiones.contrasenia.test(contrasenia)) {
			erroresValidacion.push(
				'La contrasenia debe tener entre 8 y 20 caracteres',
			);
		}
		if (contrasenia !== confirmarContrasenia) {
			erroresValidacion.push('Las contraseñas no coinciden');
		}

		if (erroresValidacion.length > 0) {
			setErrores(erroresValidacion);
			return;
		}

		//ERRORES DE VALIDACION - EMAIL REPETIDO:
		if (!expresiones.correoElectronico.test(correoElectronico)) {
			erroresValidacion.push('El correo electrónico no es válido');
		} /*else {
			const emailExistent = await isEmailExistent(correoElectronico);
			if (emailExistent) {
				erroresValidacion.push('El correo electrónico ya está registrado');
			}
		}*/

		if (erroresValidacion.length > 0) {
			setErrores(erroresValidacion);
		}

		axios
			.post('http://localhost:8081/registro', {
				nombre: nombre,
				apellido: apellido,
				correoElectronico: correoElectronico,
				contrasenia: contrasenia,
			})
			.then(response => {
				console.log('Formulario enviado correctamente');
				console.log(response.data);
				Swal.fire('¡Producto agregado exitosamente!', '', 'success');
				navigate('/'); // Redirigir al usuario a la página de perfil u otra página después de registrar usuario
			})
			.catch(error => {
				console.error('Error al enviar el formulario', error);
				Swal.fire({
					icon: 'error',
					title: 'Error al registrarse',
					text: erroresValidacion.join('\n'),
				});
			});
	}

	return (
		<div className={styles.appCrearUsuario}>
			<img src={img.isoLogoA2} alt='' />

			<form className={styles.contForm} onSubmit={handleSubmit}>
				<div className={styles.contNombreApellido}>
					<div className={styles.contInpNom}>
						<label htmlFor='nombre'>Nombre:</label>
						<input
							type='text'
							id='nombre'
							name='nombre'
							value={nombre}
							onChange={e => {
								setNombre(e.target.value);
							}}
						/>
					</div>
					<div className={styles.contInpApe}>
						<label htmlFor='apellido'>Apellido:</label>
						<input
							type='text'
							id='apellido'
							name='apellido'
							value={apellido}
							onChange={e => {
								setApellido(e.target.value);
							}}
						/>
					</div>
				</div>

				<div className={styles.contInp}>
					<label htmlFor='correoElectronico'>Correo electrónico:</label>
					<input
						type='email'
						id='correoElectronico'
						name='correoElectronico'
						value={correoElectronico}
						onChange={e => {
							setCorreoElectronico(e.target.value);
						}}
					/>
				</div>

				<div className={styles.contInp}>
					<label htmlFor='contrasenia'>Contraseña:</label>
					<input
						type='password'
						id='contrasenia'
						name='contrasenia'
						value={contrasenia}
						onChange={e => {
							setContrasenia(e.target.value);
						}}
					/>
				</div>

				<div className={styles.contInp}>
					<label htmlFor='confirmarContrasenia'>Confirmar contrasenia:</label>
					<input
						type='password'
						id='confirmarContrasenia'
						name='confirmarContrasenia'
						value={confirmarContrasenia}
						onChange={e => {
							setConfirmarContrasenia(e.target.value);
						}}
						disabled={passwordConfirmed}
					/>
				</div>

				<div className={styles.contError}>
					{errores.length > 0 && (
						<ul>
							{errores.map(error => (
								<li key={error}>{error}</li>
							))}
						</ul>
					)}
				</div>

				<button className={styles.btn} type='submit'>
					Crear cuenta
				</button>
			</form>

			<img src={img.isoLogoA2} alt='' />
		</div>
	);
};

export default CrearCuenta;
