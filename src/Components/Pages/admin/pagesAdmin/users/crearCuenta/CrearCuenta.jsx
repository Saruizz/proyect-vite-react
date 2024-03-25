import styles from './CrearCuenta.module.css';
import img from '../../../../../../assets/img';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const CrearCuenta = () => {
	const [nombre, setNombre] = useState('');
	const [apellido, setApellido] = useState('');
	const [correoElectronico, setCorreoElectronico] = useState('');
	const [contraseña, setContraseña] = useState('');
	const [confirmarContraseña, setConfirmarContraseña] = useState('');
	const [errores, setErrores] = useState([]);
	const [passwordConfirmed, setPasswordConfirmed] = useState(false);

	const expresiones = {
		nombre: /^[a-zA-Záéíóúñ\s]{3,40}$/, // Letras y espacios, mínimo 3 caracteres
		apellido: /^[a-zA-Záéíóúñ\s]{3,40}$/, // Letras y espacios, mínimo 3 caracteres
		correoElectronico: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		contraseña: /^.{8,20}$/, // Al menos 8 caracteres
	};

	const handleSubmit = e => {
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
		if (!expresiones.contraseña.test(contraseña)) {
			erroresValidacion.push(
				'La contraseña debe tener entre 8 y 20 caracteres',
			);
		}
		if (contraseña !== confirmarContraseña) {
			erroresValidacion.push('Las contraseñas no coinciden');
		}

		if (erroresValidacion.length > 0) {
			setErrores(erroresValidacion);
			return;
		}

		// Aquí se enviaría la información del formulario al servidor
		const formData = new FormData();
		formData.append('nombre', nombre);
		formData.append('apellido', apellido);
		formData.append('correoElectronico', correoElectronico);
		formData.append('contraseña', contraseña);
		formData.append('confirmarContraseña', confirmarContraseña);

		axios
			.post('http://localhost:8081/usuarios', formData)
			.then(response => {
				console.log('Formulario enviado correctamente');
				console.log(response.data);
				Swal.fire('¡Producto agregado exitosamente!', '', 'success');
				setNombre('');
				setApellido('');
				setCorreoElectronico('');
				setContraseña('');
				setConfirmarContraseña('');
			})
			.catch(error => {
				console.error('Error al enviar el formulario', error);
			});
	};

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
					<label htmlFor='contraseña'>Contraseña:</label>
					<input
						type='password'
						id='contraseña'
						name='contraseña'
						value={contraseña}
						onChange={e => {
							setContraseña(e.target.value);
						}}
					/>
				</div>

				<div className={styles.contInp}>
					<label htmlFor='confirmarContraseña'>Confirmar contraseña:</label>
					<input
						type='password'
						id='confirmarContraseña'
						name='confirmarContraseña'
						value={confirmarContraseña}
						onChange={e => {
							setConfirmarContraseña(e.target.value);
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
