import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import MainRoute from './routes';
import BackToTop from './components/standalone/BackToTop';
import AuthProvider from './provider/auth.provider';

function App() {
	useEffect(() => {
		window.onload = function () {
			document.body.classList.remove('load');
		};
	}, []);

	return (
		<Provider store={store}>
			<AuthProvider>
				<BrowserRouter>
					<Navbar />
					<BackToTop />
					<MainRoute />
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</Provider>
	);
}

export default App;
