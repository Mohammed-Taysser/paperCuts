import React from 'react';
import { Link } from 'react-router-dom';
import { Stars } from '../ManipulateData';

function SingleBook(props) {
  const { book } = props;

  return (
    <div className={`col-6 col-md-${props.col} my-3`}>
      <div className='card border-0 nice-shadow h-100 single-book'>
        <div className='img'>
          <img src={book.image} className='card-img-top' alt={book.title} />
        </div>
        <div className='card-body'>
          <h5 className='card-title'>
            <Link to={`/books/${book.slug}`} className='stretched-link'>
              {book.title}
            </Link>
          </h5>
          <h6 className='card-subtitle mb-3 text-muted'>
            {typeof book.author === 'object' ? book.author.name : book.author}
          </h6>
          <h6 className='card-subtitle d-md-flex justify-content-between'>
            <span className='text-aurora'>{book.price}$</span>
            <span className='d-block d-md-inline'>
              {<Stars stars_length={book.stars} />}
            </span>
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