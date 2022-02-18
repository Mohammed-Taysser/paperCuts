import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import AboutAudioBookImage from '../assets/img/background/about-audio-book.png'

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
            <div className='d-flex justify-content-between feather-container'>
              <div className='text-muted'>
                <div className='inner-feather my-2'>
                  <FiCheckCircle className='text-aurora' />
                  <span className='mx-2'>Easy audio embed</span>
                </div>
                <div className='inner-feather my-2'>
                  <FiCheckCircle className='text-aurora' />
                  <span className='mx-2'>Soundcloud playlists</span>
                </div>
                <div className='inner-feather my-2'>
                  <FiCheckCircle className='text-aurora' />
                  <span className='mx-2'>User dashboard</span>
                </div>
                <div className='inner-feather my-2'>
                  <FiCheckCircle className='text-aurora' />
                  <span className='mx-2'>Shopping cart</span>
                </div>
                <div className='inner-feather my-2'>
                  <FiCheckCircle className='text-aurora' />
                  <span className='mx-2'>Set of shop layouts</span>
                </div>
              </div>
              <div className='text-muted'>
                <div className='inner-feather my-2'>
                  <FiCheckCircle className='text-aurora' />
                  <span className='mx-2'>Order page</span>
                </div>
                <div className='inner-feather my-2'>
                  <FiCheckCircle className='text-aurora' />
                  <span className='mx-2'>Virtual products</span>
                </div>
                <div className='inner-feather my-2'>
                  <FiCheckCircle className='text-aurora' />
                  <span className='mx-2'>External products</span>
                </div>
                <div className='inner-feather my-2'>
                  <FiCheckCircle className='text-aurora' />
                  <span className='mx-2'>Variable products</span>
                </div>
                <div className='inner-feather my-2'>
                  <FiCheckCircle className='text-aurora' />
                  <span className='mx-2'>Downloadable</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 my-3">
<img src={AboutAudioBookImage} alt="about-audio-book" className='img-fluid' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutAudioBook;
