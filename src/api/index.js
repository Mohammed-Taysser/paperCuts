// axios BASE_URL for any api call
export const BASE_URL = `http://localhost:8080/api`;

// token for access authorization api call
let token = null;

if (localStorage.getItem('token') !== null) {
	token = JSON.parse(localStorage.getItem('token'));
}

export { token };
