import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BOOKS, BooksAPI } from '../../api/Localhost';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';
import Spinner from '../bootstrap/Spinner';
import Alert from '../bootstrap/Alert';

function BooksCard(props) {
  const { userBooks: propsBooks, onBooksChange } = props;
  const [apiBooks, setApiBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api_get_books();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_books = () => {
    BooksAPI.get('/')
      .then((response) => {
        onBooksLoad(response.data);
      })
      .catch((error) => {
        onBooksLoad(BOOKS);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onBooksLoad = (books) => {
    setApiBooks(books);
    let new_book = [];
    books.forEach((book) => {
      if (propsBooks.includes(book.id)) {
        new_book.push(book.id);
      }
    });
    setUserBooks(new_book);
  };

  const onDeleteBook = (evt, bookId) => {
    evt.preventDefault();
    let new_books = userBooks.filter((book) => book !== bookId);
    setUserBooks(new_books);
    onBooksChange(new_books);
  };

  const CreateBookPlaceholder = () => {
    return (
      <Link
        to={`/create/book`}
        className='text-center m-1 bg-light position-relative css-tooltip'
        data-tooltip='Add New Book'
        style={{ width: '100px' }}
      >
        <IoMdAddCircleOutline className='text-muted h2 position-absolute top-50 start-50 translate-middle' />
      </Link>
    );
  };

  const getBookById = (bookId) => {
    return apiBooks.find((book) => book.id === bookId);
  };

  const UserBooks = () => {
    let user_books = userBooks.map((bookId) => {
      let current_book = getBookById(bookId);
      return (
        <div key={bookId} className='position-relative'>
          <a
            href={`#delete-${current_book.slug}`}
            className='position-absolute top-0 end-0 bg-light mt-1 me-1'
            style={{ zIndex: 1 }}
            onClick={(evt) => onDeleteBook(evt, current_book.id)}
          >
            <AiOutlineDelete className='text-danger h5 m-0' />
          </a>
          <Link
            to={`/books/${current_book.slug}`}
            key={bookId}
            className='position-relative'
          >
            <img
              src={current_book.image}
              alt={current_book.title}
              className='m-1 img-fluid '
              width={100}
              height={120}
            />
          </Link>
        </div>
      );
    });
    user_books.push(<CreateBookPlaceholder key='create-book' />);
    return (
      <div className='d-flex align-items-stretch flex-wrap'>{user_books}</div>
    );
  };

  const Render = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (apiBooks && apiBooks.length > 0) {
      return (
        <>
          <UserBooks />
        </>
      );
    } else {
      return (
        <Alert className='p-1 small'>
          <p className='m-0'>no category found</p>
        </Alert>
      );
    }
  };

  return <Render />;
}

export default BooksCard;
