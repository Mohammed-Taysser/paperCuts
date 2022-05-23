import axios from 'axios';
import { BASE_URL } from '.';

function register(data) {
  return axios.post(`${BASE_URL}/auth/register`, data);
}

function login(data) {
  return axios.post(`${BASE_URL}/auth/login`, data);
}

export { register, login };
