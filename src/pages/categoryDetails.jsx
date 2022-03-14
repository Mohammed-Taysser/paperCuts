import React, { useState, useEffect } from 'react';
import { CategoryAPI, BOOKS, get_category_by_slug } from '../api/Localhost';
import { useParams } from 'react-router-dom';
import Banner from '../components/Banner';
import SingleBook from '../components/single/SingleBook';
import Alert from '../components/bootstrap-component/Alert';
import Spinner from '../components/bootstrap-component/Spinner';

function CategoryDetails() {
  const { slug } = useParams();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [booksByCategory, setBooksByCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api_get_category();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_category = async () => {
    await CategoryAPI.get(`?slug_like=${slug}`)
      .then((response) => {
        if (response.data.length === 1) {
          setCurrentCategory(response.data[0]);
          get_category_books(response.data[0].id);
        }
      })
      .catch((error) => {
        let cty = get_category_by_slug(slug);
        setCurrentCategory(cty);
        get_category_books(cty);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const get_category_books = (cty) => {
    setCurrentCategory(cty);
    let books = BOOKS.filter((book) => book.category.includes(cty.id));
    setBooksByCategory([...new Set(books)]);
  };

  const BookList = () => {
    if (currentCategory) {
      if (booksByCategory.length > 0) {
        return (
          <div className='row mt-4 justify-content-center align-items-center align-items-stretch'>
            {booksByCategory.map((book, index) => (
              <SingleBook book={book} key={index} />
            ))}
          </div>
        );
      }
      return (
        <Alert>
          no books available with '{currentCategory.title}' category
        </Alert>
      );
    }
    return <Alert>no category found</Alert>;
  };

  return (
    <>
      <Banner
        title={currentCategory ? currentCategory.title : 'category'}
        subtitle='shop list'
      />
      <section className='author-books my-5 py-5'>
        <div className='container '>{loading ? <Spinner /> : <BookList />}</div>
      </section>
    </>
  );
}

export default CategoryDetails;
