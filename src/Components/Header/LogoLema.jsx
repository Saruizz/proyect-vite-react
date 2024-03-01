import img from '../../assets/img';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const LogoLema = () => {
	return (
		<Link to={'/'} className={styles.logoLink}>
			<img className={styles.logoLema} src={img.logoLemaA} />
		</Link>
	);
};

export default LogoLema;
