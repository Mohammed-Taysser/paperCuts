import React, { useEffect, useState } from 'react';
import { getAllTestimonials } from '../../api/testimonials';
import { onImageNotLoad, Stars } from '../ManipulateData';
import DashedShape from '../../assets/images/shapes/dashed-shape.svg';
import RoundedBorder from '../../assets/images/shapes/rounded-border.svg';
import Alert from '../bootstrap/Alert';
import Spinner from '../bootstrap/Spinner';
import '../../assets/scss/components/testimonials.scss';
import 'bootstrap/js/src/carousel';

function Testimonials(props) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    api_get_testimonials();
  }, []);

  const api_get_testimonials = async () => {
    await getAllTestimonials()
      .then((response) => {
        setTestimonials(response.data);
      })
      .catch((error) => {
        setLoadingError(error.message);
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
          className={`${index === 0 ? 'active' : ''}`}
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
          className={`carousel-item ${index === 0 ? 'active' : ''}`}
          key={index}
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

  const RenderTestimonials = () => {
    if (loading) {
      return <Spinner />;
    } else if (loadingError) {
      return (
        <div className='container'>
          <Alert> {loadingError} </Alert>
        </div>
      );
    } else if (testimonials && testimonials.length > 0) {
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
      return (
        <div className='container'>
          <Alert> no testimonials found </Alert>
        </div>
      );
    }
  };

  return <RenderTestimonials />;
}

Testimonials.defaultProps = {
  id: 'carousel-with-captions-id',
};

export default Testimonials;
