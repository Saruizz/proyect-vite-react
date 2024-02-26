import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {

	const imagenesUrls = [

		'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/01%20Renault%20Stepway-01.jpg?alt=media&token=1ec06e20-326f-4c8f-bce2-0d0856db7716',
		'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/02%20Mazda%202-01.jpg?alt=media&token=57d20980-364d-4dc8-884c-776c9daf10ba',
		'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/06-Chevrolet%20Sonic-01.jpg?alt=media&token=5d979822-0c57-4055-9909-494acdd64fe8',
		'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/03%20Mazda%203-01.jpg?alt=media&token=3a0502c7-095c-4f81-9a9f-7fc41e5a91a1',
		'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/04%20Chevrolet%20Onix-01.jpg?alt=media&token=f2d5e5ca-db22-4b19-a52d-6145dc63facf',
		'https://firebasestorage.googleapis.com/v0/b/fotos-14e55.appspot.com/o/05%20Chevrolet%20Optra-01.jpg?alt=media&token=e65933ea-f4da-44ac-870f-ef099718baba',
	]
	const [info, setInfo] = useState([]);

	useEffect(() => {
		axios.get('https://jsonplaceholder.typicode.com/comments').then(res => {
			setInfo(res.data.slice(0, 6));
		});
	}, []);

	return (
		<div className='home'>
			{info.map((info, index) => (
				<div className='card'>
					<span>
						<img
							className='automovil'
							src= {imagenesUrls[index]}
							alt='automovil'
						/>
					</span>
					<span>
						<p>{info.email}</p> {/*categoria*/}
						<h2>{info.name}</h2> {/*nombre*/}
						<span className='iconosCard'>
							<img src='src\Images\Iconos\icono persona.svg' />
							{/*numero de pasajeros*/}
							<p>{info.postId}</p>
							<img src='src\Images\Iconos\Icono puerta.svg' width={25}/>
							{/*numero de puertas*/}
							<p>{info.id}</p>

						</span>
						<p className='descripcion'>{info.body}</p> {/*descripcion*/}
						<button className='btCard'>Ver más</button>
					</span>
				</div>
			))}
		</div>
	);
};

export default Home;
