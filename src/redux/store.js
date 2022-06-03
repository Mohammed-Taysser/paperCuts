import { configureStore } from '@reduxjs/toolkit';
import couponReducer from './features/cart.slice';

export default configureStore({
  reducer: {
    cart: couponReducer,
  },
});
