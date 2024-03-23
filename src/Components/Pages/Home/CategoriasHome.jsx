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
							<img src='https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-01.jpg?alt=media&token=57d20980-364d-4dc8-884c-776c9daf10ba' />
						</div>
						<h3>Automóvil</h3>
					</Link>
					<Link to={'/'} className={styles.linkCategorias}>
						<div className={styles.contLinkImg}>
							<img src='https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/01%20Renault%20Stepway-01.jpg?alt=media&token=1ec06e20-326f-4c8f-bce2-0d0856db7716' />
						</div>
						<h3>Suv</h3>
					</Link>
					<Link to={'/'} className={styles.linkCategorias}>
						<div className={styles.contLinkImg}>
							<img src='https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/04%20Chevrolet%20Onix-01.jpg?alt=media&token=f2d5e5ca-db22-4b19-a52d-6145dc63facf' />
						</div>
						<h3>Van</h3>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Categorias;
