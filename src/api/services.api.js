import axios from 'axios';
import { BASE_URL } from '.';

const servicesAPI = axios.create({
	baseURL: `${BASE_URL}/services`,
});

function getAllServices() {
	return servicesAPI.get(`/`);
}

export { getAllServices };
