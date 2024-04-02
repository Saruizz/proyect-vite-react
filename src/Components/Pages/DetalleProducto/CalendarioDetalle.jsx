import { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './CalendarioDetalle.css';
import es from 'date-fns/locale/es';
import axios from 'axios';

const CalendarioDetalle = ({ vehiculoId }) => {
	const [fechasOcupadas, setFechasOcupadas] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchFechasOcupadas = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8081/vehiculos/fechasocupadas/${vehiculoId}`,
				);
				const fetchedFechas = response.data;

				const disabledDates = fetchedFechas
					.map(reserva => {
						const { fechaEntrega, fechaDevolucion } = reserva;

						const fechaEntregaDate = new Date(fechaEntrega);
						const endDate = new Date(fechaDevolucion);

						const currentDate = fechaEntregaDate;
						const disabledDays = [];
						while (currentDate <= endDate) {
							disabledDays.push(new Date(currentDate));
							currentDate.setDate(currentDate.getDate() + 1);
						}

						return disabledDays;
					})
					.flat();

				setFechasOcupadas(disabledDates);
				console.log(response);
			} catch (error) {
				console.error('Error fetching occupied dates:', error);
				setError('Ocurrió un error al cargar las fechas ocupadas.');
			}
		};

		fetchFechasOcupadas();
	}, [vehiculoId]); // Re-fetch on vehicle ID change

	const [selectionRange, setSelectionRange] = useState({
		fechaEntregaDate: new Date(),
		endDate: new Date(),
		key: 'selection',
	});

	const [monthsToShow, setMonthsToShow] = useState(
		window.innerWidth <= 768 ? 1 : 2,
	);

	const handleSelect = ranges => {
		setSelectionRange(ranges.selection);
		console.log('Fechas seleccionadas:', ranges.selection); // Mostrar las fechas seleccionadas en la consola
	};

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setMonthsToShow(1);
			} else {
				setMonthsToShow(2);
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className='calendario-container'>
			<div className='calendario-card'>
				{error && <div>Error: {error}</div>}
				<DateRange
					ranges={[selectionRange]}
					onChange={handleSelect}
					rangeColors={['#43BE32']}
					disabledDates={fechasOcupadas}
					showDateDisplay={false}
					months={monthsToShow}
					direction='horizontal'
					locale={es}
					minDate={new Date()}
				/>
				<div className='contFechaOcu'>
					<span>.</span>
					<p>Fecha ocupada</p>
				</div>
			</div>
		</div>
	);
};

export default CalendarioDetalle;
