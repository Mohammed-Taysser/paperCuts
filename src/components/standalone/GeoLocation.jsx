import React from 'react';
import SectionTitle from './SectionTitle';
import { ADDRESS, SPONSORS } from '../../constants/about';
import { FaPhoneAlt, FaMapMarkerAlt, FaRegEnvelope } from 'react-icons/fa';

const GoogleMap = () => {
	return (
		<div className='ratio ratio-16x9 my-5'>
			<iframe
				src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55251.335640563026!2d31.22344491961029!3d30.059558098332303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1646204637166!5m2!1sen!2seg'
				loading='lazy'
				title='paperCuts on google map'
			></iframe>
		</div>
	);
};

const Sponsors = () => {
	return (
		<div className='clients-container'>
			<div className='row mt-4 justify-content-center align-items-center align-items-stretch text-center'>
				{SPONSORS.map((sponsor, index) => (
					<div className='col-6 col-lg-2 my-3' key={sponsor.img}>
						<div className='single-client'>
							<img
								src={sponsor.img}
								alt={`client-${index}`}
								className='img-fluid'
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

function GeoLocation(props) {
	return (
		<section className='location-section py-5 my-5'>
			<SectionTitle subtitle='find us' title='Bookstore locations' />
			<div className='container'>
				{props.map && <GoogleMap />}
				<div className='row mt-4 justify-content-center align-items-center align-items-stretch'>
					{ADDRESS.map((address) => (
						<div className='col-md-6 col-lg-3 my-3' key={address.location}>
							<div className='location-container'>
								<h4 className='mb-4'>{address.location}</h4>
								<p className='mb-2'>
									<FaMapMarkerAlt className='me-2' />
									<span className='text-muted'>54 Soho Street NY</span>
								</p>
								<p className='mb-2'>
									<FaPhoneAlt className='me-2' />
									<a href={`tel:${address.phone}`} className='text-muted'>
										{address.phone}
									</a>
								</p>
								<p className='mb-2'>
									<FaRegEnvelope className='me-2' />
									<a href={`mailto:${address.email}`} className='text-muted'>
										{address.email}
									</a>
								</p>
							</div>
						</div>
					))}
				</div>
				<Sponsors />
			</div>
		</section>
	);
}

GeoLocation.defaultProps = {
	map: true,
};

export default GeoLocation;
