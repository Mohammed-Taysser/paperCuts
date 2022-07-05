import axios from 'axios';

function getLatestBooks() {
	return axios.get(`/books/latest`);
}

function getRelatedBooks() {
	return axios.get(`/books/related`);
}

function getBookBySlug(slug) {
	return axios.get(`/books/${slug}`);
}

function getTop5() {
	return axios.get(`/books/top5`);
}

function getBookByQuery(query) {
	return axios.get(`/books/search?${query}`);
}

function getBookByCategory(category) {
	return axios.get(`/books/search?category=${category}`);
}

function getAuthorBooks(username) {
	return axios.get(`/books/search?author=${username}`);
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
