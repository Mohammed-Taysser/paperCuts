import React from 'react';
import BannerImage from '../assets/img/background/banner.jpg';

function Banner(props) {
  return (
    <section
      className='banner bg-with-overlay'
      style={{ backgroundImage: `url(${props.img})` }}
    >
      <div className='wrapper'>
        <div className='content'>
          <h6 className='page-subtitle'>{props.subtitle}</h6>
          <h2 className='page-title'>{props.title}</h2>
        </div>
      </div>
    </section>
  );
}

Banner.defaultProps = {
  subtitle: 'products',
  title: 'Shop List',
  img: BannerImage,
};

export default Banner;
