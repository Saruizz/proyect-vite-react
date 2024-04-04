import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AgregarCategoria.module.css';
import img from '../../../../../assets/img';
import Swal from 'sweetalert2';
import { getToken } from '../../../../token/tokenService';
import { useNavigate } from 'react-router-dom';

const AgregarCategoria = () => {
	const [titulo, setTitulo] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [imagen, setImagen] = useState('');
	const handleGoBack = () => {
		navigate(-1);
	};

	const handleTituloChange = e => {
		setTitulo(e.target.value);
	};

	const handleDescripcionChange = e => {
		setDescripcion(e.target.value);
	};

	const handleImagenChange = e => {
		setImagen(e.target.value);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const playload = {
				titulo: titulo,
				descripcion: descripcion,
				urlImagen: imagen,
			};

			const token = getToken();

			const response = await fetch('http://localhost:8081/categorias/agregar', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(playload),
			});

			if (!response.ok) {
				throw new Error('Error al agregar categoria');
			}

			// Manejar la respuesta exitosa
			Swal.fire('¡Categoria agregada exitosamente!', '', 'success');
			setTitulo('');
			setDescripcion('');
			setImagen('');
		} catch (error) {
			// Manejar el error
			Swal.fire('Error al agregar categoria', error.message, 'error');
		}
	};

	return (
		<div className={styles.categoria}>
			<div className={styles.contTitulo}>
				<img
					className={styles.imgVover}
					src={img.volver}
					alt='Volver'
					onClick={handleGoBack}
				/>
				<h1>Agregar categoría</h1>
			</div>
			
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
						<label htmlFor='imagenes'>Agregar URL</label>
						<input
							type='text'
							id='imagen'
							onChange={handleImagenChange}
							required
						/>
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
