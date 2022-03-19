import React from 'react';
import HeroHerder from '../assets/images/background/hero-header.jpg';

function Header() {
  return (
    <header
      className='hero-header'
      style={{ backgroundImage: `url(${HeroHerder})` }}
    >
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <div className='content text-center'>
              <small className='text-top'>forging writhers</small>
              <h1 className='display-2'>Best bookshelf in town</h1>
              <p className='mt-4'>
                paperCuts is a site that lists free eBooks books and online
                books related to programming, computer science, software
                engineering, web design and more which are provided by
                publishers or authors on their websites legally. We do not host
                pirated books or we do not link to sites that host pirated
                books.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
