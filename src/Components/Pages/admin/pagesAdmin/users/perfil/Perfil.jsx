// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './Perfil.module.css';
// import img from '../../../../../../assets/img';

// const Perfil = () => {
// 	const [user, setUser] = useState('');

// 	useEffect(() => {
// 		axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
// 			setUser(res.data[0]);
// 		});
// 	}, []);

// 	// if (!user) {
// 	//     return null; // Si user es undefined, retornamos null para no renderizar nada
// 	// }

// 	return (
// 		<div className={styles.perfil}>
// 			<h1 className={styles.titulo}>Información personal</h1>
// 			<div className={styles.userPerfil}>
// 				<div>
// 					<img src={img.isoLogoA2} width={200} alt='Logo' />
// 				</div>
// 				<div className={styles.informacion}>
// 					<div className={styles.nombre}>
// 						<span>
// 							<h3>Nombre</h3>
// 							<p>{user.name} </p>
// 						</span>
// 						<span>
// 							<h3>Apellido</h3>
// 							<p>{user.username} </p>
// 						</span>
// 					</div>
// 					<div>
// 						<h3>Correo electrónico</h3>
// 						<p className={styles.p}>{user.email} </p>
// 					</div>
// 					<div>
// 						<h3>Contraseña</h3>
// 						<p className={styles.p}>************* </p>
// 					</div>
// 				</div>
// 				<div>
// 					<img src={img.isoLogoA2} width={200} alt='Logo' />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Perfil;

import React from 'react';
import { useLocation } from 'react-router-dom';
import img from '../../../../../../assets/img';
import styles from './Perfil.module.css'; // Importar los estilos

const Perfil = () => {
    const location = useLocation();
    const { state } = location || {};
    const user = state && state.user;
	
	console.log('Ubicación actual:', location);
    console.log('Usuario en estado:', user);


    return (
        <div className={styles.perfil}>
            <h1 className={styles.titulo}>Información personal</h1>
            <div className={styles.userPerfil}>
                <div>
                    <img src={img.isoLogoA2} width={200} alt='Logo' />
                </div>
                <div className={styles.informacion}>
                    {user && (
                        <>
                            <div className={styles.nombre}>
                                <span>
                                    <h3>Nombre</h3>
                                    <p>{user.nombre}</p>
                                </span>
                                <span>
                                    <h3>Apellido</h3>
                                    <p>{user.apellido}</p>
                                </span>
                            </div>
                            <div>
                                <h3>Correo electrónico</h3>
                                <p className={styles.p}>{user.correoElectronico}</p>
                            </div>
                            <div>
                                <h3>Contraseña</h3>
                                <p className={styles.p}>********</p>
                            </div>
                        </>
                    )}
                </div>
                <div>
                    <img src={img.isoLogoA2} width={200} alt='Logo' />
                </div>
            </div>
            {/* Mostrar avatar con las iniciales del nombre */}
            {user && (
                <div className={styles.avatar}>{`${user.nombre.charAt(0)}${user.apellido.charAt(0)}`}</div>

            )}
        </div>
    );
};

export default Perfil;
