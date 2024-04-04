import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AgregarProducto.module.css';
import img from '../../../../../assets/img';
import Swal from 'sweetalert2';
import { getToken } from '../../../../token/tokenService';
import { useNavigate } from 'react-router-dom';

const AgregarProducto = () => {
	const [info, setInfo] = useState('');
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [imagenes, setImagenes] = useState([]);
	const [selectedOption, setSelectedOption] = useState('');
	const [error, setError] = useState('');
  const navigate = useNavigate();
	const handleGoBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		axios.get('http://localhost:8081/vehiculos/listar').then(res => {
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
		setImagenes(e.target.value);
	};

	const handleChange = event => {
		setSelectedOption(event.target.value);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		// Validar que el nombre no esté vacío
		if (!nombre.trim()) {
			setError('El nombre del producto es obligatorio');
			return;
		}

		// Validar que el nombre del producto no exista
		const nombreExistente = info.find(item => item.nombre === nombre);
		if (nombreExistente) {
			setError('El nombre del producto ya está en uso');
			return;
		}

    try {
      const playload = {
        nombre: nombre,
        descripcion: descripcion,
		imagenes:[{
			nombre:nombre,
			url: imagenes
		}],
        categoria: { id: parseInt(selectedOption) }
      };
  
      const token = getToken();
      
      const response = await fetch('http://localhost:8081/vehiculos/agregar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(playload)
      });
  
      if (!response.ok) {
        throw new Error('Error al agregar producto');
      }
  
      // Manejar la respuesta exitosa
      Swal.fire("¡Producto agregado exitosamente!", "", "success");
      setNombre('');
      setDescripcion('');
      setSelectedOption('');
    } catch (error) {
      // Manejar el error
      Swal.fire("Error al agregar producto", error.message, "error");
    }
  };

  return (
    <div className={styles.agregar}>
      <div className={styles.contTitulo}>
				<img
					className={styles.imgVover}
					src={img.volver}
					alt='Volver'
					onClick={handleGoBack}
				/>
        <h1>Agregar Producto</h1>
      </div>
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
          <textarea
            placeholder='Ingresa la descripción del producto'
            id='descripcion'
            value={descripcion}
            onChange={handleDescripcionChange}
            required
            className={styles.descripcion}
          />
          <label>Categoria</label>
          <select value={selectedOption} onChange={handleChange}>
            <option value="">Selecciona una categoría</option>
            <option value="1">Automóvil</option>
            <option value="2">SUV</option>
            <option value="3">VAN</option>
          </select>
        </span>
        <span className={styles.contenedor}>
          <div className={styles.fileInput}>
            <label htmlFor='imagenes'>Agregar URL</label>
            <input
              type='text'
              id='imagenes'
              onChange={handleImagenesChange}
              required
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
