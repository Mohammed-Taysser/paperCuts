import { BASE_URL, token } from './';
import axios from 'axios';

const cartAPI = axios.create({
  baseURL: `${BASE_URL}/cart`,
  headers: { authorization: token },
});

function getCartByBookId(bookId) {
  return cartAPI.get(`view/${bookId}`);
}

function getAllAuthorCart() {
  return cartAPI.get(`/`);
}

function createCartItem(bookData) {
  return cartAPI.post(`/create`, bookData);
}

function updateCartQuantity(cartId, quantity) {
  return cartAPI.patch(`/update/${cartId}`, { quantity });
}

function deleteCartItem(cartId) {
  return cartAPI.delete(`delete/${cartId}`);
}

export {
  getAllAuthorCart,
  getCartByBookId,
  createCartItem,
  deleteCartItem,
  updateCartQuantity,
};
