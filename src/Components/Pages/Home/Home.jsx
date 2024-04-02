import React, { useState } from 'react';
import Busqueda from './Busqueda';
import CategoriasHome from './CategoriasHome';
import Recomendaciones from './Recomendaciones';
import styles from './Home.module.css';
import ResultadosBusqueda from './Cards/ResultadosBusqueda';

const Home = () => {
	const [mostrarResultados, setMostrarResultados] = useState(false);
	const [resultadosBusqueda, setResultadosBusqueda] = useState(null);

	const handleMostrarResultados = () => {
		setMostrarResultados(true);
	};

	const handleResultadosBusqueda = (data) => {
		setResultadosBusqueda(data);
		setMostrarResultados(true); // Mostrar resultados al recibir la data
	  };
	
	  const funciones = {
		handleMostrarResultados: handleMostrarResultados,
		onRealizarBusqueda: handleResultadosBusqueda,
	  };
	return (
		<div className={styles.appHome}>
			<Busqueda funciones={funciones}/>
			{mostrarResultados && <ResultadosBusqueda data={resultadosBusqueda} />}
			<CategoriasHome />
			<Recomendaciones />
		</div>
	);
};

export default Home;
