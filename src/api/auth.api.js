import axios from 'axios';

function register(data) {
	return axios.post(`/auth/register`, data);
}

function login(data) {
	return axios.post(`/auth/login`, data);
}

function adminLogin(data) {
	return axios.post(`/auth/admin/login`, data);
}

export { register, login, adminLogin };
