import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './CardHome.module.css';
import { Link } from 'react-router-dom';
import BotonReservas from '../../Reservas/BotonReservas';
import Swal from 'sweetalert2';
import img from '../../../../assets/img';

const CardHome = () => {
	const [carInfo, setCarInfo] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		axios.get('http://localhost:8081/vehiculos/aleatorios').then(res => {
			setCarInfo(res.data.slice(0, 6));
		});
	}, []);

	const addToFavorites = index => {
		const updatedFavorites = [...favorites];
		const car = carInfo[index];

		if (!favorites.includes(car)) {
			updatedFavorites.push(car);
			setFavorites(updatedFavorites);
			// Muestro la alerta de SweetAlert
			Swal.fire({
				icon: 'success',
				title: 'Agregado a favoritos',
				text: 'El vehiculo ha sido agregado a tus favoritos',
			});
		} else {
			const indexToRemove = updatedFavorites.findIndex(fav => fav === car);
			if (indexToRemove !== -1) {
			  updatedFavorites.splice(indexToRemove, 1);
			  setFavorites(updatedFavorites);
			  Swal.fire({
				icon: 'success',
				title: 'Eliminado de favoritos',
				text: 'El vehiculo ha sido eliminado de tus favoritos',
			});
			}}
	};

	const handleCardClick = id => {
		// Redirect to the vehicle's detail page using the id
		// For example, using react-router-dom:
		<Link to={`/vehiculo/${id}`}>
			<div className={styles.btCard}>Ver más</div>
		</Link>;
	};

	return (
		<div className={styles.home}>
			{carInfo.map((carInfo, index) => (
				<div className={styles.card} key={carInfo.id}>
					<span className={styles.datos}>
						<img
							className={styles.automovil}
							src={carInfo.imagenes.length > 0 ? carInfo.imagenes[0].url : ''}
							alt='automovil'
						/>
					</span>
					<span className={styles.datos}>
						<div className={styles.contFavoritos}>
							<button
								className={`${styles.btCardFav} ${favorites.includes(carInfo) ? styles.favorito : ''}`}
								onClick={() => addToFavorites(index)}
							>
								{favorites.includes(carInfo) ? '❤️' : '🖤'}
							</button>
						</div>
						<h2>{carInfo.nombre}</h2> {/*nombre*/}
						<div>
							<div>
								<p className={styles.descripcion}>{carInfo.descripcion}</p>{' '}
								{/*descripcion*/}
							</div>
							<div className={styles.botones}>
								<div className={styles.contLink}>
									<BotonReservas vehiculoId={carInfo.id} />
								</div>
								<div className={styles.contLink}>
									<Link
										to={`/detalle/${carInfo.id}`}
										className={styles.btCard}
										onClick={handleCardClick}
									>
										Ver más
									</Link>
								</div>
							</div>
						</div>
					</span>
				</div>
			))}
		</div>
	);
};

export default CardHome;
