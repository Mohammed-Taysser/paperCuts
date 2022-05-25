export const BASE_URL = `http://localhost:8080/api`;

let token = null;

if (localStorage.getItem('token')) {
  token = localStorage.getItem('token').replace(/"/gi, '');
}

export { token };
