import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import SingleBook from './SingleBook';
import { LATEST_BOOKS } from '../api/Localhost';

function LatestBooks() {
  const book_list = () => {
    if (LATEST_BOOKS.length > 0) {
      return LATEST_BOOKS.map((book) => {
        return <SingleBook book={book} key={book.id} />;
      });
    }
    return <> no books available </>;
  };
  return (
    <section className='latest-books py-5 my-5'>
      <SectionTitle subtitle='shop online' title='Latest books online' />
      <div className='container p-xs-0 px-5 px-md-0'>
        <div className='row mt-4 justify-content-center align-items-center align-items-stretch'>
          {book_list()}
        </div>
      </div>
      <div className='text-center mt-4'>
        <Link to='/books' className='btn btn-aurora'>
          show more books
        </Link>
      </div>
    </section>
  );
}

export default LatestBooks;
