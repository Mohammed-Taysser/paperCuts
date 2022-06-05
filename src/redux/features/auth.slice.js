import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: null,
		jwt_token: null,
	},
	reducers: {
		setToken: (state, action) => {
			state.token = action.payload;
			if (action.payload) {
				state.jwt_token = jwtDecode(action.payload);
			}
		},
		logout: (state) => {
			state.token = null;
			state.jwt_token = null;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
