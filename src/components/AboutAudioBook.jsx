import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import AboutAudioBookImage from '../assets/images/background/about-audio-book.png';
import { AUDIO_BOOK_FEATHERS } from '../constants/about';

function AboutAudioBook() { 
	return (
		<section className='about-audio-book my-5 py-5'>
			<div className='container'>
				<div className='row justify-content-center align-items-center'>
					<div className='col-lg-5 my-3'>
						<small className='special-small-title'> Sell Your Way </small>
						<h2 className='mb-3'> Audiobooks & product types</h2>
						<p className='text-muted'>
							paperCuts is equipped with layouts for various product types, &
							you can feature audiobooks too!
						</p>
						<div className='row justify-content-center align-items-center text-muted '>
							{AUDIO_BOOK_FEATHERS.map((feather, index) => {
								return (
									<div className='col-6 my-2' key={index}>
										<FiCheckCircle className='text-aurora' />
										<span className='mx-2'>{feather}</span>
									</div>
								);
							})}
						</div>
					</div>
					<div className='col-lg-7 my-3'>
						<img
							src={AboutAudioBookImage}
							alt='about-audio-book'
							className='img-fluid'
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export default AboutAudioBook;
