import axios from 'axios';
import { BASE_URL } from '.';

function getAllCategory() {
  return axios.get(`${BASE_URL}/category`);
}

function getCategoryBySlug(slug) {
  return axios.get(`${BASE_URL}/category/${slug}`);
}

export { getAllCategory, getCategoryBySlug };
