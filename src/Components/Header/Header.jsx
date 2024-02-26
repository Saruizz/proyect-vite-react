import LogoLema from './LogoLema';
import BuscadorHeader from './BuscadorHeader';
import BotonesHeader from './BotonesHeader';
import styles from './Header.module.css';

const Header = () => {
	return (
		<div className={styles.appHeader}>
			<LogoLema />
			<BuscadorHeader />
			<BotonesHeader />
		</div>
	);
};

export default Header;
