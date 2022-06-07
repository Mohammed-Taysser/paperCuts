import axios from 'axios';
import { BASE_URL, token } from '.';

const authorAPI = axios.create({
	baseURL: `${BASE_URL}/authors`,
	headers: { authorization: token },
});

function getAllAuthors() {
	return authorAPI.get(`/`);
}

function updateAuthorSetting(setting) {
	return authorAPI.patch(`/update`, { ...setting });
}

function getAuthor(key, value) {
	return authorAPI.get(`/search?${key}=${value}`);
}

function deleteAuthor(_id) {
	return authorAPI.delete(`/delete/${_id}`);
}

function updateAuthorAvatar(avatarFormData) {
	return authorAPI.post(`/update-avatar`, avatarFormData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
}

export {
	getAuthor,
	getAllAuthors,
	updateAuthorSetting,
	deleteAuthor,
	updateAuthorAvatar,
};
