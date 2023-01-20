import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { initToken } from '../redux/features/auth.slice';
import ErrorBoundary from './ErrorBoundary';
import MainRoute from './routes';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		// remove loading after content load
		window.onload = function () {
			document.body.classList.remove('load');
		};

		dispatch(initToken());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ErrorBoundary>
			<BrowserRouter>
				<MainRoute />
			</BrowserRouter>
		</ErrorBoundary>
	);
}

export default App;
