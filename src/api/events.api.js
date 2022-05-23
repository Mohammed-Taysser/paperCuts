import axios from 'axios';
import { BASE_URL } from '.';

function getAllEvents() {
  return axios.get(`${BASE_URL}/events`);
}

function getEventBySlug(slug) {
  return axios.get(`${BASE_URL}/events/${slug}`);
}

export { getAllEvents, getEventBySlug };
