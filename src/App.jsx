import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header.jsx';
import Home from './Components/Pages/Home/Home.jsx';
import DetalleProducto from './Components/Pages/DetalleProducto/DetalleProducto.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Notfound from './Components/Pages/Notfound/NotFound.jsx';
import CrearCuenta from './Components/Pages/admin/pagesAdmin/users/crearCuenta/CrearCuenta.jsx';

import Admin from './Components/Pages/admin/Admin.jsx';
import AgregarProducto from './Components/Pages/admin/pagesAdmin/agregarProducto/AgregarProducto.jsx';
import ListarCarros from './Components/Pages/admin/pagesAdmin/ListarCarros.jsx';
import ListarUsuarios from './Components/Pages/admin/pagesAdmin/users/listarUsuarios/ListarUsuarios.jsx';
import AgregarCategoria from './Components/Pages/admin/pagesAdmin/categorias/AgregarCategoria.jsx';
import Perfil from './Components/Pages/admin/pagesAdmin/users/perfil/Perfil.jsx';
import IniciarSesion from './Components/Pages/admin/pagesAdmin/users/iniciarSesion/IniciarSesion.jsx';
import Politicas from './Components/Pages/politicas/Politicas.jsx';

const App = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='*' element={<Notfound />} />
				<Route path='/detalle/:productId' element={<DetalleProducto />} />
				<Route path='/crearCuenta' element={<CrearCuenta />} />
				<Route path='/administracion' element={<Admin />} />
				<Route path='/agregarProducto' element={<AgregarProducto />} />
				<Route path='/listarCarros' element={<ListarCarros />} />
				<Route path='/listarUsuarios' element={<ListarUsuarios />} />
				<Route path='/agregarCategoria' element={<AgregarCategoria />} />
				<Route path='/perfil' element={<Perfil />} />
				<Route path='/iniciarSesion' element={<IniciarSesion />} />
				<Route path='/politicas' element={<Politicas/>} />
			</Routes>
			<Footer />
		</>
	);
};

export default App;
