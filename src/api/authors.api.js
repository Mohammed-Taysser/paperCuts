import axios from 'axios';

function getAllAuthors() {
	return axios.get(`/authors`);
}

function updateAuthorSetting(setting) {
	return axios.patch(`/authors/update`, { ...setting });
}

function getAuthor(key, value) {
	return axios.get(`/authors/search?${key}=${value}`);
}

function deleteAuthor(_id) {
	return axios.delete(`/authors/delete/${_id}`);
}

function updateAuthorAvatar(avatarFormData) {
	return axios.post(`/authors/update-avatar`, avatarFormData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
}

function changeAuthorPassword(currentPassword, newPassword) {
	return axios.post(`/authors/change-password`, {
		currentPassword,
		newPassword,
	});
}

export {
	getAuthor,
	getAllAuthors,
	updateAuthorSetting,
	deleteAuthor,
	updateAuthorAvatar,
	changeAuthorPassword,
};
