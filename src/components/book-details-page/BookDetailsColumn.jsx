import React from 'react';
import { diff_in_days, Stars } from '../ManipulateData';

const BookDetailsColumn = (props) => {
  const { book, onReviewButtonClick, reviews_length } = props;

  const BookBadge = () => {
    const DAYS_NUMBER = 7;
    if (diff_in_days(new Date(), book.publishedAt) < DAYS_NUMBER) {
      return <small className='badge rounded-pill bg-warning mx-3'>new</small>;
    }
    return <></>;
  };

  return (
    <>
      <p className='special-small-title m-0'>author: {book.author.name}</p>
      <small className='special-small-title text-muted'>
        publisher: {book.publisher}
      </small>
      <div className='d-flex align-items-start'>
        <h1 className='h2 mb-2'>{book.title} </h1>
        {BookBadge()}
      </div>
      <div className='d-flex align-items-end'>
        {<Stars stars_length={book.stars} />}
        <a
          className='small mx-4 text-muted special-small-title'
          href='#reviews'
          onClick={onReviewButtonClick}
        >
          ({reviews_length} customer reviews)
        </a>
      </div>
      <p className='mt-2 h4'>{book.price}$</p>
      <p className='mt-3 text-muted'>{book.short_info}</p>
    </>
  );
};

BookDetailsColumn.defaultProps = {
  book: {},
  reviews_length: 0,
  onReviewButtonClick: (data) => {
    console.log(data);
  },
};

export default BookDetailsColumn;
