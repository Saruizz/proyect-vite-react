import img from '../../../assets/img';
import styles from './Home.module.css';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
import { addDays } from 'date-fns';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const FormularioBusqueda = () => {
	const [open, setOpen] = useState(false);
	const refOne = useRef(null);
	const [placeholderText, setPlaceholderText] = useState(
		'Fecha de entrega - Fecha de devolución',
	);
	const [range, setRange] = useState([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 7),
			key: 'selection',
		},
	]);

	const [categories, setCategories] = useState([
		{ id: 'Automovil', label: 'Automóvil' },
		{ id: 'Suv', label: 'SUV' },
		{ id: 'Van', label: 'Van' },
	]);
	const [modalOpen, setModalOpen] = useState(false);

	const handleRangeChange = newRange => {
		setRange([newRange.selection]);
		setPlaceholderText(
			`${format(newRange.selection.startDate, 'MM/dd/yyyy')} - ${format(
				newRange.selection.endDate,
				'MM/dd/yyyy',
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
				<form className={styles.itemInputBusqueda}>
					<div className={styles.buscador}>
						<button
							type='button'
							className={styles.dropdown}
							onClick={() => setModalOpen(true)}
						>
							Categoría
						</button>

						<input type='text' placeholder='Ej: Kia Picanto' />
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
					<button className={styles.btBusqueda}>Realizar búsqueda</button>
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
