import axios from 'axios';
import { BASE_URL } from '.';

function getLatestBooks() {
  return axios.get(`${BASE_URL}/books/latest`);
}

function getRelatedBooks() {
  return axios.get(`${BASE_URL}/books/related`);
}

function getBookBySlug(slug) {
  return axios.get(`${BASE_URL}/books/${slug}`);
}

function getTop5() {
  return axios.get(`${BASE_URL}/books/top5`);
}

function getBookByQuery(query) {
  return axios.get(`${BASE_URL}/books/search?${query}`);
}

function getBookByCategory(category) {
  return axios.get(`${BASE_URL}/books/search?category=${category}`);
}

function getAuthorBooks(username) {
  return axios.get(`${BASE_URL}/books/search?author=${username}`);
}

export {
  getLatestBooks,
  getRelatedBooks,
  getBookBySlug,
  getTop5,
  getBookByQuery,
  getBookByCategory,
  getAuthorBooks,
};
