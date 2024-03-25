import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../../../../token/tokenService'; //Importa el servicio de gestión del token JWT
import axios from 'axios';
import styles from './IniciarSesion.module.css';
import img from '../../../../../../assets/img';
import { useAuth } from '../../../../../../AuthContext';

function IniciarSesion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Hook para manejar la navegación
    const { login } = useAuth();
    
    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8081/login', {
                "correoElectronico": email,
                "contrasenia": password
            });

            const token = response.data.token; // Suponiendo que el backend devuelve un objeto con el token
            setToken(token); // Almacena el token en localStorage

            login();
            // Redirigir al usuario a la página de perfil u otra página después de iniciar sesión
            navigate('/perfil');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
        }
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
        </div>
    );
}

export default IniciarSesion;