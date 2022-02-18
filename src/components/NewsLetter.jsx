import React from 'react';
import { Link } from 'react-router-dom';
import NewsLetterImage from '../assets/img/background/news-letter-bg.png';
import SleepyGirlImage from '../assets/img/shapes/sleepy-girl.png';

function NewsLetter() {
  return (
    <section
      className='news-letter-page bg-with-overlay'
      style={{ backgroundImage: `url(${NewsLetterImage})` }}
    >
      <div className='wrapper text-center'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <img src={SleepyGirlImage} alt="sleepy-girl" className='img-fluid d-block mx-auto mb-4' width={150} height={190} />
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

export default NewsLetter;
