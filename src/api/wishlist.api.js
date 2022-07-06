import axios from 'axios';

function getAllAuthorWishlist() {
	return axios.get(`/wishlist`);
}

function getWishlistByBookId(bookId) {
	return axios.get(`/wishlist/view/${bookId}`);
}

function createWishlist(bookData) {
	return axios.post(`/wishlist/create`, bookData);
}

function deleteWishlist(wishlistId) {
	return axios.delete(`/wishlist/delete/${wishlistId}`);
}

export {
	getAllAuthorWishlist,
	getWishlistByBookId,
	createWishlist,
	deleteWishlist,
};
