import imagenes from '../../assets/img';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className={styles.appFooter}>
			<div className={styles.isoCopy}>
				<img className={styles.isoLogoWidth} src={imagenes.isoLogoA1} />
				<span className={styles.copyRigth}>©2024 Drive4Life</span>
				<span className={styles.copyRigthPhone}>©2024 Drive4Life Booking</span>
			</div>
			{/*
			<div className={styles.contIcons}>
				<Link to={'https://www.facebook.com/'} target='_blank'>
					<img className={styles.iconsFooter} src={imagenes.iconoFacebook} />
				</Link>
				<Link to={'https://www.linkedin.com/'} target='_blank'>
					<img className={styles.iconsFooter} src={imagenes.iconoIn} />
				</Link>
				<Link to={'https://twitter.com/'} target='_blank'>
					<img className={styles.iconsFooter} src={imagenes.iconoX} />
				</Link>
				<Link to={'https://www.instagram.com/'} target='_blank'>
					<img className={styles.iconsFooter} src={imagenes.iconoIg} />
				</Link>
			</div>
			*/}
		</div>
	);
};

export default Footer;
