import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Detalle.module.css';
import img from '../../../assets/img';
import CalendarioDetalle from './CalendarioDetalle';
import { getToken } from '../../token/tokenService';

const DetalleProducto = () => {
	// Extract the product ID from the URL parameters
	const { id } = useParams();

	// Initialize state variables for product details
	const [vehiculo, setVehiculo] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// Fetch product details using the product ID and set the state
	useEffect(() => {
		const fetchVehiculo = async i => {
			try {
				const response = await axios.get(
					'http://localhost:8081/vehiculos/{id}',
				);
				setVehiculo(response.data);
				setIsLoading(false);
			} catch (error) {
				console.error('Error al obtener la lista de carros:', error);
				setIsLoading(false);
			}
		};

		fetchVehiculo();
		/*
		const token = getToken();
		axios
			.get(`http://localhost:8081/vehiculos/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				setVehiculo(res.data);
				setIsLoading(false);
			})
			.catch(error => {
				console.error(error);
				setIsLoading(false);
			});
			*/
	}, [id]);

	return (
		<div className={styles.appDetalle}>
			{isLoading ? (
				<div className={styles.loading}>Cargando...</div>
			) : (
				<>
					<div className={styles.contNombreCarro}>
						<h2>{vehiculo.nombre}</h2>

						<Link>
							<img src={img.volver} />
						</Link>
					</div>
					<div className={styles.contFotosGeneral}>
						<div className={styles.contFotos}>
							<div className={styles.contFotoPrincipal}>
								<img src='https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-01.jpg?alt=media&token=57d20980-364d-4dc8-884c-776c9daf10ba' />
							</div>
							<div className={styles.contFotosSeg}>
								<div className={styles.fotosSeg}>
									<div className={styles.fotosSegIndividual}>
										<img src='https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-01.jpg?alt=media&token=57d20980-364d-4dc8-884c-776c9daf10ba' />
									</div>
									<div className={styles.fotosSegIndividual}>
										<img src='https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-01.jpg?alt=media&token=57d20980-364d-4dc8-884c-776c9daf10ba' />
									</div>
								</div>
								<div className={styles.fotosSeg}>
									<div className={styles.fotosSegIndividual}>
										<img src='https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-01.jpg?alt=media&token=57d20980-364d-4dc8-884c-776c9daf10ba' />
									</div>
									<div className={styles.fotosSegIndividual}>
										<img src='https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-01.jpg?alt=media&token=57d20980-364d-4dc8-884c-776c9daf10ba' />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.contBtn}>
						<button className={styles.btnVerMas}>Ver más</button>
					</div>
					<div className={styles.contDescripcion}>
						<span>
							Con 2 impresionantes piscinas, una en la terraza y otra al aire
							libre; habitaciones privadas alguEn el corazón de San Telmo,
							disfruta de un albergue inspirado en las pasiones de Buenos Aires.
							Con 2 impresionantes piscinas, una en la terraza y otra al aire
							libre; habitaciones privadas alguEn el corazón de San Telmo,
							disfruta de un albergue inspirado en las pasiones de Buenos Aires.
							Con 2 impresionantes piscinas, una en la terraza y otra al aire
							libre; habitaciones privadas lguEn el corazón de San Telmo,
							disfruta de un albergue inspirado en las pasiones de Buenos Aires.
						</span>
					</div>
					<div className={styles.contCaracteristicas}>
						<div>
							<h3>Características</h3>
						</div>
					</div>
					<div className={styles.contCalendario}>
						<img src={img.calendario} />
						<CalendarioDetalle />
					</div>
				</>
			)}
		</div>
	);
};

export default DetalleProducto;
