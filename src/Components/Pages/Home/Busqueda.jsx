import img from '../../../assets/img';
import styles from './Home.module.css';

const FormularioBusqueda = () => {
	return (
		<div className={styles.contBusqueda}>
			<img src={img.isoLogoC2} />
			<div className={styles.contInputBusqueda}>
				<h2>Busca tu carro ideal aquí</h2>
				<form className={styles.itemInputBusqueda}>
					<input type='text' placeholder='Ej: Kia Picanto' />
					<button>Buscar</button>
				</form>
			</div>
			<img src={img.isoLogoC2} />
		</div>
	);
};

export default FormularioBusqueda;
