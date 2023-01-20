import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchOrder = createAsyncThunk('order/single', async ({ id }) => {
	try {
		const response = await axios.get(`/order/view/${id}`);
		return {
			status: 'success',
			order: response.data,
		};
	} catch (error) {
		return {
			status: 'error',
			error: error.response.data.error,
		};
	}
});

const fetchAllOrder = createAsyncThunk('order/all', async () => {
	try {
		const response = await axios.get(`/order`);
		return {
			status: 'success',
			orders: response.data,
		};
	} catch (error) {
		return {
			status: 'error',
			error: error.response.data.error,
		};
	}
});

const createOrder = createAsyncThunk('order/create', async ({ data }) => {
	try {
		const response = await axios.post(`/order/create`, data);
		return {
			status: 'success',
			order: response.data,
		};
	} catch (error) {
		return {
			status: 'error',
			error: error.response.data.error,
		};
	}
});

const orderExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchOrder;

	return {
		[pending]: (state) => {
			state.single.loading = true;
			state.single.order = null;
		},
		[fulfilled]: (state, action) => {
			state.single.loading = false;
			if (action.payload.status === 'success') {
				state.single.order = action.payload.order;
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

const allOrderExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchAllOrder;

	return {
		[pending]: (state) => {
			state.all.loading = true;
			state.all.orders = null;
		},
		[fulfilled]: (state, action) => {
			state.all.loading = false;
			if (action.payload.status === 'success') {
				state.all.orders = action.payload.orders;
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

const createOrderExtraReducers = () => {
	const { pending, fulfilled, rejected } = createOrder;

	return {
		[pending]: (state) => {
			state.single.loading = true;
		},
		[fulfilled]: (state, action) => {
			state.single.loading = false;
			if (action.payload.status === 'success') {
				state.single.order = action.payload.order;
				state.all.orders = state.all.orders.push(action.payload.order);
				state.placeOrder = true;
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

const orderSlice = createSlice({
	name: 'orders',
	initialState: {
		single: {
			loading: false,
			order: null,
			error: null,
		},
		all: {
			loading: false,
			orders: [],
			error: null,
		},
		placeOrder: false,
	},
	reducers: {
		placeOrder: (state) => {
			state.placeOrder = false;
		},
	},
	extraReducers: {
		...orderExtraReducers(),
		...allOrderExtraReducers(),
		...createOrderExtraReducers(),
	},
});

// Action creators are generated for each case reducer function
export default orderSlice.reducer;
export const { placeOrder } = orderSlice.actions;
export { fetchOrder, fetchAllOrder, createOrder };
