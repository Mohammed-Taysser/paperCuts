import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: null,
		user: null,
		isLoggedIn: false,
	},
	reducers: {
		initTokenFeature: (state) => {
			const token = localStorage.getItem('token') || '';
			let jwtDecodedToken = {};
			try {
				jwtDecodedToken = jwtDecode(token);
			} catch (error) {
				jwtDecodedToken = '';
			}
			const isExpired = Date.now() / 1000 > jwtDecodedToken?.exp;
			if (token && jwtDecodedToken && !isExpired) {
				state.user = jwtDecodedToken;
				state.token = token;
				state.isLoggedIn = true;
			}
		},
		saveUserFeature: (state, action) => {
			const { token } = action.payload;
			if (action.payload && token) {
				state.token = token;
				localStorage.setItem('token', JSON.stringify(token));
				let jwtDecodedToken = {};
				try {
					jwtDecodedToken = jwtDecode(token);
				} catch (error) {
					jwtDecodedToken = '';
				}
				const isExpired = Date.now() / 1000 > jwtDecodedToken?.exp;
				if (jwtDecodedToken && !isExpired) {
					state.user = jwtDecodedToken;
					state.isLoggedIn = true;
				}
			}
		},
		unsubscribeFeature: (state) => {
			state.token = '';
			state.user = '';
			state.isLoggedIn = false;
			localStorage.removeItem('token');
		},
	},
});

// Action creators are generated for each case reducer function
export const { initTokenFeature, saveUserFeature, unsubscribeFeature } = authSlice.actions;

export default authSlice.reducer;
