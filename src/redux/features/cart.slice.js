import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchAllCartItems = createAsyncThunk('cart/all', async () => {
	try {
		const response = await axios.get(`/cart/`);
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

const allCartExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchAllCartItems;

	return {
		[pending]: (state) => {
			state.loading = true;
			state.items = [];
		},
		[fulfilled]: (state, action) => {
			state.loading = false;
			if (action.payload.status === 'success') {
				const subtotal = calculateAmount(action.payload.items);
				state.items = action.payload.items;
				state.subtotal = subtotal;
			} else {
				state.error = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
	};
};

const fetchCartItemByBookId = createAsyncThunk('cart/view', async ({ id }) => {
	try {
		const response = await axios.get(`/cart/view/${id}`);
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
});

const fetchCartByBookIdExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchCartItemByBookId;

	return {
		[pending]: (state) => {
			state.single.loading = true;
			state.single.item = [];
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

const fetchCouponByLabel = createAsyncThunk(
	'coupon/search',
	async ({ label }) => {
		try {
			const response = await axios.get(`/coupon/view/${label}`);
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

const couponSearchExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchCouponByLabel;

	return {
		[pending]: (state) => {
			state.coupons.loading = true;
		},
		[fulfilled]: (state, action) => {
			state.coupons.loading = false;
			if (action.payload.status === 'success') {
				state.coupons.searched = action.payload.item;
			} else {
				state.coupons.error = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.coupons.loading = false;
			state.coupons.error = action.error;
		},
	};
};

const addCartItem = createAsyncThunk('cart/add', async ({ data }) => {
	try {
		const response = await axios.post(`/cart/create`, data);
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
});

const addCartItemExtraReducers = () => {
	const { pending, fulfilled, rejected } = addCartItem;

	return {
		[pending]: (state) => {
			state.single.loading = true;
			state.single.item = [];
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

const updateCartItem = createAsyncThunk(
	'cart/update',
	async ({ cartId, quantity }) => {
		try {
			const response = await axios.patch(`/cart/update/${cartId}`, {
				quantity,
			});
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

const updateCartItemExtraReducers = () => {
	const { pending, fulfilled, rejected } = updateCartItem;

	return {
		[pending]: (state) => {
			state.loading = true;
		},
		[fulfilled]: (state, action) => {
			state.loading = false;
			if (action.payload.status === 'success') {
				const updatedCartItems = state.items.map((item) =>
					item._id === action.payload.item._id
						? { ...item, quantity: action.payload.item.quantity }
						: item
				);
				const subtotal = calculateAmount(updatedCartItems);
				state.items = updatedCartItems;
				state.subtotal = subtotal;
			} else {
				state.error = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
	};
};

const deleteCartItem = createAsyncThunk('cart/delete', async ({ cartId }) => {
	try {
		const response = await axios.delete(`/cart/delete/${cartId}`);
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
});

const deleteCartItemExtraReducers = () => {
	const { pending, fulfilled, rejected } = deleteCartItem;

	return {
		[pending]: (state) => {
			state.loading = true;
		},
		[fulfilled]: (state, action) => {
			state.loading = false;
			if (action.payload.status === 'success') {
				const updatedCartItems = state.items.filter(
					(item) => item._id !== action.payload.item._id
				);
				const subtotal = calculateAmount(updatedCartItems);
				state.items = updatedCartItems;
				state.subtotal = subtotal;
			} else {
				state.error = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
	};
};

function calculateAmount(items) {
	return items.reduce((total, item) => {
		total += item.price * item.quantity;
		return total;
	}, 0);
}

export const couponSlice = createSlice({
	name: 'cart',
	initialState: {
		discount: 0,
		shipping: 50,
		coupons: {
			searched: {},
			applied: [],
			error: '',
			loading: false,
		},
		subtotal: 0,
		error: null,
		loading: false,
		items: [],
		single: {
			error: null,
			loading: false,
			item: null,
		},
	},
	reducers: {
		addCoupon: (state, action) => {
			state.coupons.applied.push(action.payload);
			state.discount = reduceCoupons(state.coupons.applied);
			state.subtotal = calculateAmount(state.items);
		},
		removeCoupon: (state, action) => {
			state.coupons.applied = state.coupons.applied.filter(
				(coupon) => coupon._id !== action.payload
			);
			state.discount = reduceCoupons(state.coupons.applied);
			state.subtotal = calculateAmount(state.items);
		},
	},
	extraReducers: {
		...allCartExtraReducers(),
		...addCartItemExtraReducers(),
		...updateCartItemExtraReducers(),
		...deleteCartItemExtraReducers(),
		...couponSearchExtraReducers(),
		...fetchCartByBookIdExtraReducers(),
	},
});

function reduceCoupons(coupons) {
	return coupons.reduce((total, coupon) => {
		total += coupon.value;
		return total;
	}, 0);
}

// Action creators are generated for each case reducer function
export const { addCoupon, removeCoupon } = couponSlice.actions;
export {
	fetchAllCartItems,
	addCartItem,
	updateCartItem,
	deleteCartItem,
	fetchCouponByLabel,
	fetchCartItemByBookId,
};
export default couponSlice.reducer;
