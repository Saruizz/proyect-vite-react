import imagenes from '../../assets/imagenes';
import styles from './Footer.module.css';

const Footer = () => {
	return (
		<div className={styles.appFooter}>
			<div className={styles.isoCopy}>
				<img src={imagenes.IsologotipoCuatro} />
				<span className={styles.copyRigth}>©2024 Drive4Life</span>
			</div>
			<div className={styles.contIcons}>
				<img className={styles.iconsFooter} src={imagenes.IconFacebook} />
				<img className={styles.iconsFooter} src={imagenes.IconLinkedin} />
				<img className={styles.iconsFooter} src={imagenes.IconX} />
				<img className={styles.iconsFooter} src={imagenes.IconInstagram} />
			</div>
		</div>
	);
};

export default Footer;
