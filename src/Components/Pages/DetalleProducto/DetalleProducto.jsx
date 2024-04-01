import styles from './Detalle.module.css';
import img from '../../../assets/img';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetalleProducto = () => {
	const [car, setCar] = useState({imagenes: []});
	const { id } = useParams();

	useEffect(() => {
		axios.get(`http://localhost:8081/vehiculos/detalle/${id}`).then(res => {
			setCar(res.data);
		});
	}, [id]);

	return (
		<div className={styles.appDetalle}>
			<div className={styles.contNombreCarro}>
				<h2>{car.nombre}</h2>
			</div>
			<div className={styles.contFotosGeneral}>
				<div className={styles.contFotos}>
					{car.imagenes.map((imagen, index) => (
						<img key={index} src={imagen.url} alt={`Imagen ${index + 1}`} />
					))}
					
				</div>
			</div>
			<div className={styles.contBtn}>
				<button className={styles.btnVerMas}>Ver más</button>
			</div>
			<div className={styles.contDescripcion}>
				<span>{car.descripcion}</span>
				<div>
					<Link className={styles.contFlecha}>
						<img src={img.volver} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default DetalleProducto;
