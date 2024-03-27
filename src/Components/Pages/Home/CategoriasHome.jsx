import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Categorias = () => {
	return (
		<div className={styles.contCategorias}>
			<h2>Categorías</h2>
			<div className={styles.contCentrarCards}>
				<div className={styles.categorias}>
					<Link to={'/'} className={styles.linkCategorias}>
						<div className={styles.contLinkImg}>
							<img src='https://firebasestorage.googleapis.com/v0/b/proyectofdhg1.appspot.com/o/autos%2Fcategorias%2FCategoria%2001%20-Automovil%20.png?alt=media&token=1f253f3b-9b68-4a24-8591-f4cb3c083e49' />
						</div>
						<h3>Automóvil</h3>
					</Link>
					<Link to={'/'} className={styles.linkCategorias}>
						<div className={styles.contLinkImg}>
							<img src='https://firebasestorage.googleapis.com/v0/b/proyectofdhg1.appspot.com/o/autos%2Fcategorias%2FCategoria%2002-SUV.png?alt=media&token=70126642-361d-47b2-a5fe-68a8eea79487' />
						</div>
						<h3>Suv</h3>
					</Link>
					<Link to={'/'} className={styles.linkCategorias}>
						<div className={styles.contLinkImg}>
							<img src='https://firebasestorage.googleapis.com/v0/b/proyectofdhg1.appspot.com/o/autos%2Fcategorias%2FCategoria%2003-VAN.png?alt=media&token=ca363769-cfb6-4e99-9a9f-e57ac5c14e9b' />
						</div>
						<h3>Van</h3>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Categorias;
