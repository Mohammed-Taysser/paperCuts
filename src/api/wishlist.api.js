import axios from 'axios';
import { BASE_URL, token } from '.';

const wishlistAPI = axios.create({
	baseURL: `${BASE_URL}/wishlist`,
	headers: {
		authorization: token,
	},
});

function getAllAuthorWishlist() {
	return wishlistAPI.get(`/`);
}

function getWishlistByBookId(bookId) {
	return wishlistAPI.get(`/view/${bookId}`);
}

function createWishlist(bookData) {
	return wishlistAPI.post(`/create`, bookData);
}

function deleteWishlist(wishlistId) {
	return wishlistAPI.delete(`/delete/${wishlistId}`);
}

export {
	getAllAuthorWishlist,
	getWishlistByBookId,
	createWishlist,
	deleteWishlist,
};
