import React from 'react';
import styles from '../noDisponible/NoDisponible.module.css';
import img from '../../../../../assets/img';


const NoDisponible = () => {
	return (
		<div className= {styles.noDisponible}>
			<img src={img.isoLogoGris} width={250} />
			<p>Función de administración no disponible en móviles</p>
		</div>
	);
};

export default NoDisponible;
