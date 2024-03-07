import styles from './Detalle.module.css';
import img from '../../../assets/img';
import { Link } from 'react-router-dom';

const DetalleProducto = () => {
	return (
		<div className={styles.appDetalle}>
			<div className={styles.contNombreCarro}>
				<h2>Mazda 2</h2>
			</div>
			<div className={styles.contFotosGeneral}>
				<div className={styles.contFotos}>
					<div className={styles.contFotoPrincipal}>
						<img src='https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-01.jpg?alt=media&token=57d20980-364d-4dc8-884c-776c9daf10ba' />
					</div>
					<div className={styles.contFotosSeg}>
						<div className={styles.fotosSeg}>
							<div className={styles.fotosSegIndividual}>
								<img src='https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-01.jpg?alt=media&token=57d20980-364d-4dc8-884c-776c9daf10ba' />
							</div>
							<div className={styles.fotosSegIndividual}>
								<img src='https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-01.jpg?alt=media&token=57d20980-364d-4dc8-884c-776c9daf10ba' />
							</div>
						</div>
						<div className={styles.fotosSeg}>
							<div className={styles.fotosSegIndividual}>
								<img src='https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-01.jpg?alt=media&token=57d20980-364d-4dc8-884c-776c9daf10ba' />
							</div>
							<div className={styles.fotosSegIndividual}>
								<img src='https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-01.jpg?alt=media&token=57d20980-364d-4dc8-884c-776c9daf10ba' />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.contBtn}>
				<button className={styles.btnVerMas}>Ver más</button>
			</div>
			<div className={styles.contDescripcion}>
				<span>
					fasfsafgsdfgdsf fasfsafgsdfgdsf fasfsafgsdfgdsf fasfsafgsdfgdsf
					fasfsafgsdfgdsf fasfsafgsdfgdsf fasfsafgsdfgdsf fasfsafgsdfgdsf
					fasfsafgsdfgdsf fasfsafgsdfgdsf fasfsafgsdfgdsf fasfsafgsdfgdsf
					fasfsafgsdfgdsf fasfsafgsdfgdsf fasfsafgsdfgdsf fasfsafgsdfgdsf
					fasfsafgsdfgdsf fasfsafgsdfgdsf fasfsafgsdfgdsf{' '}
				</span>
				<div>
					<Link className={styles.contFlecha}>
						<img src={img.volver} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default DetalleProducto;
