import React, { useState, useEffect } from 'react';
import styles from './CrearCuenta.module.css';
import img from '../../../../../../assets/img';

const CrearCuenta = () => {
	const [nombre, setNombre] = useState('');
	const [apellido, setApellido] = useState('');
	const [correoElectronico, setCorreoElectronico] = useState('');
	const [contraseña, setContraseña] = useState('');
	const [confirmarContraseña, setConfirmarContraseña] = useState('');
	const [errores, setErrores] = useState([]);
	const [formularioValido, setFormularioValido] = useState(false);

	const [nombreValido, setNombreValido] = useState(true);
	const [apellidoValido, setApellidoValido] = useState(true);
	const [correoElectronicoValido, setCorreoElectronicoValido] = useState(true);
	const [contraseñaValida, setContraseñaValida] = useState(true);
	const [confirmarContraseñaValida, setConfirmarContraseñaValida] =
		useState(true);

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

		if (nombre) {
			if (!expresiones.nombre.test(nombre)) {
				erroresValidacion.push('El nombre no es válido');
			}
		}

		if (apellido) {
			if (!expresiones.apellido.test(apellido)) {
				erroresValidacion.push('El apellido no es válido');
			}
		}

		if (correoElectronico) {
			if (!expresiones.correoElectronico.test(correoElectronico)) {
				erroresValidacion.push('El correo electrónico no es válido');
			}
		}

		if (contraseña) {
			if (!expresiones.contraseña.test(contraseña)) {
				erroresValidacion.push(
					'La contraseña debe tener entre 8 y 20 caracteres',
				);
			}
		}

		if (confirmarContraseña) {
			if (contraseña !== confirmarContraseña) {
				erroresValidacion.push('Las contraseñas no coinciden');
			}
		}

		if (erroresValidacion.length > 0) {
			setErrores(erroresValidacion);
			return;
		}

		// Aquí se enviaría la información del formulario al servidor
		console.log('Formulario enviado');
	};

	const handleChangePassword = e => {
		setContraseña(e.target.value);
		const passwordValida = expresiones.contraseña.test(e.target.value);
		setContraseñaValida(passwordValida);
		if (passwordValida) {
			setPasswordConfirmed(true);
		} else {
			setPasswordConfirmed(false);
		}
	};

	useEffect(() => {
		const todosLlenosYValidos =
			nombre &&
			apellido &&
			correoElectronico &&
			contraseña &&
			confirmarContraseña &&
			nombreValido &&
			apellidoValido &&
			correoElectronicoValido &&
			contraseñaValida &&
			confirmarContraseñaValida;

		setFormularioValido(todosLlenosYValidos);
	}, [
		nombre,
		apellido,
		correoElectronico,
		contraseña,
		confirmarContraseña,
		nombreValido,
		apellidoValido,
		correoElectronicoValido,
		contraseñaValida,
		confirmarContraseñaValida,
	]);

	return (
		<div className={styles.appCrearUsuario}>
			<img src={img.isoLogoA2} alt='' />

			<form className={styles.contForm} onSubmit={handleSubmit}>
				<h1>Crear cuenta</h1>
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
								const nombreValido = expresiones.nombre.test(e.target.value);
								setNombreValido(nombreValido);
							}}
						/>
						{nombre && !nombreValido ? (
							<span className={styles.error}>
								Invalido: el nombre debe tener mas de 2 caracteres
							</span>
						) : null}
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
								const apellidoValido = expresiones.apellido.test(
									e.target.value,
								);
								setApellidoValido(apellidoValido);
							}}
						/>
						{apellido && !apellidoValido ? (
							<span className={styles.error}>
								Invalido: el apellido debe tener mas de 2 caracteres
							</span>
						) : null}
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
							const correoElectronicoValido =
								expresiones.correoElectronico.test(e.target.value);
							setCorreoElectronicoValido(correoElectronicoValido);
						}}
					/>
					{correoElectronico && !correoElectronicoValido ? (
						<span className={styles.error}>Correo electrónico invalido</span>
					) : null}
				</div>

				<div className={styles.contInp}>
					<label htmlFor='contraseña'>Contraseña:</label>
					<input
						type='password'
						id='contraseña'
						name='contraseña'
						value={contraseña}
						onChange={handleChangePassword}
					/>
					{contraseña && !contraseñaValida ? (
						<span className={styles.error}>
							Invalido: la contraseña debe tener mas de 6 caracteres
						</span>
					) : null}
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
							const confirmarContraseñaValida = contraseña === e.target.value;
							setConfirmarContraseñaValida(confirmarContraseñaValida);
						}}
						disabled={!passwordConfirmed}
					/>
					{confirmarContraseña && !confirmarContraseñaValida ? (
						<span className={styles.error}>
							Invalido: las contraseñas nos coinciden
						</span>
					) : null}
				</div>

				<button
					className={styles.btn}
					type='submit'
					disabled={!formularioValido}
				>
					Crear cuenta
				</button>
			</form>

			<img src={img.isoLogoA2} alt='' />
		</div>
	);
};

export default CrearCuenta;
