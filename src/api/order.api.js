import { BASE_URL, token } from './';
import axios from 'axios';

const orderAPI = axios.create({
	baseURL: `${BASE_URL}/order`,
	headers: { authorization: token },
});

function getCartByOrderId(orderId) {
	return orderAPI.get(`view/${orderId}`);
}

function getAllAuthorOrders() {
	return orderAPI.get(`/`);
}

function createOrder(orderData) {
	return orderAPI.post(`/create`, orderData);
}

export { getCartByOrderId, getAllAuthorOrders, createOrder };
