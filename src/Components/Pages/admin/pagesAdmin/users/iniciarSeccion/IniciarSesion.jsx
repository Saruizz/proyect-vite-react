import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './IniciarSesion.module.css';
import img from '../../../../../../assets/img';
import Perfil from '../perfil/Perfil';

function IniciarSesion() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [user, setUser] = useState(null); // Almaceno los datos del usuario
	const navigate = useNavigate(); // Hook para manejar la navegación

	const handleSubmit = async e => {
		e.preventDefault();

		// Valido de email antes de enviar la solicitud
		if (!validateEmail(email)) {
			setError('El correo electrónico no es válido.');
			return;
		}

		try {
			const response = await axios.get(
				`https://jsonplaceholder.typicode.com/users?email=${email}`,
			);
			// console.log('Respuesta de la API:', response.data); // Verifica la respuesta de la API
			const userData = response.data[0]; // Suponiendo que la API devuelve un solo usuario
			// console.log('Datos del usuario:', userData); // Verifica los datos del usuario
			if (userData && userData.email === email) {
				// setUser(userData);
				// console.log('Usuario actualizado:', userData); // Verifica si el usuario se actualiza correctamente
				// console.log(user)
				alert('Has iniciado sesión');
				navigate('/perfil'); // Redirige a la página de perfil
			} else {
				setError('Credenciales incorrectas. Inténtalo de nuevo.');
			}
		} catch (error) {
			console.error('Error al iniciar sesión:', error);
			setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
		}
	};

	// Valido formato del correo electrónico
	const validateEmail = email => {
		const re = /\S+@\S+\.\S+/;
		return re.test(email);
	};

	return (
		<div className={styles.iniciarSesion}>
			<h2 className={styles.titulo}>Iniciar Sesión</h2>
			{error && <p>{error}</p>}
			<div className={styles.login}>
				<div>
					<img src={img.isoLogoA2} width={200} alt='Logo' />
				</div>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.input}>
						<div className={styles.contLabel}>
							<label htmlFor='email'>Correo electrónico</label>
						</div>
						<input
							type='email'
							id='email'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className={styles.input}>
						<div className={styles.contLabel}>
							<label htmlFor='password'>Contraseña</label>
						</div>
						<input
							type='password'
							id='password'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<button className={styles.button} type='submit'>
						Iniciar Sesión
					</button>
				</form>
				<div>
					<img src={img.isoLogoA2} width={200} alt='Logo' />
				</div>
			</div>
			{/* Se pasa los datos del usuario al componente Perfil si existe
            {user && <Perfil user={user} />} */}
		</div>
	);
}

export default IniciarSesion;
