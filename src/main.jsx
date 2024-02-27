import React from 'react';
import App from './App.jsx';
import "./App.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './Routes/admin/Admin.jsx';
import AgregarProducto from './Routes/admin/AgregarProducto.jsx';
import ListarCarros from './Routes/listadoDeCarros/ListarCarros.jsx';
import Home from './Components/card/Home.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

	
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />}>
					<Route index element ={<Home/>}/>
					<Route path='/home' element ={<Home/>}/>
					<Route path = '/administracion' element = {<Admin/>} />
					<Route path='/agregarProducto' element = {<AgregarProducto/>}/>
					<Route path='/listarCarros' element= {<ListarCarros/>}/>
				</Route>
			</Routes>
		</BrowserRouter>
		
	</React.StrictMode>,
);
