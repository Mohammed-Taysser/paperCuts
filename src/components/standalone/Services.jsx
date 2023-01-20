import React from 'react';
import SERVICES from '../../constants/services';
import SingleService from '../single/SingleService';
import SectionTitle from './SectionTitle';

function Services() {
	return (
		<>
			<section className='services-section my-5 py-5'>
				<SectionTitle title='our services' subtitle='what we introduce' />
				<div className='container'>
					<div className='row'>
						{SERVICES.map((service, index) => (
							<SingleService service={service} key={service._id} />
						))}
					</div>
				</div>
			</section>
		</>
	);
}

export default Services;
