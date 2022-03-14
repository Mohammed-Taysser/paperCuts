import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import AboutAudioBookImage from '../assets/img/background/about-audio-book.png';

function AboutAudioBook() {
  const audioBookFeathers = [
    'Easy audio embed',
    'Soundcloud playlists',
    'User dashboard',
    'Shopping cart',
    'Set of shop layouts',
    'Order page',
    'External products',
    'Virtual products',
    'Variable products',
    'Downloadable',
  ];

  const AudioBookFeathers = () => {
    let feathers = audioBookFeathers.map((feather, index) => {
      return (
        <div className='col-6 my-2' key={index}>
          <FiCheckCircle className='text-aurora' />
          <span className='mx-2'>{feather}</span>
        </div>
      );
    });
    return <> {feathers} </>;
  };

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
              <AudioBookFeathers />
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
