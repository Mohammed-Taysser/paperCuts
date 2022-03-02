import axios from 'axios';
import Data from '../json_server/db.json';

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

const TeamMemberAPI = axios.create({
  baseURL: 'http://localhost:8080/teamMember',
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

// exported variable names
const SERVICES = Data.services,
  REVIEWS = Data.reviews,
  BOOKS = Data.books,
  CATEGORY = Data.category,
  TOP_FIVE = Data.topFive,
  AUTHORS = Data.authors,
  CART = Data.cart,
  COUPONS = Data.coupons,
  EVENTS = Data.events,
  TEAM_MEMBER = Data.teamMember,
  LATEST_BOOKS = shuffle_arr(Data.books.slice(0, 8)),
  RELATED_BOOKS = shuffle_arr(Data.books.slice(0, 4)),
  BOOKS_CATEGORY = shuffle_arr(Data.books.slice(0, 4)),
  BOOKS_REVIEWS = Data.books[0].reviews;

function shuffle_arr(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

function get_book_by_id(id = '1') {
  return BOOKS.find((book) => book.id.toString() === id);
}

function get_category_by_id(id = '1') {
  return CATEGORY.find((cty) => cty.id.toString() === id);
}

function get_author_by_id(id = '1') {
  return AUTHORS.find((author) => author.id.toString() === id);
}

function get_coupon_by_id(id = 1) {
  return COUPONS.find((coupon) => coupon.id === id);
}

function get_coupon_by_title(title = '') {
  return COUPONS.find((coupon) => coupon.title === title);
}

function get_event_by_id(id = '1') {
  return EVENTS.find((event) => event.id.toString() === id);
}

export default base_url;
export {
  CategoryAPI,
  ServicesAPI,
  BooksAPI,
  TeamMemberAPI,
  AuthorsAPI,
  CartAPI,
  CouponAPI,
  OrderAPI,
  EventAPI,
};
export {
  SERVICES,
  REVIEWS,
  BOOKS,
  CART,
  TOP_FIVE,
  COUPONS,
  AUTHORS,
  TEAM_MEMBER,
  LATEST_BOOKS,
  RELATED_BOOKS,
  BOOKS_REVIEWS,
  CATEGORY,
  EVENTS,
  BOOKS_CATEGORY,
  get_book_by_id,
  get_author_by_id,
  get_category_by_id,
  get_coupon_by_id,
  get_coupon_by_title,
  get_event_by_id,
};
