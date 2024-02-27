import Home from './Components/card/Home';
import Header from './Components/header/Header';
import Footer from './Components/footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {
	


	return (
		
		<div>
			<Header/>
			<Outlet/>
			<Footer/>
		</div>
	);
}
export default App;
