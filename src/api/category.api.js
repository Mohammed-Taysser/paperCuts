import axios from 'axios';

function getAllCategory() {
	return axios.get(`/category`);
}

function getCategoryBySlug(slug) {
	return axios.get(`/category/${slug}`);
}

export { getAllCategory, getCategoryBySlug };
