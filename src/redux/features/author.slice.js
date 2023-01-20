import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchAuthor = createAsyncThunk(
	'authors/search',
	async ({ key, value }) => {
		try {
			const response = await axios.get(
				`/authors/search?${key || 'username'}=${value || ''}`
			);
			return {
				status: 'success',
				author: response.data,
			};
		} catch (error) {
			return {
				status: 'error',
				error: error.response.data.error,
			};
		}
	}
);

const fetchAllAuthor = createAsyncThunk('authors/all', async () => {
	try {
		const response = await axios.get(`/authors`);
		return {
			status: 'success',
			authors: response.data,
		};
	} catch (error) {
		return {
			status: 'error',
			error: error.response.data.error,
		};
	}
});

const fetchAuthorProfile = createAsyncThunk(
	'authors/profile',
	async ({ value }) => {
		try {
			const response = await axios.get(
				`/authors/search?username=${value || ''}`
			);
			return {
				status: 'success',
				author: response.data,
			};
		} catch (error) {
			return {
				status: 'error',
				error: error.response.data.error,
			};
		}
	}
);

const updateProfileSetting = createAsyncThunk(
	'authors/update',
	async ({ key, setting }) => {
		try {
			const response = await axios.patch(`/authors/update`, { ...setting });
			return {
				status: 'success',
				author: response.data.author,
				token: response.data.token,
				key,
			};
		} catch (error) {
			return {
				status: 'error',
				error: error.response.data.error,
				key,
			};
		}
	}
);

const updateSettingExtraReducers = () => {
	const { pending, fulfilled, rejected } = updateProfileSetting;
	let key = null;

	return {
		[pending]: (state, action) => {
			key = action.meta.arg.key;
			state.profile.loading[key] = true;
			state.profile.author = null;
		},
		[fulfilled]: (state, action) => {
			state.profile.loading[key] = false;
			if (action.payload.status === 'success') {
				state.profile.author = action.payload.author;
				state.profile.token = action.payload.token;
				state.profile.isSaved[key] = true;
			} else {
				state.profile.error[key] = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.profile.loading[key] = false;
			state.profile.error[key] = action.payload.error;
		},
	};
};

const authorProfileExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchAuthorProfile;

	return {
		[pending]: (state) => {
			state.profile.loading['author'] = true;
			state.profile.author = null;
		},
		[fulfilled]: (state, action) => {
			state.profile.loading['author'] = false;
			if (action.payload.status === 'success') {
				state.profile.author = action.payload.author;
			} else {
				state.profile.error['author'] = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.profile.loading['author'] = false;
			state.profile.error['author'] = action.payload.error;
		},
	};
};

const authorExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchAuthor;

	return {
		[pending]: (state) => {
			state.single.loading = true;
			state.single.author = null;
		},
		[fulfilled]: (state, action) => {
			state.single.loading = false;
			if (action.payload.status === 'success') {
				state.single.author = action.payload.author;
			} else {
				state.single.error = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.single.loading = false;
			state.single.error = action.payload.error;
		},
	};
};

const allAuthorExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchAllAuthor;

	return {
		[pending]: (state) => {
			state.all.loading = true;
			state.all.authors = null;
		},
		[fulfilled]: (state, action) => {
			state.all.loading = false;
			if (action.payload.status === 'success') {
				state.all.authors = action.payload.authors;
			} else {
				state.all.error = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.all.loading = false;
			state.all.error = action.payload.error;
		},
	};
};

const authorSlice = createSlice({
	name: 'authors',
	initialState: {
		single: {
			loading: false,
			author: null,
			error: null,
		},
		all: {
			loading: false,
			authors: null,
			error: null,
		},
		profile: {
			loading: {},
			author: null,
			error: {},
			isSaved: {},
			token: null,
		},
	},
	reducers: {
		updateProfileSettings: (state, { payload = {} }) => {
			for (const key in payload) {
				if (Object.hasOwnProperty.call(payload, key)) {
					state.profile[key] = payload[key];
				}
			}
		},
	},
	extraReducers: {
		...authorExtraReducers(),
		...allAuthorExtraReducers(),
		...authorProfileExtraReducers(),
		...updateSettingExtraReducers(),
	},
});

// Action creators are generated for each case reducer function
export {
	fetchAuthor,
	fetchAllAuthor,
	fetchAuthorProfile,
	updateProfileSetting,
};
export const { updateProfileSettings } = authorSlice.actions;
export default authorSlice.reducer;
