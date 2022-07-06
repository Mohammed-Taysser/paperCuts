import axios from 'axios';

function getAllEvents() {
	return axios.get(`/events`);
}

function getEventBySlug(slug) {
	return axios.get(`/events/${slug}`);
}

export { getAllEvents, getEventBySlug };
