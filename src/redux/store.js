import { configureStore } from '@reduxjs/toolkit';
import couponReducer from './features/cart.slice';
import authReducer from './features/auth.slice';

export default configureStore({
	reducer: {
		cart: couponReducer,
		auth: authReducer,
	},
});
