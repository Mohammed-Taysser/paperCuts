import React, { useEffect, useState } from 'react';
import SingleBook from '../components/single/SingleBook';
import { BOOKS, BooksAPI } from '../api/Localhost';
import RightSidebar from '../components/layout/RightSidebar';
import Spinner from '../components/bootstrap-component/Spinner';
import SearchForm from '../components/SearchForm';
import Alert from '../components/bootstrap-component/Alert';

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    api_get_books();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_books = async () => {
    await BooksAPI.get('/')
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data);
      })
      .catch((error) => {
        setBooks(BOOKS);
        setFilteredBooks(BOOKS);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const BookList = () => {
    if (filteredBooks.length > 0) {
      let book_list = filteredBooks.map((book) => {
        return <SingleBook book={book} key={book.id} />;
      });

      return (
        <div className='row justify-content-center align-items-stretch'>
          {book_list}
        </div>
      );
    }
    return <Alert>No Books Found</Alert>;
  };

  const RenderBooks = () => {
    return loading ? <Spinner /> : <BookList />;
  };

  return (
    <RightSidebar title='shop list' subtitle='products'>
      <SearchForm
        setLoading={setLoading}
        books={books}
        filteredBooks={filteredBooks}
        setFilteredBooks={setFilteredBooks}
      />
      <RenderBooks />
    </RightSidebar>
  );
}

export default Books;
