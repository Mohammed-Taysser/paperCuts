import axios from 'axios';

const base_url = axios.create({
  baseURL: 'http://localhost:8080/db',
});

const ServicesAPI = axios.create({
  baseURL: 'http://localhost:8080/services',
});

export default base_url;
export { base_url, ServicesAPI };
