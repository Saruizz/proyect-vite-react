import img from '../../../assets/img';
import styles from './Home.module.css';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { addDays } from 'date-fns';
import es from 'date-fns/locale/es';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import axios from 'axios';

const FormularioBusqueda = () => {
	// const [vehiculos, setVehiculos] = useState([]);
	const [open, setOpen] = useState(false);
	const refOne = useRef(null);
	const [placeholderText, setPlaceholderText] = useState(
		'Fecha de entrega - Fecha de devolución',
	);
	const [range, setRange] = useState([
		{
			// startDate: format ([], 'yyyy-MM-dd'),
			// endDate: format ([], 'yyyy-MM-dd'),
			key: 'selection',
		},
	]);

	const [categories, setCategories] = useState([
		{ id: 1, label: 'Automóvil' },
		{ id: 2, label: 'SUV' },
		{ id: 3, label: 'Van' },
	]);

	const [modalOpen, setModalOpen] = useState(false);
	const [consulta, setConsulta] = useState('');

	const handleConsultaChange = e => {
		setConsulta(e.target.value);
	};

	const handleRangeChange = newRange => {
		setRange([newRange.selection]);
		setPlaceholderText(
			`${format(newRange.selection.startDate, 'yyyy-MM-dd')} - ${format(
				newRange.selection.endDate,
				'yyyy-MM-dd',
			)}`,
		);
	};

	const handleCheckboxChange = id => {
		setCategories(prevCategories =>
			prevCategories.map(opcion =>
				opcion.id === id ? { ...opcion, checked: !opcion.checked } : opcion,
			),
		);
	};

	const handleSubmit = async e => {
		// Enviar la búsqueda al backend

		e.preventDefault();
		const payload = {};

		console.log(range);
		const categoria = [];
		if (
			categories[0].checked ||
			categories[1].checked ||
			categories[2].checked
		) {
			for (let i = 0; i < categories.length; i++) {
				if (categories[i].checked) {
					categoria.push(categories[i].id);
				}
			}
			payload.categoria = categoria
		}

		if (range[0]?.startDate != null && range[0]?.endDate != null) {
			// Obtener el año, mes y día
			const year = range[0].startDate.getFullYear();
			const month = range[0].startDate.getMonth() + 1; // Los meses van de 0 a 11, por lo que necesitas sumar 1
			const day = range[0].startDate.getDate();

			// Formatear la fecha en el formato "YYYY-MM-DD"
			const fechaInicial = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

			const year1 = range[0].endDate.getFullYear();
			const month1 = range[0].endDate.getMonth() + 1; // Los meses van de 0 a 11, por lo que necesitas sumar 1
			const day1 = range[0].endDate.getDate();

			// Formatear la fecha en el formato "YYYY-MM-DD"
			const fechaFinal = `${year1}-${month1.toString().padStart(2, '0')}-${day1.toString().padStart(2, '0')}`;
		
			payload.fechaInicial = fechaInicial;
			payload.fechaFinal = fechaFinal;
		}

		if(consulta != ''){
			payload.consulta = consulta;
		}
		

		console.log(payload);

		try {
			const response = await fetch('http://localhost:8081/vehiculos/busqueda', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			console.log(response);
			if (!response.ok) {
				throw new Error(`Error en la solicitud: ${response.status}`);
			}

			const data = await response.json();
			// console.log(data);
		} catch (error) {
			console.error('Error al realizar la búsqueda:', error);
		}
	};

	return (
		<div className={styles.contBusqueda}>
			<img src={img.isoLogoC2} />
			<div className={styles.contInputBusqueda}>
				<h2>Busca tu carro ideal aquí</h2>
				<p>
					Drive 4 Life es el sitio perfecto para encontrar los mejores autos en
					un solo lugar. No solo te ofrecemos una amplia selección de vehículos,
					sino que también te invitamos a ser parte de un movimiento más grande:
					cuidar el medio ambiente. Al elegir un automóvil con nosotros, estás
					contribuyendo a un futuro más sostenible y responsable.{' '}
				</p>
				<form className={styles.itemInputBusqueda} onSubmit={handleSubmit}>
					<div className={styles.buscador}>
						<button
							type='button'
							className={styles.dropdown}
							onClick={() => setModalOpen(true)}
						>
							Categoría
						</button>
						<input
							type='text'
							placeholder='Ej: Kia Picanto'
							value={consulta}
							onChange={handleConsultaChange}
						/>
						<input
							value={placeholderText}
							readOnly
							onClick={() => setOpen(open => !open)}
						/>
						<div ref={refOne}>
							{open && (
								<>
									<DateRange
										onChange={handleRangeChange}
										editableDateInputs={true}
										moveRangeOnFirstSelection={false}
										ranges={range}
										months={2}
										direction='horizontal'
										className={styles.calendarElement}
									/>
									<button
										className={styles.applyButton}
										onClick={() => {
											setOpen(false); // Esto cerrará el calendario después de aplicar las fechas
										}}
									>
										Aplicar
									</button>
								</>
							)}
						</div>
					</div>
					<button className={styles.btBusqueda} type='submit'>
						Realizar búsqueda
					</button>
				</form>
			</div>
			<img src={img.isoLogoC2} />

			{modalOpen && (
				<div className={styles.modalCategorias}>
					<div className={styles.modalContentCategorias}>
						<span className={styles.close} onClick={() => setModalOpen(false)}>
							&times;
						</span>
						<div className={styles.checkboxContainer}>
							{categories.map(opcion => (
								<div key={opcion.id} className={styles.checkboxItem}>
									<input
										type='checkbox'
										className={styles.checkbox}
										checked={opcion.checked}
										onChange={() => handleCheckboxChange(opcion.id)}
									/>
									{opcion.label}
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default FormularioBusqueda;
