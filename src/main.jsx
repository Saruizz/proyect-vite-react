import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../src/AuthContext'; // Importa el AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<AuthProvider> {/* Envuelve App con AuthProvider */}
            <App />
        </AuthProvider>
	</BrowserRouter>,
);
