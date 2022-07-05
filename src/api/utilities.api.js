import axios from 'axios';

function getLanguages() {
	return axios.get(`/utilities/languages`);
}

export { getLanguages };
