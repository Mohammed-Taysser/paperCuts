import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/features/auth.slice';

const AuthProvider = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (localStorage.getItem('token') !== null) {
			const token = JSON.parse(localStorage.getItem('token'));
			dispatch(setToken(token));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{props.children}</>;
};

export default AuthProvider;
