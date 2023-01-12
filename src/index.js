import React from 'react';
import ReactDOM from 'react-dom';
import App from './apps/App';
import { ReduxProvider } from './redux/store';
import reportWebVitals from './__tests__/reportWebVitals';
import './apps/axiosClient';
import './assets/scss/papercuts/core.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.render(
	<React.StrictMode>
		<ReduxProvider>
			<App />
		</ReduxProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
