import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import Home from './Components/Pages/Home/Home.jsx';
import DetalleProducto from './Components/Pages/DetalleProducto/DetalleProducto.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Notfound from './Components/Pages/Notfound/NotFound.jsx';

const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/detalle' element={<DetalleProducto />} />
				<Route path='*' element={<Notfound />} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
