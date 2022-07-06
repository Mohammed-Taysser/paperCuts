import axios from 'axios';

function getAllMembers() {
	return axios.get(`/team`);
}

export { getAllMembers };
