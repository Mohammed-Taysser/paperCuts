import axios from 'axios';
import { BASE_URL } from '.';

const testimonialAPI = axios.create({
	baseURL: `${BASE_URL}/testimonial`,
});

function getAllTestimonials() {
	return testimonialAPI.get(`/`);
}

export { getAllTestimonials };
