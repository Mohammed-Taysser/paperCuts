import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFoundImage from '../../assets/images/background/404-img.jpg';
import usePageTitle from '../../hooks/usePageTitle';
import '../../assets/scss/pages/404.scss';

function PageNotFound() {
  usePageTitle('404 Page Not Found');

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
        <Link to='/' className='btn btn-aurora'>
          Go To Home
        </Link>
        <Link to='/login' className='btn btn-aurora mx-2'>
          Login
        </Link>
      </div>
    </section>
  );
}

export default PageNotFound;
