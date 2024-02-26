import img from '../../assets/img';
import styles from './Header.module.css';

const BuscadorHeader = () => {
	return <img className={styles.buscadorHeader} src={img.buscadorCompleto} />;
};

export default BuscadorHeader;
