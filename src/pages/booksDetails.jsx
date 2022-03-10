import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/js/src/tab';
import Banner from '../components/Banner';
import {
  BooksAPI,
  RELATED_BOOKS,
  BOOKS_REVIEWS,
  get_book_by_id,
  CartAPI,
} from '../api/Localhost';
import useJsonServerToast from '../context/IsJsonServerDown';
import QuantityControlButton from '../components/QuantityControlButton';
import RelatedBooks from '../components/book-details-page/RelatedBooks';
import TabAndNav from '../components/book-details-page/TabAndNav';
import AboutAuthor from '../components/book-details-page/AboutAuthor';
import BookDetailsColumn from '../components/book-details-page/BookDetailsColumn';
import TypesSelect from '../components/book-details-page/TypesSelect';
import CategoryTags from '../components/book-details-page/CategoryTags';

function BooksDetails() {
  let params = useParams();
  const is_jsonServer_down = useContext(useJsonServerToast);
  const reviews_tap_btn_ref = useRef(null);
  const [selectType, setSelectType] = useState('');
  const [quantityNumber, setQuantityNumber] = useState(1);
  const [currentBook, setCurrentBook] = useState(get_book_by_id(params.id));
  const [relatedBooks, setRelatedBooks] = useState(RELATED_BOOKS);
  const [reviews, setReviews] = useState(BOOKS_REVIEWS);

  useEffect(() => {
    if (is_jsonServer_down) {
      setCurrentBook(get_book_by_id(params.id));
    } else {
      api_get_books();
    }
  }, [params]);

  const api_get_books = async () => {
    await BooksAPI.get(`/${params.id}`)
      .then((response) => {
        setApiResponseData(response.data);
      })
      .catch((error) => {
        // handle error
      })
      .then(() => {
        // always executed
      });
  };

  const get_cart_api = () => {
    if (!is_jsonServer_down) {
      CartAPI.get(`/${currentBook.id}`)
        .then((response) => {
          console.log(response);
          set_quantity_api(quantityNumber);
        })
        .catch((error) => {
          if (
            error.toString() === 'Error: Request failed with status code 404'
          ) {
            create_cart_item();
          }
        });
    }
  };

  const set_cart_api = (item_data) => {
    if (!is_jsonServer_down) {
      CartAPI.post(`/`, item_data)
        .then((response) => {
          // console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const set_quantity_api = (quantity) => {
    if (!is_jsonServer_down) {
      CartAPI.patch(`/${currentBook.id}`, { quantity })
        .then((response) => {
          // console.log('changed');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const create_cart_item = () => {
    let cart_data = {
      id: currentBook.id,
      quantity: quantityNumber,
      title: currentBook.title,
      price: currentBook.price,
      img: currentBook.img,
    };
    set_cart_api(cart_data);
  };

  const setApiResponseData = (response_data) => {
    setCurrentBook(response_data);
    setSelectType(currentBook.types[0]);
    setRelatedBooks(response_data.relatedBooks);
    setReviews(currentBook.reviews);
  };

  const book_details_column = () => {
    return (
      <div className='col-md-8 my-3'>
        <div className='wrapper'>
          <BookDetailsColumn
            book={currentBook}
            reviews_length={reviews.length}
            onReviewButtonClick={onReviewButtonClick}
          />
          <form action='' onSubmit={onCartFormSubmit}>
            <TypesSelect
              types={currentBook.types}
              onSelectChange={(e) => setSelectType(e.target.value)}
            />
            <div className='d-flex mt-3'>
              <QuantityControlButton onQuantityChange={setQuantityNumber} />
              <button className='btn btn-aurora mx-4'>Add To Cart</button>
            </div>
          </form>
          <CategoryTags category={currentBook.category} />
          <AboutAuthor author={currentBook.author} />
        </div>
      </div>
    );
  };

  const onReviewButtonClick = (evt) => {
    evt.preventDefault();
    reviews_tap_btn_ref.current.scrollIntoView({ behavior: 'smooth' });
    reviews_tap_btn_ref.current.click();
  };

  const onCartFormSubmit = (evt) => {
    evt.preventDefault();
    if (!is_jsonServer_down) {
      get_cart_api();
    }
  };

  return (
    <>
      <Banner title={currentBook.title} subtitle='products' />
      <section className='book-details-page my-5'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-4 my-3'>
              <div className='img-container'>
                <img
                  src={currentBook.img}
                  alt={currentBook.title}
                  className='img-fluid'
                />
              </div>
            </div>
            {book_details_column()}
          </div>
          <TabAndNav
            currentBook={currentBook}
            reviews_ref={reviews_tap_btn_ref}
            reviews={reviews}
          />
        </div>
      </section>
      <RelatedBooks books={relatedBooks} />
    </>
  );
}

export default BooksDetails;
