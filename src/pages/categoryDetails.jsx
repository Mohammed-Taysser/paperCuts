import React, { useState, useEffect } from 'react';
import { BooksAPI, BOOKS } from '../api/Localhost';
import { useParams } from 'react-router-dom';
import Banner from '../components/Banner';
import SingleBook from '../components/SingleBook';
import JsonServerToast from '../components/JsonServerToast';
import Alert from '../components/bootstrap-component/Alert';

function CategoryDetails() {
  const { title: categoryTitle } = useParams();
  const [jsonServerIsDown, setJsonServerIsDown] = useState(false);
  const [booksByCategory, setBooksByCategory] = useState([]);

  useEffect(() => {
    api_get_books();
  }, []);

  const api_get_books = async () => {
    await BooksAPI.get('/')
      .then(function (response) {
        // handle success
        setJsonServerIsDown(false);
        setBooksByCategory(get_category_books(response.data));
      })
      .catch(function (error) {
        // handle error
        if (error.toString() === 'Error: Network Error') {
          setJsonServerIsDown(true);
          setBooksByCategory(get_category_books(BOOKS));
        }
      })
      .then(function () {
        // always executed
      });
  };

  const get_category_books = (response_book) => {
    return response_book.filter((book) =>
      book.category.includes(categoryTitle)
    );
  };

  const book_list = () => {
    if (booksByCategory.length > 0) {
      return booksByCategory.map((book) => {
        return <SingleBook book={book} key={book.id} />;
      });
    }
    return (
      <Alert color='warning'>
        no books available with '{categoryTitle}' category
      </Alert>
    );
  };

  return (
    <>
      {jsonServerIsDown && <JsonServerToast />}
      <Banner title='category title' subtitle='shop list' />
      <section className='author-books my-5 py-5'>
        <div className='container p-xs-0 px-5 px-md-0'>
          <div className='row mt-4 justify-content-center align-items-center align-items-stretch'>
            {book_list()}
          </div>
        </div>
      </section>
    </>
  );
}

export default CategoryDetails;
