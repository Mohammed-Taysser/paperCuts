import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api'|| process.env.REACT_APP_AXIOS_BASE_URL;
axios.defaults.headers.common['authorization'] =
	JSON.parse(localStorage.getItem('token')) || '';

// to prevent multiple call
// let isRefreshed = false;

// send response to refresh invalid token
// axios.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		if (
// 			(error.response.status === 401 || error.response.status === 403) &&
// 			!isRefreshed
// 		) {
// 			await axios.post('/token/refresh').then((response) => {
// 				axios.defaults.headers.common['authorization'] = response.data.token;
// 				localStorage.setItem('token', response.data.token);
// 				isRefreshed = true;
// 				return axios(error.config);
// 			});
// 		}
// 		return error;
// 	}
// );
