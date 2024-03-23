import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AgregarCategoria.module.css';
import img from '../../../../../assets/img';
import Swal from 'sweetalert2';

const AgregarCategoria = () => {
	const [categoria, setCategoria] = useState('');
	const [titulo, setTitulo] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [imagen, setImagen] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:8081/categorias/').then(res => {
			setCategoria(res.data);
		});
	}, []);

	const handleTituloChange = e => {
		setTitulo(e.target.value);
	};

	const handleDescripcionChange = e => {
		setDescripcion(e.target.value);
	};

	const handleImagenChange = e => {
		const files = e.target.files;
		const filesArray = Array.from(files);

		Promise.all(
			filesArray.map(file => {
				return new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.onload = () => resolve(reader.result);
					reader.onerror = reject;
					reader.readAsDataURL(file);
				});
			}),
		)
			.then(images => {
				setImagen(prevImagenes => [...prevImagenes, ...images]);
			})
			.catch(error => console.error('Error al leer los archivos: ', error));
	};

	const handleSubmit = e => {
		e.preventDefault();

		axios
			.post('http://localhost:8081/categorias', {
				titulo,
				descripcion,
				imagen,
			})
			.then(() => {
				Swal.fire({
					title: "¡Categoría agregada exitosamente!",
					icon: "success",
					confirmButtonText: 'Aceptar',
					customClass: {
					  confirmButton: styles.botonCategoria,
					},
					buttonsStyling: false,
				  });
				setTitulo('');
				setDescripcion('');
				setImagen([]);
			})
			.catch(error => console.log('Error al agregar categoría: ', error));

		if (imagen.length > 0) {
			console.log('Imagénes seleccionadas: ', imagen);
		} else {
			console.log('Ninguna imagen seleccionada');
		}
	};

	return (
		<div className={styles.categoria}>
			<h1>Agregar categoría</h1>
			<form onSubmit={handleSubmit}>
				<span className={styles.contCategoria}>
					<img src={img.isoLogoB2} width={300} />
				</span>
				<span className={`${styles.contCategoria} ${styles.alinerIzq}`}>
					<label>Título</label>
					<input
						type='text'
						placeholder='Ingresa el título de la categoría'
						id='titulo'
						value={titulo}
						onChange={handleTituloChange}
						required
					/>
					<label>Descripción</label>
					<textarea
						placeholder='Ingresa la descripción de la categoría'
						id='descripcion'
						value={descripcion}
						onChange={handleDescripcionChange}
						required
						className={styles.descripcion}
					/>
				</span>
				<span className={styles.contCategoria}>
					<div className={styles.fileInput}>
						<div className={styles.imagen}>
							{imagen.length > 0 ? (
								<p>{`${imagen.length} imagen${imagen.length !== 1 ? 'es' : ''} seleccionada${imagen.length !== 1 ? 's' : ''}`}</p>
							) : (
								<p>Ninguna imagen seleccionada</p>
							)}
						</div>
						<label htmlFor='imagenes'>Subir imagen</label>
						<input type='file' id='imagenes' onChange={handleImagenChange} />
					</div>
					<button className={styles.buttonSubmit} type='submit'>
						Agregar
					</button>
				</span>
			</form>
		</div>
	);
};

export default AgregarCategoria;
