import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AddToWishList from '../AddToWishlist';
import { Stars } from '../ManipulateData';
import { Context as AuthContext } from '../../context/auth';

function SingleBook(props) {
  const { book, withWishlist } = props;
  const auth_context = useContext(AuthContext);

  return (
    <div className={`col-6 col-md-${props.col} my-3`}>
      <div className='card border-0 nice-shadow h-100 single-book'>
        {auth_context.isAuth && withWishlist && (
          <div
            className='position-absolute top-0 end-0 m-2'
            style={{ zIndex: 2 }}
          >
            <AddToWishList currentBook={book} />
          </div>
        )}
        <div className='img'>
          <img src={book.image} className='card-img-top' alt={book.title} />
        </div>
        <div className='card-body'>
          <h5 className='card-title'>
            <Link to={`/books/${book.slug}`} className=''>
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
