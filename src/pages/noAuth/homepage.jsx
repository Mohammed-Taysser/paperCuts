import React from 'react';
import Awards from '../../components/homepage/Awards';
import Hero from '../../components/homepage/Hero';
import LatestBooks from '../../components/homepage/LatestBooks';
import NewsLetter from '../../components/homepage/NewsLetter';
import GeoLocation from '../../components/standalone/GeoLocation';
import Services from '../../components/standalone/Services';
import Testimonials from '../../components/standalone/Testimonials';
import usePageTitle from '../../hooks/usePageTitle';

function Homepage() {
	usePageTitle('Homepage');

	return (
		<>
			<Hero />
			<Services />
			<LatestBooks />
			<Testimonials />
			<Awards />
			<GeoLocation map={false} />
			<NewsLetter />
		</>
	);
}

export default Homepage;
