import React from 'react';
import styles from '../../Pages/admin/pagesAdmin/noDisponible/NoDisponible.module.css';
import img from '../../../assets/img';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {

	const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div className={styles.notFound}>
			
			<img src={img.isoLogoGris} width={250} />
			<p>Página no disponible </p>
			<p>Visítanos próximamente para encontrarla funcional</p>
			<div className={styles.contNombreCarro}>
				<img
					className={styles.imgVover}
					src={img.volver}
					alt='Volver'
					onClick={handleGoBack}
				/>
			</div>
		</div>
	);
};

export default NotFound;
