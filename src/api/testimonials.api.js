import axios from 'axios';

function getAllTestimonials() {
	return axios.get(`/testimonial`);
}

export { getAllTestimonials };
