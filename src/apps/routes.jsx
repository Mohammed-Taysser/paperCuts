import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AUTH_ROUTES, PUBLIC_ROUTES } from './lazyLoading';
import { useSelector } from 'react-redux';
import PaperCutsLayout from '../layout/PaperCuts.layout';
import PlaceholderCard from '../components/bootstrap/Placeholder';

const SuspenseWrapper = (props) => {
	return (
		<React.Suspense fallback={<PlaceholderCard />}>
			{props.children}
		</React.Suspense>
	);
};

function MainRoutes() {
	const location = useLocation();
	const { isLoggedIn } = useSelector((state) => state['auth']);

	useEffect(() => {
		window.scrollTo({ top: 0 });
		// scroll to the top of the browser window when changing route
	}, [location]);

	const authRoutes = () => {
		return (
			isLoggedIn &&
			AUTH_ROUTES.map((route) => (
				<Route
					path={route.path}
					key={route.path}
					element={
						<SuspenseWrapper>
							<route.component />
						</SuspenseWrapper>
					}
				/>
			))
		);
	};

	const publicRoutes = () => {
		return PUBLIC_ROUTES.map((route) => (
			<Route
				path={route.path}
				key={route.path}
				element={
					<SuspenseWrapper>
						<route.component />
					</SuspenseWrapper>
				}
			/>
		));
	};

	return (
		<Routes>
			<Route path='/' element={<PaperCutsLayout />}>
				{publicRoutes()}
				{authRoutes()}
			</Route>
		</Routes>
	);
}

export default MainRoutes;
