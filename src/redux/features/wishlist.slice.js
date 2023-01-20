import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchAllWishlist = createAsyncThunk('wishlist/all', async () => {
	try {
		const response = await axios.get(`/wishlist`);
		return {
			status: 'success',
			items: response.data,
		};
	} catch (error) {
		return {
			status: 'error',
			error: error.response.data.error,
		};
	}
});

const fetchWishlistByBookId = createAsyncThunk(
	'wishlist/view',
	async ({ id }) => {
		try {
			const response = await axios.get(`/wishlist/view/${id}`);
			return {
				status: 'success',
				item: response.data,
			};
		} catch (error) {
			return {
				status: 'error',
				error: error.response.data.error,
			};
		}
	}
);

const addBookToWishlist = createAsyncThunk(
	'wishlist/add',
	async ({ bookData }) => {
		try {
			const response = await axios.post(`/wishlist/create`, bookData);
			return {
				status: 'success',
				item: response.data,
			};
		} catch (error) {
			return {
				status: 'error',
				error: error.response.data.error,
			};
		}
	}
);

const removeBookFromWishlist = createAsyncThunk(
	'wishlist/delete',
	async ({ wishlistId }) => {
		try {
			const response = await axios.delete(`/wishlist/delete/${wishlistId}`);
			return {
				status: 'success',
				item: response.data,
			};
		} catch (error) {
			return {
				status: 'error',
				error: error.response.data.error,
			};
		}
	}
);

const allWishlistExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchAllWishlist;

	return {
		[pending]: (state) => {
			state.all.loading = true;
			state.all.items = null;
		},
		[fulfilled]: (state, action) => {
			state.all.loading = false;
			if (action.payload.status === 'success') {
				state.all.items = action.payload.items;
			} else {
				state.all.error = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.all.loading = false;
			state.all.error = action.error;
		},
	};
};

const viewWishlistByBookIdExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchWishlistByBookId;

	return {
		[pending]: (state) => {
			state.single.loading = true;
			state.single.item = null;
		},
		[fulfilled]: (state, action) => {
			state.single.loading = false;
			if (action.payload.status === 'success') {
				state.single.item = action.payload.item;
			} else {
				state.single.error = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.single.loading = false;
			state.single.error = action.error;
		},
	};
};

const addWishlistExtraReducers = () => {
	const { pending, fulfilled, rejected } = addBookToWishlist;

	return {
		[pending]: (state) => {
			state.single.loading = true;
			state.single.item = null;
		},
		[fulfilled]: (state, action) => {
			state.single.loading = false;
			if (action.payload.status === 'success') {
				state.single.item = action.payload.item;
			} else {
				state.single.error = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.single.loading = false;
			state.single.error = action.error;
		},
	};
};

const removeWishlistExtraReducers = () => {
	const { pending, fulfilled, rejected } = removeBookFromWishlist;

	return {
		[pending]: (state) => {
			state.single.loading = true;
			state.single.item = null;
		},
		[fulfilled]: (state, action) => {
			state.single.loading = false;
			if (action.payload.status === 'success') {
				state.single.item = null;
			} else {
				state.single.error = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.single.loading = false;
			state.single.error = action.error;
		},
	};
};

const wishlistSlice = createSlice({
	name: 'wishlist',
	initialState: {
		single: {
			loading: false,
			event: null,
			error: null,
		},
		all: {
			loading: false,
			items: [],
			error: null,
		},
	},
	reducers: {},
	extraReducers: {
		...allWishlistExtraReducers(),
		...viewWishlistByBookIdExtraReducers(),
		...addWishlistExtraReducers(),
		...removeWishlistExtraReducers(),
	},
});

// Action creators are generated for each case reducer function
export default wishlistSlice.reducer;
export {
	fetchAllWishlist,
	fetchWishlistByBookId,
	addBookToWishlist,
	removeBookFromWishlist,
};
