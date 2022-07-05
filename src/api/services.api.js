import axios from 'axios';

function getAllServices() {
	return axios.get(`/services`);
}

export { getAllServices };
