import React from 'react';
import { Link } from 'react-router-dom';
import { Stars } from './ManipulateData';

function SingleBook(props) {
  const { book } = props;

  return (
    <div className={`col-sm-6 col-lg-${props.col} my-3`}>
      <div className='card border-0 nice-shadow h-100 single-book'>
        <div className='img'>
          <img src={book.img} className='card-img-top' alt={book.title} />
        </div>
        <div className='card-body'>
          <h5 className='card-title'>
            <Link to={`/books/${book.id}`} className='stretched-link'>
              {book.title}
            </Link>
          </h5>
          <h6 className='card-subtitle mb-3 text-muted'> {book.author} </h6>
          <h6 className='card-subtitle d-flex justify-content-between'>
            <span className='text-aurora'>{book.price}$</span>
            <span className=''>{<Stars stars_length={book.stars} />}</span>
          </h6>
        </div>
      </div>
    </div>
  );
}

SingleBook.defaultProps = {
  col: 3,
};

export default SingleBook;
