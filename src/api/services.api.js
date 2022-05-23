import axios from 'axios';
import { BASE_URL } from '.';

const getAllServices = () => axios.get(`${BASE_URL}/services`);

export { getAllServices };
