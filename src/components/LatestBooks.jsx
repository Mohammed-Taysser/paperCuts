import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { LATEST_BOOKS, BooksAPI } from '../api/Localhost';
import useJsonServerToast from '../context/IsJsonServerDown';
import SectionTitle from './SectionTitle';
import SingleBook from './SingleBook';

function LatestBooks() {
  const is_jsonServer_down = useContext(useJsonServerToast);
  const [books, setBooks] = useState(LATEST_BOOKS);

  useEffect(() => {
    if (is_jsonServer_down) {
      setBooks(LATEST_BOOKS);
    } else {
      api_get_latest_books();
    }
  }, [is_jsonServer_down]);

  const api_get_latest_books = async () => {
    await BooksAPI.get('/')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        setBooks(LATEST_BOOKS);
      });
  };

  const book_list = () => {
    if (books.length > 0) {
      return books.map((book) => {
        return (
          <SingleBook
            book={{
              id: book.id,
              title: book.title,
              img: book.img,
              author: book.author.name,
              price: book.price,
              stars: book.stars,
            }}
            key={book.id}
          />
        );
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
