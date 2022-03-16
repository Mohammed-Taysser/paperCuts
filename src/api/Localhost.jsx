import axios from 'axios';
import Data from './db.json';

// axios instance
const base_url = axios.create({
  baseURL: 'http://localhost:8080/db',
});

const ServicesAPI = axios.create({
  baseURL: 'http://localhost:8080/services',
});

const CategoryAPI = axios.create({
  baseURL: 'http://localhost:8080/category',
});

const BooksAPI = axios.create({
  baseURL: 'http://localhost:8080/books',
});

const AuthorsAPI = axios.create({
  baseURL: 'http://localhost:8080/authors',
});

const TeamAPI = axios.create({
  baseURL: 'http://localhost:8080/team',
});

const CartAPI = axios.create({
  baseURL: 'http://localhost:8080/cart',
});

// const CouponAPI = axios.create({
//   baseURL: 'http://localhost:8080/coupons',
// });

// const OrderAPI = axios.create({
//   baseURL: 'http://localhost:8080/orders',
// });

// const EventAPI = axios.create({
//   baseURL: 'http://localhost:8080/events',
// });

const ReviewAPI = axios.create({
  baseURL: 'http://localhost:8080/reviews',
});

const WishlistAPI = axios.create({
  baseURL: 'http://localhost:8080/wishlist',
});

// exported variable names
const SERVICES = Data.services,
  REVIEWS = Data.reviews,
  BOOKS = Data.books,
  CATEGORY = Data.category,
  TOP_FIVE = shuffle_arr(Data.books.slice(0, 5)),
  AUTHORS = Data.authors,
  WISHLIST = Data.wishlist,
  //   ORDERS = Data.orders,
  CART = Data.cart,
  //   COUPONS = Data.coupons,
  //   EVENTS = Data.events,
  TEAM = Data.team,
  //   LATEST_BOOKS = shuffle_arr(Data.books.slice(0, 8)),
  // RELATED_BOOKS = shuffle_arr(Data.books.slice(0, 4)),
  //   BOOKS_CATEGORY = shuffle_arr(Data.books.slice(0, 4)),
  BOOKS_REVIEWS = Data.books[0].reviews;

// // needed function

function shuffle_arr(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

// function get_book_by_id(id = '1') {
//   return BOOKS.find((book) => book.id.toString() === id);
// }

function get_book_by_slug(slug = '') {
  return BOOKS.find((book) => book.slug === slug);
}

// function get_category_by_id(id = '1') {
//   return CATEGORY.find((cty) => cty.id.toString() === id);
// }

// function get_category_by_slug(slug = '') {
//   return CATEGORY.find((cty) => cty.slug === slug);
// }

function get_author_by_id(id = 1) {
  return AUTHORS.find((author) => author.id === id);
}

// function get_author_by_username(username = '') {
//   return AUTHORS.find((author) => author.username === username);
// }

// function get_author_by_email(email = '') {
//   return AUTHORS.find((author) => author.email === email);
// }

// function get_coupon_by_id(id = 1) {
//   return COUPONS.find((coupon) => coupon.id === id);
// }

// function get_coupon_by_title(title = '') {
//   return COUPONS.find((coupon) => coupon.title === title);
// }

// function get_event_by_id(id = '1') {
//   return EVENTS.find((event) => event.id.toString() === id);
// }

// function get_order_by_id(id = '1') {
//   return ORDERS.find((order) => order.id.toString() === id);
// }

function get_reviews_by_id(id = 1) {
  return REVIEWS.filter((review) => review.id === id);
}

function get_wishlist_by_bookId(id = 1) {
  return WISHLIST.find((item) => item.bookId === id);
}

function get_cart_by_id(id = 1) {
  return CART.find((item) => item.id === id);
}

export default base_url;
export {
  CategoryAPI,
  ServicesAPI,
  BooksAPI,
  TeamAPI,
  AuthorsAPI,
  CartAPI,
  WishlistAPI,
  //   CouponAPI,
  //   OrderAPI,
  //   EventAPI,
  ReviewAPI,
};
export {
  SERVICES,
  REVIEWS,
  BOOKS,
  //   CART,
  TOP_FIVE,
  //   COUPONS,
  //   AUTHORS,
  TEAM,
  // LATEST_BOOKS,
  // RELATED_BOOKS,
  //   BOOKS_REVIEWS,
  CATEGORY,
  //   ORDERS,
  //   EVENTS,
  //   BOOKS_CATEGORY,
};
export {
  get_book_by_slug,
  //   get_book_by_id,
  get_author_by_id,
  get_cart_by_id,
  get_reviews_by_id,
  get_wishlist_by_bookId,
  //   get_category_by_id,
  //   get_category_by_slug,
  //   get_coupon_by_id,
  //   get_coupon_by_title,
  //   get_event_by_id,
  // get_author_by_username,
  //   get_author_by_email,
  //   get_order_by_id,
};
