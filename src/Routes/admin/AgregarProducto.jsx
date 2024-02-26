import React, { useEffect, useState } from 'react';
import axios from 'axios';

//Se realiza form para agregar producto
const AgregarProducto = () => {
	const [info, setInfo] = useState('');
	const [categoria, setCategoria] = useState('');
	const [nombre, setNombre] = useState('');
	const [modelo, setModelo] = useState(0);
	const [descripcion, setDescripcion] = useState('');
	const [imagenes, setImagenes] = useState([]);
	const [precio, setPrecio] = useState(0);
	const [puertas, setPuertas] = useState(0);
	const [pasajeros, setPasajeros] = useState(0);
	const [cambios, setCambios] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
			axios.get('https://jsonplaceholder.typicode.com/comments').then(res => {
				setInfo(res.data);
			});
		}, []);

	const handleCategoriaChange = e => {
		setCategoria(e.target.value);
	};

	const handleNombreChange = e => {
		setNombre(e.target.value);
		setError('');
	};

	const handleModeloChange = e => {
		setModelo(e.target.value);
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

	const handlePrecioChange = e => {
		setPrecio(e.target.value);
	};

	const handlePuertasChange = e => {
		setPuertas(e.target.value);
	};

	const handlePasajerosChange = e => {
		setPasajeros(e.target.value);
	};

	const handleCambiosChange = e => {
		setCambios(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();

		const nombreExistente = info.find(item => item.name === nombre);
		if (nombreExistente) {
			setError ('El nombre ya esta en uso');
			return;
		}

		axios.post('https://jsonplaceholder.typicode.com/posts', {
				categoria,
				nombre,
				modelo,
				cambios,
				descripcion,
				imagenes,
				pasajeros,
				puertas,
				precio,
			})
			.then(() => {
				alert('Carro agregado exitosamente');
				setCategoria('');
				setNombre('');
				setModelo(0);
				setDescripcion('');
				setImagenes([]);
				setPrecio(0);
				setPuertas(0);
				setPasajeros(0);
				setCambios('');
			})
			.catch(error => console.log('Error al agregar producto: ', error));


		if (imagenes.length > 0) {
			console.log('Imagénes seleccionadas: ', imagenes);
		} else {
			console.log('Ninguna imagen seleccionada');
		}
	};

	return (
		<div className='agregarCarro'>
			<h1>Agregar Carro</h1>
			{error && window.alert(error)}
			<form onSubmit={handleSubmit} className='form'>
				<span className='columnFlex'>
					<span className='principal'>
						<span className='grupo'>
							<label htmlFor='categoria'>Categoría</label>
							<select
								id='categoria'
								value={categoria}
								onChange={handleCategoriaChange}
							>
								<option value=''>Selecciona la categoria </option>
								<option value='opcion1'>Automovil</option>
								<option value='opcion2'>Suv</option>
								<option value='opcion3'>Van</option>
							</select>
						</span>
						<span className='grupo'>
							<label>Modelo</label>
							<input
								type='number'
								placeholder='Ingresa el modelo del vehículo'
								id='modelo'
								value={modelo}
								onChange={handleModeloChange}
								required
							/>
						</span>

						<span className='grupo'>
							<label htmlFor='cambios'>Tipo de caja</label>
							<select
								id='cambios'
								value={cambios}
								onChange={handleCambiosChange}
							>
								<option value=''>Selecciona la caja de cambios </option>
								<option value='opcion1'>Automatica</option>
								<option value='opcion2'>Manual</option>
							</select>
						</span>

						<span className='grupo'>
							<label>Nombre</label>
							<input
								type='text'
								placeholder='Ingresa el nombre del vehículo'
								id='nombre'
								value={nombre}
								onChange={handleNombreChange}
								required
							/>
						</span>
					</span>
					<label>Precio</label>
					<input
						type='number'
						placeholder='Ingresa el precio del vehículo'
						id='precio'
						value={precio}
						onChange={handlePrecioChange}
						required
					/>
					<label>Descripción</label>
					<input
						type='text'
						placeholder='Ingresa la descripción del vehículo'
						id='descripcion'
						value={descripcion}
						onChange={handleDescripcionChange}
						required
					/>
					<label htmlFor='slider'>
						<img src='src\Images\Iconos\Icono puerta.svg' width={20} />
					</label>
					<input
						type='range'
						min={0}
						max={10}
						value={puertas}
						onChange={handlePuertasChange}
					/>
					<span>{puertas}</span>
					<label htmlFor='slider'>
						<img src='src\Images\Iconos\icono persona.svg' width={20} />
					</label>
					<input
						className='custom-slider'
						type='range'
						min={0}
						max={10}
						value={pasajeros}
						onChange={handlePasajerosChange}
					/>
					<span>{pasajeros}</span>
				</span>
				<span className='columnFlex files'>
					<div className='file-input'>
						<div className='imagenes'>
							{imagenes.map((image, index) => (
								<img
									key={index}
									src={image}
									alt={`Imagen ${index}`}
									width={250}
									height={200}
								/>
							))}
						</div>
						<label htmlFor='imagenes'>
							<img src='src\Images\Iconos\mas.svg' width={40} />
						</label>
						<input
							type='file'
							id='imagenes'
							onChange={handleImagenesChange}
							multiple
						/>
					</div>
					<button className='btSubmit' type='submit'>
						Guardar
					</button>
				</span>
			</form>
		</div>
	);
};

export default AgregarProducto;
