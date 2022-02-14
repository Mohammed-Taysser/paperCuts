// import axios from 'axios';

// const base_url = axios.create({
//   baseURL: 'http://localhost:8080/db',
// });

// const ServicesAPI = axios.create({
//   baseURL: 'http://localhost:8080/services',
// });

// export default base_url;
// export { base_url, ServicesAPI };

import Data from '../assets/json/db.json';

function shuffle_arr(arr) {
  return arr.sort(() => 0.5 - Math.random());
}

const SERVICES = Data.services;
const REVIEWS = Data.reviews;
const BOOKS = Data.books;
const LATEST_BOOKS = shuffle_arr(Data.books.slice(0, 8));
const RELATED_BOOKS = shuffle_arr(Data.books.slice(0, 4));

export { SERVICES, REVIEWS, BOOKS, LATEST_BOOKS, RELATED_BOOKS };
