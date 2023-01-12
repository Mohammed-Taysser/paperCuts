import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';

const authFeature = createAsyncThunk('auth', async ({ type, data }) => {
	try {
		const response = await axios.post(`/auth/${type}`, data);
		return {
			status: 'success',
			user: response.data.author,
			token: response.data.token,
		};
	} catch (error) {
		return {
			status: 'error',
			error: error.response.data.error,
		};
	}
});

const authExtraReducers = () => {
	const { pending, fulfilled, rejected } = authFeature;

	return {
		[pending]: (state) => {
			state.loading = true;
		},
		[fulfilled]: (state, action) => {
			state.loading = false;
			if (action.payload.status === 'success') {
				const withoutPassword = { ...action.payload.user };
				delete withoutPassword.password;
				state.user = withoutPassword;
				state.token = action.payload.token;
				state.isLoggedIn = true;
				Cookies.set('token', action.payload.token);
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

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: Cookies.get('token') || null,
		user: null,
		isLoggedIn: Boolean(Cookies.get('token')),
		loading: false,
	},
	reducers: {
		initToken: (state) => {
			const token = Cookies.get('token');
			if (token) {
				try {
					const jwtDecodedToken = jwtDecode(token);
					const isExpired = Date.now() / 1000 > jwtDecodedToken?.exp;
					if (jwtDecodedToken && !isExpired) {
						state.user = jwtDecodedToken;
						state.isLoggedIn = true;
					}
				} catch (error) {
					//
				}
			}
		},
		refreshToken: (state, action) => {
			state.token = action.payload.token;
			state.user = action.payload.user;
			state.isLoggedIn = true;
			Cookies.set('token', action.payload.token);
		},
		logout: (state) => {
			state.token = null;
			state.user = null;
			state.isLoggedIn = false;
			Cookies.remove('token');
		},
	},
	extraReducers: {
		...authExtraReducers(),
	},
});

// Action creators are generated for each case reducer function
export default authSlice.reducer;
export const { initToken, logout, refreshToken } = authSlice.actions;
export { authFeature };
