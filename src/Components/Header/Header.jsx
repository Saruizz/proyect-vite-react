import LogoLema from './LogoLema';
import BotonesHeader from './BotonesHeader';
import styles from './Header.module.css';

const Header = () => {
	return (
			<div className={styles.appHeader}>
				<LogoLema />
				<BotonesHeader />
			</div>
	);
};

export default Header;
