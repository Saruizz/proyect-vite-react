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
						<div className='botones'>
							<span className={styles.dash}>
								<div className={styles.funciones}>
									<Link to={`/agregarProducto`}>
										<button className={styles.btDash}>Agregar producto</button>
									</Link>
									<Link to={`/listarCarros`}>
										<button className={styles.btDash}>
											Lista de productos
										</button>
									</Link>
									<Link to={`/editarProducto`}>
										<button className={styles.btDash}>Editar producto</button>
									</Link>
								</div>
								<div className={styles.funciones}>
									<Link to={`/agregarCategoria`}>
										<button className={`${styles.btDash} ${styles.categoria}`}>
											Agregar categoría
										</button>
									</Link>
									<Link to={`/eliminarCategoria`}>
										<button className={`${styles.btDash} ${styles.categoria}`}>
											Eliminar categoría
										</button>
									</Link>
									<Link to={`/adminCaracteristicas`}>
										<button className={`${styles.btDash} ${styles.categoria}`}>
											Administrar características
										</button>
									</Link>
								</div>
							</span>
							<span className={styles.dash}>
								<Link to={`/listarUsuarios`}>
									<button className={`${styles.btDash} ${styles.usuario}`}>
										Lista de usuarios
									</button>
								</Link>
							</span>
						</div>
						<span className={styles.dash}>
							<img src={img.logoB} width={650} />
						</span>
					</div>
				</>
			)}
		</div>
	);
};

export default Admin;
