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

function updateBook(bookData) {
	return axios.patch(`/books/update`, bookData);
}

function createBook(bookData) {
	return axios.post(`/books/create`, bookData);
}

function updateBookCover(bookData) {
	return axios.post(`/books/update-cover`, bookData, {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data',
		},
	});
}

export {
	getLatestBooks,
	getRelatedBooks,
	getBookBySlug,
	getTop5,
	getBookByQuery,
	getBookByCategory,
	getAuthorBooks,
	updateBook,
	createBook,
	updateBookCover,
};
