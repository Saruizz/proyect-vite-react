import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Detalle.module.css';
import img from '../../../assets/img';
import CalendarioDetalle from './CalendarioDetalle';
import BotonReservas from '../Reservas/BotonReservas';

const DetalleProducto = () => {
	const [car, setCar] = useState({ imagenes: [] });
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		axios.get(`http://localhost:8081/vehiculos/detalle/${id}`).then(res => {
			setCar(res.data);
		});
	}, [id]);

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div className={styles.appDetalle}>
			{/*car.imagenes.map((imagen, index) => (
				<img key={index} src={imagen.url} alt={`Imagen ${index + 1}`} />
			))*/}
			<div className={styles.contNombreCarro}>
				<h2>{car.nombre}</h2>
				<img
					className={styles.imgVover}
					src={img.volver}
					alt='Volver'
					onClick={handleGoBack}
				/>
			</div>
			<div className={styles.contFotosGeneral}>
				<div className={styles.contFotos}>
					<div className={styles.contFotoPrincipal}>
						<img src={car.imagenes.length > 0 ? car.imagenes[0].url : ''} />
					</div>
					<div className={styles.contFotosSeg}>
						<div className={styles.fotosSeg}>
							<div className={styles.fotosSegIndividual}>
								<img src={car.imagenes.length > 0 ? car.imagenes[1].url : ''} />
							</div>
							<div className={styles.fotosSegIndividual}>
								<img src={car.imagenes.length > 0 ? car.imagenes[2].url : ''} />
							</div>
						</div>
						<div className={styles.fotosSeg}>
							<div className={styles.fotosSegIndividual}>
								<img src={car.imagenes.length > 0 ? car.imagenes[3].url : ''} />
							</div>
							<div className={styles.fotosSegIndividual}>
								<img src={car.imagenes.length > 0 ? car.imagenes[4].url : ''} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.contBtn} >
				<div className={styles.contBtn}>
					<BotonReservas/>
				</div>
				<div className={styles.contBtn}>
					<button className={styles.btnVerMas}>Ver más</button>
				</div>
			</div>
			<div className={styles.contDescripcion}>
				<span>{car.descripcion}</span>
			</div>
			<div className={styles.contCaracteristicas}>
				<div>
					<h3>Características</h3>
				</div>
				<ul className={styles.listaCaracteristicas}>
					<li>
						<img src={img.iconoTelevisor} />
						<p>Pantalla</p>
					</li>
					<li>
						<img src={img.iconoMascota} />
						<p>Permitido mascotas</p>
					</li>
					<li>
						<img src={img.aire} />
						<p>Aire acondicionado</p>
					</li>
				</ul>
			</div>
			<div className={styles.contCalendario}>
				<div className={styles.contImgCal}>
					<img src={img.calendario} />
					<h3>Disponibilidad</h3>
				</div>
				<CalendarioDetalle vehiculoId={id} />
			</div>
		</div>
	);
};

export default DetalleProducto;
