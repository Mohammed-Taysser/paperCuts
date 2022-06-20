import axios from 'axios';
import { BASE_URL } from '.';

const authAPI = axios.create({
	baseURL: `${BASE_URL}/auth`,
});

function register(data) {
	return authAPI.post(`/register`, data);
}

function login(data) {
	return authAPI.post(`/login`, data);
}

export { register, login };
