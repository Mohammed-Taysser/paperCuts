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
const LATEST_BOOKS = shuffle_arr(Data.books.slice(0, 8));

export { SERVICES, REVIEWS, LATEST_BOOKS };
