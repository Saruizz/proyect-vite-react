import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext';
import { getToken } from '../../token/tokenService';
import axios from 'axios';
import styles from './Reserva.module.css';
import DetalleProducto from '../DetalleProducto/DetalleProducto';
import CalendarioDetalle from '../DetalleProducto/CalendarioDetalle';
import img from '../../../assets/img';

const Reserva = ({ vehiculo = {}, usuario = {} }) => {
	const { decode } = useContext(AuthContext);
	const { id } = useParams();
	const [fecha_entrega, setFechaEntrega] = useState('');
	const [fecha_devolucion, setFechaDevolucion] = useState('');
	const [metodoPago, setMetodoPago] = useState(1);
	const [confirmacion, setConfirmacion] = useState('');
	const [userData, setUserData] = useState(null);
	const token = getToken();
	const [car, setCar] = useState({ imagenes: [] });

	useEffect(() => {
		const fetchData = async () => {
			try {
				const headers = {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				};
				const response = await axios.post(
					'http://localhost:8081/usuarios/correoElectronico',
					{ correoElectronico: decode.email },
					{ headers },
				);
				console.log(response.data);
				setUserData(response.data);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};
		fetchData();
	}, [decode.email, token]);

	useEffect(() => {
		axios.get(`http://localhost:8081/vehiculos/detalle/${id}`).then(res => {
			setCar(res.data);
			console.log(car);
		});
	}, [id]);

	const handleReserva = async e => {
		e.preventDefault();
		try {
			const headers = {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			};

			const response = await axios.post(
				'http://localhost:8081/reservas/registrar',
				{
					vehiculoId: id,
					usuarioId: userData[0].idUsuario,
					fechaEntrega: fecha_entrega,
					fechaDevolucion: fecha_devolucion,
					metodoPago: metodoPago,
					nombre: userData[0].nombre,
					apellido: userData[0].apellido,
					correoElectronico: userData[0].correoElectronico,
					telefono: null, //userData[0].telefono ? userData[0].telefono : 0
				},
				{ headers },
			);
			console.log(response.data);

			if (response.data.success) {
				setConfirmacion('¡Reserva confirmada!');
			} else {
				setConfirmacion('Hubo un error al confirmar la reserva.');
			}
		} catch (error) {
			console.error('Error al realizar la reserva:', error);
			setConfirmacion('Hubo un error al confirmar la reserva.');
		}
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div className={styles.reserva}>
			<h2>Detalle del Vehículo</h2>

			<div className={styles.appDetalle}>
				{/*car.imagenes.map((imagen, index) => (
				<img key={index} src={imagen.url} alt={Imagen ${index + 1}} />
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
									<img
										src={car.imagenes.length > 0 ? car.imagenes[1].url : ''}
									/>
								</div>
								<div className={styles.fotosSegIndividual}>
									<img
										src={car.imagenes.length > 0 ? car.imagenes[2].url : ''}
									/>
								</div>
							</div>
							<div className={styles.fotosSeg}>
								<div className={styles.fotosSegIndividual}>
									<img
										src={car.imagenes.length > 0 ? car.imagenes[3].url : ''}
									/>
								</div>
								<div className={styles.fotosSegIndividual}>
									<img
										src={car.imagenes.length > 0 ? car.imagenes[4].url : ''}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.contBtn}>
					<button className={styles.btnVerMas}>Ver más</button>
				</div>
				<div className={styles.contDescripcion}>
					<span>{car.descripcion}</span>
				</div>
				<div className={styles.contCaracteristicas}>
					<div>
						<h3>Características</h3>
					</div>
				</div>
			</div>

			<h2 className={styles.titulo}>Tu reserva</h2>

			<h2>Datos del Usuario</h2>
			<div className={styles.userReserva}>
				{userData && (
					<>
						<div className={styles.nombre}>
							<span>
								<h3>Nombre</h3>
								<p>{userData[0].nombre}</p>
							</span>
							<span>
								<h3>Apellido</h3>
								<p>{userData[0].apellido}</p>
							</span>
						</div>
						<div>
							<h3>Correo electrónico</h3>
							<p className={styles.p}>{userData[0].correoElectronico}</p>
						</div>
						{/*  <div>
              <h3>Teléfono</h3>
              <p className={styles.p}>{userData[0].telefono}</p>
            </div> */}
					</>
				)}
			</div>

			<form onSubmit={handleReserva}>
				<h2>Seleccionar Fechas</h2>
				{/* */} <CalendarioDetalle vehiculoId={id} />
				<label>Fecha de Entrega:</label>
				<input
					type='date'
					value={fecha_entrega}
					onChange={e => setFechaEntrega(e.target.value)}
				/>
				<br />
				<label>Fecha de Devolución:</label>
				<input
					type='date'
					value={fecha_devolucion}
					onChange={e => {
						setFechaDevolucion(e.target.value);
					}}
				/>
				<br />
				<h2>Elegir Método de Pago</h2>
				<select
					value={metodoPago}
					onChange={e => setMetodoPago(e.target.value)}
				>
					<option value=''>Seleccione un método de pago</option>
					<option value={1}>Tarjeta de Crédito</option>
					<option value={2}>Transferencia Bancaria</option>
				</select>
				<br />
				<button type='submit'>Confirmar Reserva</button>
			</form>

			{confirmacion && <p>{confirmacion}</p>}
		</div>
	);
};

export default Reserva;
