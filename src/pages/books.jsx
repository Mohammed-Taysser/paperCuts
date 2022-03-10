import React, { useState, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SingleBook from '../components/SingleBook';
import { BOOKS, BooksAPI } from '../api/Localhost';
import useJsonServerToast from '../context/IsJsonServerDown';
import RightSidebar from '../components/layout/RightSidebar';
import Pagination from '../components/Pagination';

function Books() {
  const LIMIT = 9;
  const [searchParams, setSearchParams] = useSearchParams();
  const is_jsonServer_down = useContext(useJsonServerToast);
  const [pageNumber, setPageNumber] = useState(searchParams.get('_page') || 1);
  const [books, setBooks] = useState(BOOKS);

  const [paginationHeaderSting, setPaginationHeaderSting] = useState('');

  useEffect(() => {
    initRender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is_jsonServer_down]);

  const initRender = () => {
    if (is_jsonServer_down) {
      setBooks(BOOKS);
    } else {
      api_get_books(`?_limit=${LIMIT}&_page=${pageNumber}`);
    }
  };

  useEffect(() => {
    if (pageNumber !== searchParams.get('_page')) {
      api_get_books(`?_limit=${LIMIT}&_page=${pageNumber}`);
    }
  }, [pageNumber]);

  const api_get_books = async (url) => {
    await BooksAPI.get(url)
      .then((response) => {
        setBooks(response.data);
        setPaginationHeaderSting(response.headers.link);
      })
      .catch((error) => {
        setBooks(BOOKS);
      });
  };

  const BookList = () => {
    let book_list = books.map((book) => {
      return <SingleBook book={book} key={book.id} col={4} />;
    });

    return (
      <div className='row justify-content-center align-items-stretch'>
        {book_list}
      </div>
    );
  };

  return (
    <RightSidebar title='shop list' subtitle='products'>
      <div className='text-muted'>
        Showing <span className='text-aurora'> {books.length} </span>
        results
      </div>
      <BookList />
      <Pagination
        onPageNumberChange={setPageNumber}
        headerString={paginationHeaderSting}
      />
    </RightSidebar>
  );
}

export default Books;
