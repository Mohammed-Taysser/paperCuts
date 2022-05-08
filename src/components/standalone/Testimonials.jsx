import React, { useState, useEffect } from 'react';
import { onImageNotLoad, Stars } from '../ManipulateData';
import { TestimonialsAPI, TESTIMONIALS } from '../../api/Localhost';
import RoundedBorder from '../../assets/images/shapes/rounded-border.svg';
import DashedShape from '../../assets/images/shapes/dashed-shape.svg';
import Spinner from '../bootstrap/Spinner';
import Alert from '../bootstrap/Alert';
import 'bootstrap/js/src/carousel';

function Testimonials(props) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api_get_testimonials();
  }, []);

  const api_get_testimonials = async () => {
    await TestimonialsAPI.get('/')
      .then((response) => {
        setTestimonials(response.data);
      })
      .catch((error) => {
        console.log(error);
        setTestimonials(TESTIMONIALS);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const CarouselIndicators = () => {
    let indicators = [];

    for (let index = 0; index < testimonials.length; index++) {
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
    return <> {indicators} </>;
  };

  const CarouselItems = () => {
    let items = testimonials.map((item, index) => {
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
              onError={onImageNotLoad}
              width={'150px'}
              height={'150px'}
            />
            <h4 className='text-aurora my-2 animate__slideInDown'>
              {item.customer}
            </h4>
            <p>{item.info}</p>
          </div>
        </div>
      );
    });
    return <> {items} </>;
  };

  const BackgroundShapes = () => {
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

  const CarouselControl = () => {
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

  const Render = () => {
    if (loading) {
      return <Spinner />;
    }

    if (testimonials && testimonials.length > 0) {
      return (
        <section className='testimonial-section py-5 my-5'>
          <BackgroundShapes />
          <div
            id={`${props.id}`}
            className='carousel slide carousel-dark'
            data-bs-ride='carousel'
          >
            <div className='carousel-indicators'>
              <CarouselIndicators />
            </div>
            <div className='carousel-inner'>
              <CarouselItems />
            </div>
            <CarouselControl />
          </div>
        </section>
      );
    } else {
      return <Alert> no testimonials found </Alert>;
    }
  };

  return <Render />;
}

Testimonials.defaultProps = {
  id: 'carousel-with-captions-id',
};

export default Testimonials;
