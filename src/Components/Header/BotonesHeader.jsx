import React, { useState } from 'react';
import styles from './Header.module.css';
import imagenes from '../../assets/img';

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
						<button className={styles.btn}>Crear cuenta</button>
						<button className={styles.btn}>Iniciar sesión</button>
					</div>
				) : (
					<div className={styles.authButtons}>
						<button className={styles.btn}>Crear cuenta</button>
						<button className={styles.btn}>Iniciar sesión</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default BotonesHeader;
