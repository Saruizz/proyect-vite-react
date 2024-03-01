import React from 'react';
import Busqueda from './Busqueda';
import Recomendaciones from './Recomendaciones';
import Categorias from './Categorias';
import styles from './Home.module.css';

const Home = () => {
	return (
		<div className={styles.appHome}>
			<Busqueda />
			<Categorias />
			<Recomendaciones />
		</div>
	);
};

export default Home;
