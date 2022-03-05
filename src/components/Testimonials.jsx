import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/js/src/carousel';
import useJsonServerToast from '../context/IsJsonServerDown';
import { Stars } from './ManipulateData';
import { REVIEWS, ReviewAPI } from '../api/Localhost';
import RoundedBorder from '../assets/img/rounded-border.svg';
import DashedShape from '../assets/img/dashed-shape.svg';

function Testimonials(props) {
  const is_jsonServer_down = useContext(useJsonServerToast);
  const [reviews, setReviews] = useState(REVIEWS);

  useEffect(() => {
    if (is_jsonServer_down) {
      setReviews(REVIEWS);
    } else {
      api_get_reviews();
    }
  }, [is_jsonServer_down]);

  const api_get_reviews = async () => {
    await ReviewAPI.get('/')
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        setReviews(REVIEWS);
      });
  };

  const carousel_indicators = () => {
    let indicators = [];

    for (let index = 0; index < reviews.length; index++) {
      indicators.push(
        <button
          type='button'
          data-bs-target={`#${props.id}`}
          data-bs-slide-to={index}
          className={`${index === 1 ? 'active' : ''}`}
          aria-current='true'
          aria-label={`review ${index}`}
          key={index}
        ></button>
      );
    }
    return indicators;
  };

  const carousel_items = () => {
    return reviews.map((item, index) => {
      return (
        <div
          className={`carousel-item ${index === 1 ? 'active' : ''}`}
          key={item.id}
        >
          <div className='carousel-caption d-block '>
            <p className='rate'>{<Stars stars_length={item.rate} />}</p>
            <img
              src={item.img}
              className='d-inline-block rounded-circle border-aurora p-2'
              alt={item.customer}
              width={'150px'}
              height={'150px'}
            />
            <h4 className='text-aurora my-2'>{item.customer}</h4>
            <p>{item.info}</p>
          </div>
        </div>
      );
    });
  };

  const background_shapes = () => {
    return (
      <div className='shapes'>
        <img
          src={RoundedBorder}
          alt='rounded svg icon'
          className='rounded-border-shape'
        />
        <img src={DashedShape} alt='dashed svg icon' className='dashed-shape' />
      </div>
    );
  };

  const carousel_control = () => {
    return (
      <>
        <button
          className='carousel-control-prev'
          type='button'
          data-bs-target={`#${props.id}`}
          data-bs-slide='prev'
        >
          <span
            className='carousel-control-prev-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Previous</span>
        </button>
        <button
          className='carousel-control-next'
          type='button'
          data-bs-target={`#${props.id}`}
          data-bs-slide='next'
        >
          <span
            className='carousel-control-next-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Next</span>
        </button>
      </>
    );
  };

  return (
    <section className='testimonial-section py-5 my-5'>
      {background_shapes()}
      <div
        id={`${props.id}`}
        className='carousel slide carousel-dark'
        data-bs-ride='carousel'
      >
        <div className='carousel-indicators'>{carousel_indicators()}</div>
        <div className='carousel-inner'>{carousel_items()}</div>
        {carousel_control()}
      </div>
    </section>
  );
}

Testimonials.defaultProps = {
  id: 'carousel-with-captions-id',
};

export default Testimonials;
