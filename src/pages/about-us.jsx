import React from 'react';
import Banner from '../components/Banner';
import Services from '../components/Services';

import FlyShape from '../assets/img/fly-shape.svg';
import CupShape from '../assets/img/shapes/cup-shape.png';
import CoffeeSectionImage from '../assets/img/background/coffee-section-image.png';
import AutobiographySectionImage from '../assets/img/background/autobiography-section-image.png';

function aboutUs() {
  return (
    <>
      <Banner title='about us' subtitle='info' />
      <Services />
      <section className='autobiography-section my-5 py-5'>
        <div className='container'>
          <div className='row justify-content-between align-items-center'>
            <div className='col-md-6 my-3'>
              <div className='content pe-5 mb-5 mb-md-0 pb-5 pb-md-0'>
                <small className='special-small-title'>autobiography</small>
                <h3 className='mb-3'>Long printing history</h3>
                <p className='text-muted'>
                  This open access wide-ranging collation of papers examines a
                  host of issues in studying immigrant.This open access
                  wide-ranging collation of papers examines a host of issues in
                  studying immigrant.
                </p>
                <button className='btn btn-aurora'>Read More</button>
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
                    src={AutobiographySectionImage}
                    alt='autobiography-section'
                    className='autobiography-section-image img-fluid'
                    // width='250'
                    // height='250'
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
                    src={CoffeeSectionImage}
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
                <button className='btn btn-aurora'>Read More</button>
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
    </>
  );
}

export default aboutUs;
