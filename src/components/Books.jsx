import React, { useEffect, useState } from 'react';
import SingleBook from './single/SingleBook';
import Alert from './bootstrap/Alert';
import SectionTitle from './SectionTitle';
import Spinner from './bootstrap/Spinner';
import { BooksAPI, BOOKS } from '../api/Localhost';

function Books() {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api_get_books();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_books = async () => {
    await BooksAPI.get('/')
      .then((response) => {
        setBooks(shuffle_arr(response.data).slice(0, 4));
      })
      .catch((error) => {
        setBooks(shuffle_arr(BOOKS).slice(0, 4));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function shuffle_arr(arr) {
    return arr.sort(() => 0.5 - Math.random());
  }

  const Render = () => {
    if (loading) {
      return <Spinner />;
    }

    if (books && books.length > 0) {
      let books_list = books.map((book, index) => (
        <SingleBook book={book} key={index} />
      ));
      return <div className='row justify-content-center'> {books_list} </div>;
    } else {
      return <Alert>no available books found</Alert>;
    }
  };

  return (
    <section className='related-books my-5 pt-4'>
      <div className='container'>
        <SectionTitle title='related products' subtitle='you may like' />
        <Render />
      </div>
    </section>
  );
}

export default Books;
export { Books };
