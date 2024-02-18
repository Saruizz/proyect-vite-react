import imagenes from '../../assets/imagenes';
import styles from './Header.module.css';

const LogoLema = () => {
	return (
		<a href='../../App.jsx' className={styles.logoSection}>
			<img src={imagenes.lemaLogo} />
		</a>
	);
};

export default LogoLema;
