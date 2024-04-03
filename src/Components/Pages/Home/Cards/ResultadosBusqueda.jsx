import React, {useState}from 'react';
import styles from './CardHome.module.css';
import { Link } from 'react-router-dom';
import BotonReservas from '../../Reservas/BotonReservas';
import Swal from 'sweetalert2';

const ResultadosBusqueda = ({ data }) => {
	const [favorites, setFavorites] = useState([]);
	const handleCardClick = id => {
		// Redirect to the vehicle's detail page using the id
		// For example, using react-router-dom:
		<Link to={`/vehiculo/${id}`}>
			<div className={styles.btCard}>Ver más</div>
		</Link>;
	};
	const addToFavorites = index => {
		const updatedFavorites = [...favorites];
		const car = data[index];

		if (!favorites.includes(car)) {
			updatedFavorites.push(car);
			setFavorites(updatedFavorites);
			// Muestro la alerta de SweetAlert
			Swal.fire({
				icon: 'success',
				title: 'Agregado a favoritos',
				text: 'El vehiculo ha sido agregado a tus favoritos',
			});
		}
	};
	return (
		<div className={styles.contBusquedaResul}>
			<h2>Resultados de Búsqueda: {data.length}</h2>
			{data && (
				<div className={styles.home}>
					{data.map((item, index) => (
						// <li key={item.id}>{item.nombre}</li> // Ejemplo de renderización de items
						<div className={styles.card} key={item.id}>
							<span className={styles.datos}>
								<div className={styles.contLink}>
									<button
										className={styles.btCardFav}
										onClick={() => addToFavorites(index)}
									>
										🖤
									</button>
								</div>
								<img
									className={styles.automovil}
									src={item.imagenes.length > 0 ? item.imagenes[0].url : ''}
									alt='automovil'
								/>
							</span>
							<span className={styles.datos}>
								<h2>{item.nombre}</h2>
								<div>
									<div>
										<p className={styles.descripcion}>{item.descripcion}</p>
									</div>
									<div className={styles.botones}>
										<div className='contLink'>
											<BotonReservas vehiculoId={item.id} />
										</div>
										<div className={styles.contLink}>
											<Link
												to={`/detalle/${item.id}`}
												className={styles.btCard}
												onClick={() => handleCardClick(item.id)}
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
			)}
		</div>
	);
};

export default ResultadosBusqueda;
