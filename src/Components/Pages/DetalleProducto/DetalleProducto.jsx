import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Detalle.module.css';
import img from '../../../assets/img';
import CalendarioDetalle from './CalendarioDetalle';

const DetalleProducto = () => {
	// Extract the product ID from the URL parameters
	const { id } = useParams();

	// Initialize state variables for product details
	const [vehiculo, setVehiculo] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// Fetch product details using the product ID and set the state
	useEffect(() => {
		axios
			.get(`http://localhost:8081/vehiculos/${id}`)
			.then(res => {
				setVehiculo(res.data);
				setIsLoading(false);
			})
			.catch(error => {
				console.error(error);
				setIsLoading(false);
			});
	}, [id]);

	return (
		<div className={styles.appDetalle}>
			{isLoading ? (
				<div className={styles.loading}>Cargando...</div>
			) : (
				<>
					<div className={styles.contNombreCarro}>
						<h2>Kia Picanto</h2>

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
						<div className={styles.contImgCal}>
							<img src={img.calendario} />
							<h3>Disponibilidad</h3>
						</div>
						<CalendarioDetalle />
					</div>
				</>
			)}
		</div>
	);
};

export default DetalleProducto;

/*
import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './Detalle.module.css';
import img from '../../../assets/img';

const DetalleProducto = () => {
	const { id } = useParams(); // Obtiene el ID del parámetro de la URL

	// Simulando la recuperación de datos del producto por ID
	const producto = {
		id: parseInt(id),
		nombre: 'Mazda 2',
		descripcion:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non enim ac quam ullamcorper ullamcorper. Sed at lectus ac orci luctus semper. Sed ac quam ac quam semper. Donec at lectus ac orci luctus semper. Sed ac quam ac quam semper.',
		imagenes: [
			'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-01.jpg?alt=media&token=57d20980-364d-4dc8-884c-776c9daf10ba',
			'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-01.jpg?alt=media&token=57d20980-364d-4dc8-884c-776c9daf10ba',
			'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-01.jpg?alt=media&token=57d20980-364d-4dc8-884c-776c9daf10ba',
		],
	};

	return (
		<div className={styles.appDetalle}>
			<div className={styles.contNombreCarro}>
				<h2>{producto.nombre}</h2>
				<Link to='/'>
					<img src={img.volver} />
				</Link>
			</div>
			<div className={styles.contFotosGeneral}>
				<div className={styles.contFotos}>
					<div className={styles.contFotoPrincipal}>
						<img src={producto.imagenes[0]} />
					</div>
					<div className={styles.contFotosSeg}>
						{producto.imagenes.slice(1).map((imagen, index) => (
							<div className={styles.fotosSegIndividual} key={index}>
								<img src={imagen} />
							</div>
						))}
					</div>
				</div>
			</div>
			<div className={styles.contBtn}>
				<button className={styles.btnVerMas}>Ver más</button>
			</div>
			<div className={styles.contDescripcion}>
				<span>{producto.descripcion}</span>
			</div>
		</div>
	);
};

export default DetalleProducto;
*/
