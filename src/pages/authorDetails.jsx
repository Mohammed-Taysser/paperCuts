import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaTelegram,
} from 'react-icons/fa';
import SingleBook from '../components/SingleBook';
import { LATEST_BOOKS } from '../api/Localhost';
import SectionTitle from '../components/SectionTitle';

function AuthorDetails() {
  const book_list = () => {
    if (LATEST_BOOKS.length > 0) {
      return LATEST_BOOKS.map((book) => {
        return <SingleBook book={book} key={book.id} />;
      });
    }
    return <> no books available </>;
  };

  return (
    <>
      <Banner title='author name' subtitle='author' />

      <section className='my-5'>
        <div className='container'>
          <div className='row justify-content-center align-items-center'>
            <div className='col-md-5 my-3 text-center'>
              <img
                src='https://chapterone.qodeinteractive.com/wp-content/uploads/2019/08/author1.png'
                alt='author name'
                width={250}
                height={250}
                className='img-fluid rounded-circle'
              />
            </div>
            <div className='col-md-7 my-3'>
              <div className='author-details-section'>
                <small className='special-small-title'>Austria</small>
                <h1 className='h2 mb-3'> John Strass </h1>
                <p className='small-info'>
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua."
                </p>
                <p className='text-muted'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in
                </p>
                <p className='mb-1'>age: 12</p>
                <p className='mb-1'>Category: Fiction</p>
                <p className='mb-1'>Languages:German, French</p>
                <div className='mt-4'>
                  <Link className='text-dark h5 mx-2' to=''>
                    <FaFacebookF />
                  </Link>
                  <Link className='text-dark h5 mx-2' to=''>
                    <FaInstagram />
                  </Link>
                  <Link className='text-dark h5 mx-2' to=''>
                    <FaTelegram />
                  </Link>
                  <Link className='text-dark h5 mx-2' to=''>
                    <FaTwitter />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='author-books my-5 py-5'>
        <SectionTitle subtitle='shop online' title='author books' />
        <div className='container p-xs-0 px-5 px-md-0'>
          <div className='row mt-4 justify-content-center align-items-center align-items-stretch'>
            {book_list()}
          </div>
        </div>
      </section>
    </>
  );
}

export default AuthorDetails;
