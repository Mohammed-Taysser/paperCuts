import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from '../pages/dashboard/login.dashboard';
import DashboardLayout from '../layout/dashboard.layout';
import Homepage from '../pages/dashboard/homepage.dashboard';
import Books from '../pages/dashboard/books.dashboard';
import UpdateBook from '../pages/dashboard/updateBook.dashboard';
import PageNotFound from '../pages/dashboard/404';

function AuthRoutes() {
	const { isLoggedIn, user } = useSelector((state) => state['auth']);

	const AuthRoute = () => {
		if (isLoggedIn && user?.role === 'admin') {
			return (
				<Route path="/dashboard" element={<DashboardLayout />}>
					<Route index element={<Homepage />} />
					<Route path="books" element={<Books />} />
					{/* <Route path="books/create" element={<BookDetails />} /> */}
					<Route path="books/edit/:slug" element={<UpdateBook />} />
				</Route>
			);
		}
	};

	return (
		<>
			<Route path="/dashboard/login" element={<Login />} />
			<Route path="*" element={<PageNotFound />} />
			{AuthRoute()}
		</>
	);
}

export default AuthRoutes;
