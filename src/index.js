import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import AuthProvider from './provider/auth.provider';
import reportWebVitals from './__tests__/reportWebVitals';
import './assets/scss/core.paperCuts.scss';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<AuthProvider>
				<App />
			</AuthProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
