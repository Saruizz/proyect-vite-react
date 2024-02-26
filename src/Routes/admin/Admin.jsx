import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NoDisponible from '../../Components/noDisponible/NoDisponible';

const Admin = () => {

	const [esResponsive, setEsResponsive] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setEsResponsive(true);
			} else {
				setEsResponsive(false);
			}
		};
		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className='admin'>
			{!esResponsive && (
				<>
					<h1>Dashboard</h1>
					<h1>Acciones</h1>
				</>
			)}

			<span className='dash'>
				{esResponsive ? (
					<>
						<NoDisponible />
					</>
				) : (
					<>
						<Link to={`/agregarProducto`}>
							<button className='btDash'>Agregar Carro</button>
						</Link>
						<Link to={`/listarCarros`}>
							<button className='btDash'>Listado de Carros</button>
						</Link>
					</>
				)}
			</span>
		</div>
	);
};

export default Admin;
