import axios from 'axios';
import { BASE_URL } from '.';

const bookAPI = axios.create({
	baseURL: `${BASE_URL}/books`,
});

function getLatestBooks() {
	return bookAPI.get(`/latest`);
}

function getRelatedBooks() {
	return bookAPI.get(`/related`);
}

function getBookBySlug(slug) {
	return bookAPI.get(`/${slug}`);
}

function getTop5() {
	return bookAPI.get(`/top5`);
}

function getBookByQuery(query) {
	return bookAPI.get(`/search?${query}`);
}

function getBookByCategory(category) {
	return bookAPI.get(`/search?category=${category}`);
}

function getAuthorBooks(username) {
	return bookAPI.get(`/search?author=${username}`);
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
