import React from 'react';
import { FcRadarPlot } from 'react-icons/fc';
import { onImageNotLoad } from '../ManipulateData';

function SingleService({ service }) {
	return (
		<div className='col-md-6 col-lg-3 my-3'>
			<div className='single-service'>
				<div className='card border-0 h-100 text-center'>
					<img
						src={service.img}
						className='card-img-top img-fluid d-inline-block mx-auto'
						alt={service.title}
						onError={onImageNotLoad}
					/>
					<div className='card-body'>
						<div className='my-2'>
							<FcRadarPlot className='h2' />
						</div>
						<h4 className='card-title text-aurora'>{service.title}</h4>
						<p className='card-text text-muted'>{service.info}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SingleService;
