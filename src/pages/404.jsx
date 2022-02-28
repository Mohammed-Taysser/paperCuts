import React from 'react';
import PageNotFoundImage from '../assets/img/background/404-img.jpg';

function PageNotFound() {
  return (
    <section
      className='page-not-found bg-with-overlay'
      style={{ backgroundImage: `url(${PageNotFoundImage})` }}
    >
      <div className='wrapper'>
        <h1 className='display-4 mb-4'>404</h1>
        <h2> Page not found </h2>
        <p className=''>
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <button className='btn btn-aurora'>Go To Home</button>
      </div>
    </section>
  );
}

export default PageNotFound;
