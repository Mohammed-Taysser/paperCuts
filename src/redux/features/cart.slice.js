import { createSlice } from '@reduxjs/toolkit';

export const couponSlice = createSlice({
	name: 'cart',
	initialState: {
		discount: 0,
		shipping: 50,
		coupons: [],
		total: 0,
	},
	reducers: {
		calculateAmount: (state, action) => {
			state.total = action.payload.reduce((total, item) => {
				total += item.price * item.quantity;
				return total;
			}, 0);
		},
		addCoupon: (state, action) => {
			state.coupons.push(action.payload);
			state.discount = reduceCoupons(state.coupons);
		},
		removeCoupon: (state, action) => {
			state.coupons = state.coupons.filter(
				(coupon) => coupon._id !== action.payload
			);
			state.discount = reduceCoupons(state.coupons);
		},
	},
});

function reduceCoupons(coupons) {
	return coupons.reduce((total, coupon) => {
		total += coupon.value;
		return total;
	}, 0);
}

// Action creators are generated for each case reducer function
export const { calculateAmount, addCoupon, removeCoupon } = couponSlice.actions;

export default couponSlice.reducer;
