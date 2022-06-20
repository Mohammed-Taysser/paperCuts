import axios from 'axios';
import { BASE_URL } from '.';

const eventsAPI = axios.create({
	baseURL: `${BASE_URL}/events`,
});

function getAllEvents() {
	return eventsAPI.get(`/`);
}

function getEventBySlug(slug) {
	return eventsAPI.get(`/${slug}`);
}

export { getAllEvents, getEventBySlug };
