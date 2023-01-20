import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';
import authReducer from './features/auth.slice';
import authorsReducers from './features/author.slice';
import booksReducer from './features/books.slice';
import couponReducer from './features/cart.slice';
import categoryReducers from './features/category.slice';
import eventsReducers from './features/events.slice';
import ordersReducers from './features/orders.slice';
import wishlistReducers from './features/wishlist.slice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		authors: authorsReducers,
		books: booksReducer,
		cart: couponReducer,
		category: categoryReducers,
		events: eventsReducers,
		orders: ordersReducers,
		wishlist: wishlistReducers,
	},
	// @ts-ignore
	devTools: process.env !== 'production',
});

const ReduxProvider = ({ children }) => (
	<Provider store={store}>{children}</Provider>
);

export default store;
export { ReduxProvider };
