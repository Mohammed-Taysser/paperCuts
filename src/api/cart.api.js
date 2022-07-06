import axios from 'axios';

function getCartByBookId(bookId) {
	return axios.get(`/cart/view/${bookId}`);
}

function getAllAuthorCart() {
	return axios.get(`/cart`);
}

function createCartItem(bookData) {
	return axios.post(`/cart/create`, bookData);
}

function updateCartQuantity(cartId, quantity) {
	return axios.patch(`/cart/update/${cartId}`, { quantity });
}

function deleteCartItem(cartId) {
	return axios.delete(`/cart/delete/${cartId}`);
}

function deleteAllAuthorCart() {
	return axios.delete(`/cart/delete/all`);
}

export {
	getAllAuthorCart,
	getCartByBookId,
	createCartItem,
	deleteCartItem,
	updateCartQuantity,
	deleteAllAuthorCart,
};
