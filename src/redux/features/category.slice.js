import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchCategoryBySlug = createAsyncThunk(
	'category/single',
	async ({ slug }) => {
		try {
			const response = await axios.get(`/category/${slug}`);
			return {
				status: 'success',
				category: response.data,
			};
		} catch (error) {
			return {
				status: 'error',
				error: error.response.data.error,
			};
		}
	}
);

const fetchAllCategory = createAsyncThunk('category/all', async () => {
	try {
		const response = await axios.get(`/category`);
		return {
			status: 'success',
			category: response.data,
		};
	} catch (error) {
		console.log(error);
		return {
			status: 'error',
			error: error.response.data.error,
		};
	}
});

const categoryExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchCategoryBySlug;

	return {
		[pending]: (state) => {
			state.single.loading = true;
			state.single.category = null;
		},
		[fulfilled]: (state, action) => {
			state.single.loading = false;
			if (action.payload.status === 'success') {
				state.single.category = action.payload.category;
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

const allCategoryExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchAllCategory;

	return {
		[pending]: (state) => {
			state.all.loading = true;
			state.all.category = null;
		},
		[fulfilled]: (state, action) => {
			state.all.loading = false;
			if (action.payload.status === 'success') {
				state.all.category = action.payload.category;
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

const categorySlice = createSlice({
	name: 'category',
	initialState: {
		single: {
			loading: false,
			category: null,
			error: null,
		},
		all: {
			loading: false,
			category: null,
			error: null,
		},
	},
	reducers: {},
	extraReducers: {
		...categoryExtraReducers(),
		...allCategoryExtraReducers(),
	},
});

// Action creators are generated for each case reducer function
export default categorySlice.reducer;
export { fetchCategoryBySlug, fetchAllCategory };
