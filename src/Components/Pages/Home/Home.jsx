import React from 'react';
import Busqueda from './Busqueda';
import CategoriasHome from './CategoriasHome';
import Recomendaciones from './Recomendaciones';
import styles from './Home.module.css';

const Home = () => {
	return (
		<div className={styles.appHome}>
			<Busqueda />
			<CategoriasHome />
			<Recomendaciones />
		</div>
	);
};

export default Home;
