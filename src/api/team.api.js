import axios from 'axios';
import { BASE_URL } from '.';

const teamAPI = axios.create({
	baseURL: `${BASE_URL}/team`,
});

function getAllMembers() {
	return teamAPI.get(`/`);
}

export { getAllMembers };
