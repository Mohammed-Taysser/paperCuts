import axios from 'axios';
import { BASE_URL } from '.';

const getAllMembers = () => axios.get(`${BASE_URL}/team`);

export { getAllMembers };
