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

// exported variable names
const SERVICES = Data.services,
  REVIEWS = Data.reviews,
  BOOKS = Data.books,
  CATEGORY = Data.category,
  TOP_FIVE = Data.topFive,
  AUTHORS = Data.authors,
  TEAM_MEMBER = Data.teamMember,
  LATEST_BOOKS = shuffle_arr(Data.books.slice(0, 8)),
  RELATED_BOOKS = shuffle_arr(Data.books.slice(0, 4)),
  BOOKS_CATEGORY = shuffle_arr(Data.books.slice(0, 4)),
  BOOKS_REVIEWS = Data.books[0].reviews;

function shuffle_arr(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

function get_book_by_id(id = '1') {
  return BOOKS.filter((book) => book.id.toString() === id)[0];
}

function get_category_by_id(id = '1') {
  return CATEGORY.filter((cty) => cty.id.toString() === id)[0];
}

function get_author_by_id(id = '1') {
  return AUTHORS.filter((author) => author.id.toString() === id)[0];
}

export default base_url;
export { CategoryAPI, ServicesAPI, BooksAPI, TeamMemberAPI, AuthorsAPI };
export {
  SERVICES,
  REVIEWS,
  BOOKS,
  TOP_FIVE,
  AUTHORS,
  TEAM_MEMBER,
  LATEST_BOOKS,
  RELATED_BOOKS,
  BOOKS_REVIEWS,
  CATEGORY,
  BOOKS_CATEGORY,
  get_book_by_id,
  get_author_by_id,
  get_category_by_id,
};
