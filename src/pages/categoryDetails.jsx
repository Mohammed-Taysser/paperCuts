import React from 'react';
import Banner from '../components/Banner';
import SingleBook from '../components/SingleBook';
import { LATEST_BOOKS } from '../api/Localhost';

function categoryDetails() {
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
      <Banner title='category title' subtitle='shop list' />
      <section className='author-books my-5 py-5'>
        <div className='container p-xs-0 px-5 px-md-0'>
          <div className='row mt-4 justify-content-center align-items-center align-items-stretch'>
            {book_list()}
          </div>
        </div>
      </section>
    </>
  );
}

export default categoryDetails;
