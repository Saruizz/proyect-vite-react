/*
import LogoLema from './LogoLema';
import Buscador from './Buscador';
import Boton from './Botones';
import styles from './Header.module.css';

const Header = () => {
	return (
		<div className={styles.appHeader}>
			<LogoLema />
			<Buscador />
			<Boton />
		</div>
	);
};

export default Header;
*/

import React, { useState } from 'react';
import LogoLema from './LogoLema';
import Buscador from './Buscador';
import styles from './Header.module.css';
import imagenes from '../../assets/imagenes';

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<div
			className={`${styles.appHeader} ${menuOpen ? styles.mobileMenuOpen : ''}`}
		>
			<LogoLema />
			<Buscador />
			<div className={styles.authSection}>
				{/* Renderiza el icono para dispositivos móviles */}
				<div>
					<img
						className={styles.mobileMenuIcon}
						onClick={toggleMenu}
						src={imagenes.Menu}
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

export default Header;
