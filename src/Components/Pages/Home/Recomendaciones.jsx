import styles from './Home.module.css';
import CardHome from '././Cards/CardHome';

const Recomendaciones = () => {
	return (
		<div className={styles.recomendaciones}>
			<h2>Recomendaciones</h2>
			<CardHome />
		</div>
	);
};

export default Recomendaciones;
