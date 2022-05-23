import axios from 'axios';
import { BASE_URL, token } from '.';

const getAllAuthorWishlist = () =>
  axios.get(`${BASE_URL}/wishlist`, {
    headers: {
      authorization: token,
    },
  });

const getWishlistByBookId = (bookId) =>
  axios.get(`${BASE_URL}/wishlist/view/${bookId}`, {
    headers: {
      authorization: token,
    },
  });

const createWishlist = (bookData) =>
  axios.post(`${BASE_URL}/wishlist/create`, bookData, {
    headers: {
      authorization: token,
    },
  });

const deleteWishlist = (wishlistId) =>
  axios.delete(`${BASE_URL}/wishlist/delete/${wishlistId}`, {
    headers: {
      authorization: token,
    },
  });

export {
  getAllAuthorWishlist,
  getWishlistByBookId,
  createWishlist,
  deleteWishlist,
};
