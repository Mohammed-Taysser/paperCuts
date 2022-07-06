import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { initTokenFeature } from './redux/features/auth.slice';
import MainRoute from './routes/routes';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		// remove loading after content load
		window.onload = function () {
			document.body.classList.remove('load');
		};

		dispatch(initTokenFeature());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<BrowserRouter>
			<MainRoute />
		</BrowserRouter>
	);
}

export default App;
