import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './paperCuts/Navbar.paperCuts';
import Footer from './paperCuts/Footer.paperCuts';
import BackToTop from '../components/standalone/BackToTop';

function PaperCutsLayout() {
	return (
		<>
			<Navbar />
			<BackToTop />
			<Outlet />
			<Footer />
		</>
	);
}
export default PaperCutsLayout;
