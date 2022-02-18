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

// exported variable names
const SERVICES = Data.services,
  REVIEWS = Data.reviews,
  BOOKS = Data.books,
  CATEGORY = Data.category,
  LATEST_BOOKS = shuffle_arr(Data.books.slice(0, 8)),
  RELATED_BOOKS = shuffle_arr(Data.books.slice(0, 4));

function shuffle_arr(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

export default base_url;
export { CategoryAPI, ServicesAPI, BooksAPI };
export { SERVICES, REVIEWS, BOOKS, LATEST_BOOKS, RELATED_BOOKS, CATEGORY };
