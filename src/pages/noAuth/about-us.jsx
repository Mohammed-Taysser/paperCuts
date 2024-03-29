import React from 'react';
import AutobiographyImage from '../../assets/images/background/about/autobiography.png';
import CoffeeImage from '../../assets/images/background/about/coffee.png';
import CupShape from '../../assets/images/shapes/cup-shape.png';
import FlyShape from '../../assets/images/shapes/fly-shape.svg';
import AboutAudioBook from '../../components/AboutAudioBook';
import Services from '../../components/standalone/Services';
import TeamMembers from '../../components/standalone/TeamMembers';
import usePageTitle from '../../hooks/usePageTitle';
import WithBanner from '../../layout/paperCuts/WithBanner.paperCuts';

function AboutUs() {
	usePageTitle('About Us');

	return (
		<WithBanner title='about us' subtitle='info'>
			<Services />
			<section className='autobiography-section my-5 py-5'>
				<div className='container'>
					<div className='row justify-content-between align-items-center'>
						<div className='col-md-6 my-3'>
							<div className='content mb-5 mb-md-0'>
								<small className='special-small-title'>autobiography</small>
								<h3 className='mb-3'>Long printing history</h3>
								<p className='text-muted'>
									This open access wide-ranging collation of papers examines a
									host of issues in studying immigrant.This open access
									wide-ranging collation of papers examines a host of issues in
									studying immigrant.
								</p>
								<img
									src={CupShape}
									alt='cup-shape'
									className='cup-shape d-block ms-auto'
									width='180'
									height='180'
								/>
							</div>
						</div>
						<div className='col-md-6 my-3'>
							<div className='autobiography-container'>
								<div className='autobiography-img'>
									<img
										src={AutobiographyImage}
										alt='autobiography-section'
										className='autobiography-section-image img-fluid'
										width='550'
										height='550'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className='coffee-section my-5 py-5'>
				<div className='container'>
					<div className='row justify-content-between align-items-center'>
						<div className='col-md-6 my-3'>
							<div className='coffee-container'>
								<div className='coffee-img'>
									<img
										src={CoffeeImage}
										alt='coffee-section'
										className='coffee-section-image img-fluid'
										width='550'
										height='420'
									/>
								</div>
							</div>
						</div>
						<div className='col-md-6 my-3'>
							<div className='content '>
								<small className='special-small-title'>Promo products</small>
								<h3 className='mb-3'>coffee with favorite Erika</h3>
								<p className='text-muted'>
									This open access wide-ranging collation of papers examines a
									host of issues in studying immigrant.This open access
									wide-ranging collation of papers examines a host of issues in
									studying immigrant.
								</p>
								<img
									src={FlyShape}
									alt='fly-shape'
									className='cup-shape d-block ms-auto'
									width='250'
									height='120'
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
			<TeamMembers />
			<AboutAudioBook />
		</WithBanner>
	);
}

export default AboutUs;
