import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AgregarProducto.module.css';
import img from '../../../../../assets/img';

//Se realiza form para agregar producto
const AgregarProducto = () => {
	const [info, setInfo] = useState('');
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [imagenes, setImagenes] = useState([]);
	const [error, setError] = useState('');

	useEffect(() => {
		axios.get('https://jsonplaceholder.typicode.com/comments').then(res => {
			setInfo(res.data);
		});
	}, []);

	const handleNombreChange = e => {
		setNombre(e.target.value);
		setError('');
	};

	const handleDescripcionChange = e => {
		setDescripcion(e.target.value);
	};

	const handleImagenesChange = e => {
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
				setImagenes(prevImagenes => [...prevImagenes, ...images]);
			})
			.catch(error => console.error('Error al leer los archivos: ', error));
	};

	const handleSubmit = e => {
		e.preventDefault();

		const nombreExistente = info.find(item => item.name === nombre);
		if (nombreExistente) {
			setError('El nombre ya esta en uso');
			return;
		}

		axios
			.post('https://jsonplaceholder.typicode.com/posts', {
				nombre,
				descripcion,
				imagenes,
			})
			.then(() => {
				alert('Carro agregado exitosamente');
				setNombre('');
				setDescripcion('');
				setImagenes([]);
			})
			.catch(error => console.log('Error al agregar producto: ', error));

		if (imagenes.length > 0) {
			console.log('Imagénes seleccionadas: ', imagenes);
		} else {
			console.log('Ninguna imagen seleccionada');
		}
	};

	return (
		<div className={styles.agregar}>
			<h1>Agregar Producto</h1>
			{error && window.alert(error)}
			<form onSubmit={handleSubmit} className={styles.form}>
				<span className={styles.contenedor}>
					<img src={img.isoLogoB2} width={300} />
				</span>
				<span className={`${styles.contenedor} ${styles.izquierda} `}>
					<label>Nombre</label>
					<input
						type='text'
						placeholder='Ingresa el nombre del producto'
						id='nombre'
						value={nombre}
						onChange={handleNombreChange}
						required
					/>
					<label>Descripción</label>
					//contenedor de categorias
					<input
						type='text'
						placeholder='Ingresa la descripción del producto'
						id='descripcion'
						value={descripcion}
						onChange={handleDescripcionChange}
						required
						className={styles.descripcion}
					/>
				</span>
				<span className={styles.contenedor}>
					<div className={styles.fileInput}>
						{/* <div className={styles.imagenes}>
							{imagenes.map((image, index) => (
								<img
									key={index}
									src={image}
									alt={`Imagen ${index}`}
									width={150}
									height={100}
								/>
							))}
						</div> */}
						<label htmlFor='imagenes'>Subir imagenes</label>
						<input
							type='file'
							id='imagenes'
							onChange={handleImagenesChange}
							multiple
						/>
					</div>
					<button className={styles.btSubmit} type='submit'>
						Agregar
					</button>
				</span>
			</form>
		</div>
	);
};

export default AgregarProducto;
