import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NoDisponible from './pagesAdmin/noDisponible/NoDisponible';
import styles from './Admin.module.css';
import img from '../../../assets/img';

const Admin = () => {
	const [esResponsive, setEsResponsive] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setEsResponsive(true);
			} else {
				setEsResponsive(false);
			}
		};
		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className={styles.admin}>
			{esResponsive ? (
				<NoDisponible />
			) : (
				<>
					<h1>Administración</h1>
					<div className={styles.contenedor}>
						<span className={styles.dash}>
							<h2>Acciones</h2>
							<Link to={`/agregarProducto`}>
								<button className={styles.btDash}>Agregar producto</button>
							</Link>
							<Link to={`/listarCarros`}>
								<button className={styles.btDash}>Lista de productos</button>
							</Link>
							<Link to={`/editarProducto`}>
								<button className={styles.btDash}>Editar producto</button>
							</Link>
							<Link to={`/agregarCategoria`}>
								<button className={`${styles.btDash} ${styles.categoria}`}>Agregar categoría</button>
							</Link>
							<Link to={`/adminCaracteristicas`}>
								<button className={`${styles.btDash} ${styles.categoria}`}>Administrar características</button>
							</Link>
							<Link to={`/listarUsuarios`}>
								<button className={`${styles.btDash} ${styles.usuario}`}>Lista de usuarios</button>
							</Link>
						</span>
						<span className={styles.dash}>
							<img src={img.logoB} width={800} />
						</span>
					</div>
				</>
			)}
		</div>
	);
};

export default Admin;
