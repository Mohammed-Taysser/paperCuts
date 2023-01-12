import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = process.env.REACT_APP_AXIOS_BASE_URL;

axios.interceptors.request.use((config) => {
	config.headers.authorization = Cookies.get('token');
	return config;
});
