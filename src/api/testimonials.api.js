import axios from 'axios';
import { BASE_URL } from '.';

const getAllTestimonials = () => axios.get(`${BASE_URL}/testimonial`);

export { getAllTestimonials };
