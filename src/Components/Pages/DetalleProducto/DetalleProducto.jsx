import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Detalle.module.css';
import img from '../../../assets/img';
import { Calendar } from 'react-calendar'; // Importar librería de calendario
import format from 'date-fns/format';

const DetalleProducto = () => {
	// Extract the product ID from the URL parameters
	const { id } = useParams();

	// Initialize state variables for product details
	const [producto, setProducto] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	const [disponibilidad, setDisponibilidad] = useState([]); // Estado para almacenar la disponibilidad
	const [isLoadingDisponibilidad, setIsLoadingDisponibilidad] = useState(true); // Estado para indicar si se está cargando la disponibilidad
	const [selectedDate, setSelectedDate] = useState(null); // Estado para almacenar la fecha seleccionada

	// Fetch product details using the product ID and set the state
	useEffect(() => {
		axios
			.get(`https://jsonplaceholder.typicode.com/comments/${id}`)
			.then(response => {
				setProducto(response.data);
				setIsLoading(false);
			})
			.catch(error => {
				console.error(error);
				setIsLoading(false);
			});
		axios
			.get(`https://api-placeholder.com/disponibilidad/${id}`) // URL de ejemplo para obtener la disponibilidad
			.then(response => {
				setDisponibilidad(response.data);
				setIsLoadingDisponibilidad(false);
			})
			.catch(error => {
				console.error(error);
				setIsLoadingDisponibilidad(false);
			});
	}, [id]);

	return (
		<div className={styles.appDetalle}>
			{isLoading ? (
				<div className={styles.loading}>Cargando...</div>
			) : (
				<>
					<div className={styles.contNombreCarro}>
						<h2>{producto.nombre}</h2>
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
						<span>{producto.descripcion}</span>
					</div>

					{isLoadingDisponibilidad ? (
						<div className={styles.loading}>Cargando disponibilidad...</div>
					) : (
						<>
							{/* ... Código existente para mostrar el nombre del producto ... */}

							<div className={styles.contCalendario}>
								<h2>Disponibilidad</h2>
								<Calendar
									locale='es'
									defaultDate={new Date()}
									tileClassName={({ date, className }) => {
										// Marcar las fechas ocupadas con un color diferente
										const fechaFormateada = format(date, 'dd/MM/yyyy'); // Formatea la fecha

										if (
											disponibilidad.some(fecha => fecha === fechaFormateada)
										) {
											className += ` ${styles.fechaOcupada}`;
										}

										return className;
									}}
									onSelect={date => setSelectedDate(date)}
								/>
							</div>

							{/* ... Código existente para mostrar el resto del detalle del producto ... */}
						</>
					)}
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
