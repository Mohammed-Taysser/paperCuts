import React from 'react';
import { Link } from 'react-router-dom';
import Services from '../../components/standalone/Services';
import HeroHeader from '../../components/standalone/HeroHeader';
import Testimonials from '../../components/standalone/Testimonials';
import GeoLocation from '../../components/standalone/GeoLocation';
import SectionTitle from '../../components/standalone/SectionTitle';
import GetBookByCategory from '../../components/GetBookByCategory';

import NewsLetterImage from '../../assets/images/background/news-letter-bg.png';
import SleepyGirlImage from '../../assets/images/shapes/sleepy-girl.png';

import Client1 from '../../assets/images/icons/sponsors/sponsor-1.png';
import Client2 from '../../assets/images/icons/sponsors/sponsor-2.png';
import Client3 from '../../assets/images/icons/sponsors/sponsor-3.png';

import SkewedShape from '../../assets/images/shapes//skewed-shape.png';
import AwardsImage from '../../assets/images/background/awards.png';
import usePageTitle from '../../hooks/usePageTitle';

function Homepage() {
  usePageTitle('Homepage');

  const LatestBooks = () => {
    return (
      <section className='latest-books py-5 my-5'>
        <SectionTitle subtitle='shop online' title='Latest books online' />
        <div className='container'>
          <GetBookByCategory />
        </div>
        <div className='text-center mt-4'>
          <Link to='/books' className='btn btn-aurora'>
            show more books
          </Link>
        </div>
      </section>
    );
  };

  function NewsLetter() {
    return (
      <section
        className='news-letter-page bg-with-overlay'
        style={{ backgroundImage: `url(${NewsLetterImage})` }}
      >
        <div className='wrapper text-center'>
          <div className='row justify-content-center'>
            <div className='col-md-8'>
              <img
                src={SleepyGirlImage}
                alt='sleepy-girl'
                className='img-fluid d-block mx-auto mb-4'
                width={150}
                height={190}
              />
              <small className='special-small-title'>Get paperCuts</small>
              <h2 className='display-4'>Pen your bestseller</h2>
              <p className='my-4'>
                With ChapterOne's every element, layout & feature, your new site
                is a masterpiece waiting to be written
              </p>
              <Link to='' className='btn btn-aurora btn-lg'>
                Purchase
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function Awards() {
    return (
      <section className='awards-section my-5 py-5'>
        <div className='container'>
          <div className='row justify-content-between'>
            <div className='col-md-6 my-3'>
              <div className='writer-container'>
                <img src={AwardsImage} alt='awards' className='img-fluid' />
              </div>
            </div>
            <div className='col-md-6 my-3'>
              <img
                src={SkewedShape}
                alt='skewed-shape'
                className='img-fluid d-block ms-auto mb-4'
                width={'220'}
                height={'55'}
              />
              <small className='special-small-title'>writhers</small>
              <h3 className='mb-3'>Awards & nominations</h3>
              <p className='text-muted'>
                This open access wide-ranging collation of papers examines a
                host of issues in studying immigrant.
              </p>
              <div className='clients mt-4'>
                <img
                  src={Client1}
                  alt='client-1'
                  width={'75'}
                  height={'75'}
                  className='img-fluid me-3'
                />
                <img
                  src={Client2}
                  alt='client-2'
                  width={'75'}
                  height={'75'}
                  className='img-fluid mx-3'
                />
                <img
                  src={Client3}
                  alt='client-3'
                  width={'75'}
                  height={'75'}
                  className='img-fluid ms-3'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <HeroHeader />
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
