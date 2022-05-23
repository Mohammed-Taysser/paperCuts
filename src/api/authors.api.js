import axios from 'axios';
import { BASE_URL } from '.';

function getAuthorByUsername(username) {
  return axios.get(`${BASE_URL}/authors/${username}`);
}

function getAllAuthors() {
  return axios.get(`${BASE_URL}/authors`);
}

function getAuthorByEmail(email) {
  return axios.get(`${BASE_URL}/authors/${email}`);
}

export { getAuthorByUsername, getAuthorByEmail, getAllAuthors };
