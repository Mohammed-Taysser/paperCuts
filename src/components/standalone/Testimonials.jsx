import React from 'react';
import { onImageNotLoad, Stars } from '../ManipulateData';
import DashedShape from '../../assets/images/shapes/dashed-shape.svg';
import RoundedBorder from '../../assets/images/shapes/rounded-border.svg';
import TESTIMONIALS from '../../constants/testimonials';

const CarouselIndicators = ({ id }) => {
	return (
		<>
			{TESTIMONIALS.map((item, index) => (
				<button
					type='button'
					data-bs-target={`#${id}`}
					data-bs-slide-to={index}
					className={`${index === 0 ? 'active' : ''}`}
					aria-current='true'
					aria-label={`review ${index}`}
					key={item._id}
				></button>
			))}
		</>
	);
};

const CarouselItems = () => {
	return (
		<>
			{TESTIMONIALS.map((item, index) => {
				return (
					<div
						className={`carousel-item ${index === 0 ? 'active' : ''}`}
						key={item._id}
					>
						<div className='carousel-caption d-block '>
							<p className='rate'>{<Stars stars_length={item.rate} />}</p>
							<img
								src={item.avatar}
								className='d-inline-block rounded-circle border-aurora p-2'
								alt={item.name}
								onError={onImageNotLoad}
								width={'150px'}
								height={'150px'}
							/>
							<h4 className='text-aurora my-2 animate__slideInDown'>
								{item.name}
							</h4>
							<p>{item.info}</p>
						</div>
					</div>
				);
			})}
		</>
	);
};

const CarouselControl = ({ id }) => {
	return (
		<>
			<button
				className='carousel-control-prev'
				type='button'
				data-bs-target={`#${id}`}
				data-bs-slide='prev'
			>
				<span className='carousel-control-prev-icon' aria-hidden='true'></span>
				<span className='visually-hidden'>Previous</span>
			</button>
			<button
				className='carousel-control-next'
				type='button'
				data-bs-target={`#${id}`}
				data-bs-slide='next'
			>
				<span className='carousel-control-next-icon' aria-hidden='true'></span>
				<span className='visually-hidden'>Next</span>
			</button>
		</>
	);
};

function Testimonials(props) {
	return (
		<section className='testimonial-section py-5 my-5'>
			<div className='shapes'>
				<img
					src={RoundedBorder}
					alt='rounded svg icon'
					className='rounded-border-shape'
				/>
				<img src={DashedShape} alt='dashed svg icon' className='dashed-shape' />
			</div>
			<div
				id={`${props.id}`}
				className='carousel slide carousel-dark'
				data-bs-ride='carousel'
			>
				<div className='carousel-indicators'>
					<CarouselIndicators id={props.id} />
				</div>
				<div className='carousel-inner'>
					<CarouselItems />
				</div>
				<CarouselControl id={props.id} />
			</div>
		</section>
	);
}

Testimonials.defaultProps = {
	id: 'carousel-with-captions-id',
};

export default Testimonials;
