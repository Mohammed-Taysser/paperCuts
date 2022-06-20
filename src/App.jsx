import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRoute from './routes';

function App() {
	useEffect(() => {
		window.onload = function () {
			document.body.classList.remove('load');
		};
	}, []);

	return (
		<BrowserRouter>
			<MainRoute />
		</BrowserRouter>
	);
}

export default App;
