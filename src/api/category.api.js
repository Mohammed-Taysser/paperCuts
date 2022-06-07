import axios from 'axios';
import { BASE_URL } from '.';

const categoryAPI = axios.create({
	baseURL: `${BASE_URL}/category`,
});

function getAllCategory() {
	return categoryAPI.get(`/`);
}

function getCategoryBySlug(slug) {
	return categoryAPI.get(`/${slug}`);
}

export { getAllCategory, getCategoryBySlug };
