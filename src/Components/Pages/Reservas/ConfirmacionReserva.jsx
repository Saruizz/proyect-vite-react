import { Link } from 'react-router-dom';
import styles from './ConfirmacionReserva.module.css';

const ConfirmacionReserva = () => {
	return (
		<div className={styles.appConfReserva}>
			<h1>Reserva confirmada</h1>
			<span>Tu reserva ha sido realizada con éxito</span>
			<p>
				Si crees que hubo algún error o cambiaste de opinión, puedes cancelarla
				a continuación:
			</p>
			<div className={styles.contLinks}>
				<Link className={styles.btnNav} to={'/'}>
					Seguir navegando
				</Link>
				<Link className={styles.btnCancel} to={'/listaReservas'}>
					Cancelar reserva
				</Link>
			</div>
		</div>
	);
};

export default ConfirmacionReserva;
