import React from 'react';
import styles from './Politicas.module.css';

const Politicas = () => {
	return (
		<div className={styles.contPoliticas}>
			<h1>Políticas de uso</h1>
			<div className={styles.cont}>
				<div className={styles.politica} >
					<h2>Edad y licencia de conducir</h2>
					<p>
						El usuario que desee reservar en nuestra empresa deberá cumplir con
						una edad mínima de 18 años para alquilar un vehículo y deberá poseer
						una licencia de conducir válida y vigente.
					</p>
				</div>
				<div className={styles.politica}>
					<h2>Seguro y cobertura</h2>
					<p>
						Las políticas de seguros pueden variar, pero generalmente incluyen
						opciones para cobertura básica y adicional. Es importante entender
						qué está cubierto por el seguro y qué no lo está, así como las
						responsabilidades del cliente en caso de daños al vehículo.
					</p>
				</div>
				<div className={styles.politica}>
					<h2>Política de combustible</h2>
					<p>
						Las políticas de combustible pueden incluir la opción de devolver el
						vehículo con el tanque lleno o vacío, con cargos adicionales por no
						cumplir con la política establecida.
					</p>
				</div>
				<div className={styles.politica}>
					<h2>Política de cancelación y modificación</h2>
					<p>
						Establecen las condiciones bajo las cuales se pueden cancelar o
						modificar las reservas, así como los cargos asociados, si los hay.
					</p>
				</div>
				<div className={styles.politica}>
					<h2>Política de devolución tardía</h2>
					<p>
						Los cargos adicionales por devolver el vehículo después de
						la hora acordada son 
					</p>
				</div>
				<div className={styles.politica}>
					<h2>Condiciones de uso del vehículo</h2>
					<p>
						Incluyen las responsabilidades del cliente durante el período de
						alquiler, como mantener el vehículo en buenas condiciones y cumplir
						con las leyes de tránsito.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Politicas;
