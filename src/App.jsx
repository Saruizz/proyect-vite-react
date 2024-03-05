import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import Home from './Components/Pages/Home/Home.jsx';
import DetalleProducto from './Components/Pages/DetalleProducto/DetalleProducto.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Notfound from './Components/Pages/Notfound/NotFound.jsx';
import CardHome from './Components/Pages/Home/CardHome.jsx';

const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/detalle' element={<DetalleProducto />} />
				<Route path='*' element={<Notfound />} />
				<Route path='/cards' element={<CardHome />} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
