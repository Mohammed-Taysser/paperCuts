import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../components/Banner';

function WebsitePages() {
  const AUTH_PAGES = [
      { label: 'checkout', href: '/checkout' },
      { label: 'profile', href: '/profile' },
      { label: 'cart', href: '/cart' },
      { label: 'wishlist', href: '/wishlist' },
      { label: 'orders', href: '/orders' },
      { label: 'orders details', href: '/orders/1' },
    ],
    NO_AUTH_PAGES = [
      { label: 'homepage', href: '/' },
      { label: '404', href: '/PageNotFound' },
      { label: 'about us', href: '/about-us' },
      { label: 'contact us', href: '/contact-us' },
      { label: 'author', href: '/authors' },
      { label: 'author details', href: '/authors/Mohammed-Taysser' },
      { label: 'category', href: '/category' },
      { label: 'category details', href: '/category/new' },
      { label: 'books', href: '/books' },
      { label: 'book details', href: '/books/prisoner-of-zenda-the' },
      { label: 'events', href: '/events' },
      { label: 'event details', href: '/event/eden' },
      { label: 'forget password', href: '/forget-password' },
      { label: 'login', href: '/login' },
      { label: 'register', href: '/register' },
    ];

  const RenderUlItems = ({ arr }) => {
    return (
      <ul>
        {arr.map((link, index) => (
          <li key={index}>
            <Link to={link.href}> {link.label} </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Banner title='website pages' subtitle='collections' />
      <section className='my-5 py-5'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-6 my-3'>
              <h2 className='mb-3'>no auth pages</h2>
              <RenderUlItems arr={NO_AUTH_PAGES} />
            </div>
            <div className='col-md-6 my-3'>
              <h2 className='mb-3'>auth pages</h2>
              <RenderUlItems arr={AUTH_PAGES} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WebsitePages;
