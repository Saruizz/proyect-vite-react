import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Detalle.module.css';
import img from '../../../assets/img';

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
					El Mazda2, un subcompacto que ha ganado adeptos por su diseño elegante
					y eficiencia en la conducción, ofrece una experiencia única en su
					segmento. Desde el punto de vista estético, el Mazda2 presenta un
					diseño exterior que destaca por su atractiva simplicidad y líneas bien
					definidas. Aunque es un automóvil pequeño, su apariencia transmite un
					aire de sofisticación y dinamismo, con detalles como la parrilla
					frontal y los faros estilizados que siguen la estética KODO de Mazda.
				</span>
				<div>
					<Link className={styles.contFlecha}>
						<img src={img.flecha} />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default DetalleProducto;
