import React, { useLayoutEffect, useState } from 'react';
import SingleBook from './single/SingleBook';
import Alert from './bootstrap/Alert';
import { RowOfPlaceholderCard } from './bootstrap/Placeholder';
import { BooksAPI, BOOKS } from '../api/Localhost';

/**
 * Get book depend on the props:
 * 1. pass nothing => get random 4 books
 * 2. getBy= categoryId    => get category books by id
 * 3. getBy= categoryArray => get books by array of id's
 *
 * @param {Object} props needed props
 * @returns {JSX.Element} books
 */
function GetBookByCategory(props) {
  const { getBy = '' } = props;
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    api_get_books();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_books = async () => {
    await BooksAPI.get('/')
      .then((response) => {
        filter_books(response.data);
      })
      .catch((error) => {
        filter_books(BOOKS);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const filter_books = (response_books) => {
    let filtered_books = null;

    switch (typeof getBy) {
      case 'number':
        filtered_books = response_books.filter((book) =>
          book.category.includes(props.getBy)
        );
        break;
      case 'object':
        filtered_books = response_books.filter((book) =>
          props.getBy.includes(book.id)
        );
        break;
      default:
        filtered_books = shuffle_arr(response_books).slice(0, 4);
        break;
    }

    setBooks([...new Set(filtered_books)]);
  };

  function shuffle_arr(arr) {
    return arr.sort(() => 0.5 - Math.random());
  }

  const Render = () => {
    if (loading) {
      return <RowOfPlaceholderCard num={4} />;
    }

    if (books && books.length > 0) {
      let books_list = books.map((book, index) => (
        <SingleBook book={book} key={index} />
      ));
      return (
        <div className='row justify-content-center align-items-stretch'>
          {books_list}
        </div>
      );
    } else {
      return <Alert>no available books found</Alert>;
    }
  };

  return <Render />;
}

export default GetBookByCategory;
