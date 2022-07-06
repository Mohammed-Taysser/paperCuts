import React from 'react';
import { Route, Routes } from 'react-router-dom';

import authRoutes from './authRoutes';
import publicRoutes from './publicRoutes';
import dashboardRoutes from './dashboardRoutes';

import PaperCutsLayout from '../layout/PaperCuts.layout';

function mainRoutes() {
	return (
		<Routes>
			<Route path="/">{dashboardRoutes()}</Route>
			<Route path="/" element={<PaperCutsLayout />}>
				{authRoutes()}
				{publicRoutes()}
			</Route>
		</Routes>
	);
}

export default mainRoutes;
