import axios from 'axios';

function getCartByOrderId(orderId) {
	return axios.get(`/order/view/${orderId}`);
}

function getAllAuthorOrders() {
	return axios.get(`/order`);
}

function createOrder(orderData) {
	return axios.post(`/order/create`, orderData);
}

export { getCartByOrderId, getAllAuthorOrders, createOrder };
