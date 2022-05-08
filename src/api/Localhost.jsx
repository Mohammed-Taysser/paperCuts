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

const UserAPI = axios.create({
  baseURL: 'http://localhost:8080/users',
});

const TeamAPI = axios.create({
  baseURL: 'http://localhost:8080/team',
});

const CartAPI = axios.create({
  baseURL: 'http://localhost:8080/cart',
});

const CouponAPI = axios.create({
  baseURL: 'http://localhost:8080/coupons',
});

const OrderAPI = axios.create({
  baseURL: 'http://localhost:8080/orders',
});

const EventAPI = axios.create({
  baseURL: 'http://localhost:8080/events',
});

const ReviewAPI = axios.create({
  baseURL: 'http://localhost:8080/reviews',
});

const WishlistAPI = axios.create({
  baseURL: 'http://localhost:8080/wishlist',
});

const TestimonialsAPI = axios.create({
  baseURL: 'http://localhost:8080/testimonials',
});

// exported variable names
const SERVICES = Data.services,
  REVIEWS = Data.reviews,
  BOOKS = Data.books,
  CATEGORY = Data.category,
  TOP_FIVE = shuffle_arr(Data.books.slice(0, 5)),
  AUTHORS = Data.authors,
  WISHLIST = Data.wishlist,
  ORDERS = Data.orders,
  CART = Data.cart,
  COUPONS = Data.coupons,
  EVENTS = Data.events,
  TEAM = Data.team,
  TESTIMONIALS = Data.testimonials;

// needed function

function shuffle_arr(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

function get_book_by_slug(slug = '') {
  return BOOKS.find((book) => book.slug === slug);
}

function get_category_by_slug(slug = '') {
  return CATEGORY.find((cty) => cty.slug === slug);
}

function get_author_by_id(id = 1) {
  return AUTHORS.find((author) => author.id === id);
}

function get_author_by_username(username = '') {
  return AUTHORS.find((author) => author.username === username);
}

function get_author_by_email(email = '') {
  return AUTHORS.find((author) => author.email === email);
}

function get_coupon_by_title(title = '') {
  return COUPONS.find((coupon) => coupon.label === title);
}

function get_event_by_slug(slug = '') {
  return EVENTS.find((event) => event.slug === slug);
}

function get_order_by_id(id = '1') {
  return ORDERS.find((order) => order.id.toString() === id);
}

function get_order_by_userId(id = 1) {
  return ORDERS.filter((order) => order.userId === id);
}

function get_reviews_by_bookId(bookId = 1) {
  return REVIEWS.filter((review) => review.bookId === bookId);
}

function get_wishlist_by_userId(userId = 1) {
  return WISHLIST.find((item) => item.userId === userId);
}

function get_cart_by_userId(userId = 1) {
  return CART.find((item) => item.userId === userId);
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
  CouponAPI,
  OrderAPI,
  EventAPI,
  ReviewAPI,
  TestimonialsAPI,
  UserAPI,
};

export {
  SERVICES,
  REVIEWS,
  BOOKS,
  CART,
  TOP_FIVE,
  AUTHORS,
  TEAM,
  CATEGORY,
  ORDERS,
  TESTIMONIALS,
  EVENTS,
};

export {
  get_book_by_slug,
  get_cart_by_userId,
  get_reviews_by_bookId,
  get_wishlist_by_userId,
  get_category_by_slug,
  get_coupon_by_title,
  get_event_by_slug,
  get_author_by_id,
  get_author_by_username,
  get_author_by_email,
  get_order_by_id,
  get_order_by_userId,
};
