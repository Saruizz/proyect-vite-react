import React, { useState } from 'react';
import styles from './Header.module.css';
import imagenes from '../../assets/img';
import { Link } from 'react-router-dom';

const BotonesHeader = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<div className={menuOpen ? styles.mobileMenuOpen : ''}>
			<div className={styles.authSection}>
				{/* Renderiza el icono para dispositivos móviles */}
				<div>
					<img
						className={styles.mobileMenuIcon}
						onClick={toggleMenu}
						src={imagenes.menu}
					/>
				</div>
				{/* Renderiza los botones o el menú desplegable según la resolución */}
				{menuOpen ? (
					<div className={styles.mobileMenu}>
						<Link className={styles.btn}>Crear cuenta</Link>
						<Link className={styles.btn}>Iniciar sesión</Link>
					</div>
				) : (
					<div className={styles.authButtons}>
						<Link to={'/crearCuenta'} className={styles.btn}>
							Crear cuenta
						</Link>
						<Link to={'/iniciarSesion'} className={styles.btn}>
							Iniciar sesión
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default BotonesHeader;
