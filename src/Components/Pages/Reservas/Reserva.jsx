import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext';
import { getToken } from '../../token/tokenService';
import axios from 'axios';
// import styles from '../DetalleProducto/Detalle.module.css';
import '../DetalleProducto/CalendarioDetalle.css';
import styles from './Reserva.module.css';
import img from '../../../assets/img';
import DetalleProductoReserva from '../DetalleProducto/DetalleProductoReserva';
import CalendarioReservas from '../Reservas/CalendarioReservas';

const Reserva = ({ vehiculo = {}, usuario = {} }) => {
	const { decode } = useContext(AuthContext);
	const { id } = useParams();
	const [fecha_entrega, setFechaEntrega] = useState(null);
	const [fecha_devolucion, setFechaDevolucion] = useState(null);
	const [metodoPago, setMetodoPago] = useState(1);
	const [confirmacion, setConfirmacion] = useState('');
	const [userData, setUserData] = useState(null);
	const token = getToken();
	const [car, setCar] = useState({ imagenes: [] });
	const [selectedDates, setSelectedDates] = useState(null); // Nuevo estado para almacenar las fechas seleccionadas
	const [range, setRange] = useState({
		fechaEntregaDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	});
	const navigate = useNavigate();
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
					telefono: null,
				},
				{ headers },
			);
			console.log(response.data);

			if (response.data.success) {
				navigate('/confirReserva');
				//setConfirmacion('¡Reserva confirmada!');
			} else {
				//	setConfirmacion('Hubo un error al confirmar la reserva.');
				//setConfirmacion('¡Reserva confirmada!');
				navigate('/confirReserva');
			}

			if (range[0]?.startDate != null && range[0]?.endDate != null) {
				// Obtener el año, mes y día
				const year = range[0].startDate.getFullYear();
				const month = range[0].startDate.getMonth() + 1; // Los meses van de 0 a 11, por lo que sumo 1
				const day = range[0].startDate.getDate();

				// Formatear la fecha en el formato "YYYY-MM-DD"
				const fecha_entrega = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

				const year1 = range[0].endDate.getFullYear();
				const month1 = range[0].endDate.getMonth() + 1;
				const day1 = range[0].endDate.getDate();

				// Formatear la fecha en el formato "YYYY-MM-DD"
				const fecha_devolucion = `${year1}-${month1.toString().padStart(2, '0')}-${day1.toString().padStart(2, '0')}`;
			}
		} catch (error) {
			console.error('Error al realizar la reserva:', error);
			setConfirmacion('Hubo un error al confirmar la reserva.');
		}
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleApplyDates = e => {
		e.preventDefault();

		if (selectedDates) {
			setFechaEntrega(selectedDates.startDate);
			setFechaDevolucion(selectedDates.endDate);
		}
	};

	return (
		<div className={styles.reserva}>
			<div>
				<DetalleProductoReserva />
			</div>

			<div className={styles.tuReservaContainer}>
				<h2 className={styles.titulo2}>Tu reserva</h2>
			</div>
			<br />
			<h2 className={styles.titulo}>Datos del Usuario</h2>
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
						<div className={styles.correo}>
							<h3>Correo electrónico</h3>
							<p className={styles.p}>{userData[0].correoElectronico}</p>
						</div>
					</>
				)}
			</div>

			<form onSubmit={handleReserva}>
				<div className={styles.contCalendario}>
					<div>
						<div>
							<CalendarioReservas
								vehiculoId={id}
								onDatesSelect={({ startDate, endDate }) =>
									setSelectedDates({ startDate, endDate })
								}
							/>
						</div>
						<div className={styles.botonAplicar}>
							<button className={styles.applyButton} onClick={handleApplyDates}>
								Aplicar
							</button>
						</div>
					</div>
					<div className={styles.contImgCal}>
						<h3>Selección de rango de fechas</h3>
						<img src={img.calendario} />
						<div className={styles.contenedorDisponibilidad}>
							<div className={styles.fechas}>
								<label htmlFor='fecha_entrega' className={styles.labelFecha}>
									Recogida
								</label>
								<input
									type='text'
									id='fecha_entrega'
									className={styles.labelFecha}
									value={
										fecha_entrega ? fecha_entrega.toLocaleDateString() : ''
									}
									readOnly
								/>
							</div>
							<div className={styles.fechas}>
								<label
									htmlFor='fecha_devolucion '
									className={styles.labelFecha}
								>
									Devolución
								</label>
								<input
									type='text'
									id='fecha_devolucion '
									className={styles.inputFecha}
									value={
										fecha_devolucion
											? fecha_devolucion.toLocaleDateString()
											: ''
									}
									readOnly
								/>
							</div>
						</div>
					</div>
				</div>

				<div className={styles.radioContainer}>
					<br />
					<h2 className={styles.titulo}>Elegir Método de Pago</h2>
					<br />
					<div className={styles.metodoPagoOptions}>
						<input
							type='radio'
							id='tarjeta'
							name='metodoPago'
							value='1'
							checked={metodoPago === '1'}
							onChange={e => setMetodoPago(e.target.value)}
							className={styles.radioInput}
						/>
						<label className={styles.radioLabel} htmlFor='tarjeta'>
							Tarjeta de Crédito
						</label>
					</div>

					<div className={styles.metodoPagoOptions}>
						<input
							type='radio'
							id='transferencia'
							name='metodoPago'
							value='2'
							checked={metodoPago === '2'}
							onChange={e => setMetodoPago(e.target.value)}
							className={styles.radioInput}
						/>
						<label className={styles.radioLabel} htmlFor='transferencia'>
							Transferencia Bancaria
						</label>
					</div>
				</div>
				<br />
				<button className={styles.btConfirmarReserva} type='submit'>
					Confirmar Reserva
				</button>

				<br />
			</form>

			{confirmacion && <p>{confirmacion}</p>}
		</div>
	);
};

export default Reserva;
