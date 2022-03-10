import React, { useState, useContext, useEffect } from 'react';
import {
  BOOKS_CATEGORY,
  get_category_by_id,
  CategoryAPI,
} from '../api/Localhost';
import { useParams } from 'react-router-dom';
import Banner from '../components/Banner';
import SingleBook from '../components/SingleBook';
import Alert from '../components/bootstrap-component/Alert';
import useJsonServerToast from '../context/IsJsonServerDown';

function CategoryDetails() {
  const { id: categoryId } = useParams();
  const is_jsonServer_down = useContext(useJsonServerToast);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [booksByCategory, setBooksByCategory] = useState([]);

  useEffect(() => {
    if (is_jsonServer_down) {
      let get_category = get_category_by_id(categoryId);
      if (get_category) {
        setCurrentCategory(get_category);
        setBooksByCategory(BOOKS_CATEGORY);
      }
    } else {
      api_get_category();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is_jsonServer_down]);

  const api_get_category = async () => {
    await CategoryAPI.get(`/${categoryId}`)
      .then((response) => {
        // handle success
        setCurrentCategory(response.data);
        setBooksByCategory(response.data.books);
      })
      .catch((error) => {
        // handle error
      })
      .then(() => {
        // always executed
      });
  };

  const book_list = () => {
    if (currentCategory) {
      if (booksByCategory.length > 0) {
        return booksByCategory.map((book, index) => {
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
              key={index}
            />
          );
        });
      }
      return (
        <Alert color='warning'>
          no books available with '{currentCategory.title}' category
        </Alert>
      );
    }
    return <Alert color='warning'>no category found</Alert>;
  };

  return (
    <>
      <Banner
        title={currentCategory ? currentCategory.title : 'category'}
        subtitle='shop list'
      />
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
