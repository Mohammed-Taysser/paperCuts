import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BooksAPI, get_book_by_slug } from '../api/Localhost';
import AboutAuthor from '../components/AboutAuthor';
import AddToCart from '../components/AddToCart';
import AddToWishList from '../components/AddToWishlist';
import Banner from '../components/Banner';
import Alert from '../components/bootstrap/Alert';
import Spinner from '../components/bootstrap/Spinner';
import InlineCategoryTags from '../components/InlineCategoryTags';
import { diff_in_days, Stars } from '../components/ManipulateData';
import TabAndNav from '../components/TabAndNav';
import { Books as RelatedBooks } from '../components/Books';

function BooksDetails() {
  let { slug } = useParams();
  const reviews_tap_btn_ref = useRef(null);
  const [currentBook, setCurrentBook] = useState(null);
  const [reviewsLength, setReviewsLength] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api_get_books();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const api_get_books = async () => {
    await BooksAPI.get(`?slug=${slug}`)
      .then((response) => {
        if (response.data.length === 1) {
          setCurrentBook(response.data[0]);
        }
      })
      .catch((error) => {
        setCurrentBook(get_book_by_slug(slug));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const BookBadge = () => {
    const DAYS_NUMBER = 7;
    if (diff_in_days(new Date(), currentBook.publishedAt) < DAYS_NUMBER) {
      return <small className='badge rounded-pill bg-warning mx-3'>new</small>;
    }
    return <></>;
  };

  const BookDetailsColumn = () => {
    return (
      <div className='col-md-8 my-3'>
        <div className='wrapper'>
          <div className='d-flex align-items-start justify-content-between'>
            <span className='special-small-title'>
              publisher: {currentBook.publisher}
            </span>
            <AddToWishList currentBook={currentBook} />
          </div>
          <div className='d-flex align-items-start'>
            <h1 className='h2 mb-2'>{currentBook.title} </h1>
            <BookBadge />
          </div>
          <div className='d-flex align-items-end'>
            {<Stars stars_length={currentBook.stars} />}
            <a
              className='small mx-4 text-muted special-small-title'
              href='#reviews'
              onClick={onReviewButtonClick}
            >
              ({reviewsLength !== null && reviewsLength} reviews)
            </a>
          </div>
          <p className='mt-2 h4'>{currentBook.price}$</p>
          <p className='mt-3 text-muted'>{currentBook.info}</p>
          <AddToCart currentBook={currentBook} />
          <InlineCategoryTags category={currentBook.category} />
          <AboutAuthor id={currentBook.author.id} />
        </div>
      </div>
    );
  };

  const onReviewButtonClick = (evt) => {
    evt.preventDefault();
    reviews_tap_btn_ref.current.scrollIntoView({ behavior: 'smooth' });
    reviews_tap_btn_ref.current.click();
  };

  const Render = () => {
    if (loading) {
      return <Spinner />;
    }
    if (currentBook) {
      return (
        <>
          <div className='row justify-content-center'>
            <div className='col-md-4 my-3'>
              <div className='img-container'>
                <img
                  src={currentBook.image}
                  alt={currentBook.title}
                  className='img-fluid'
                />
              </div>
            </div>
            <BookDetailsColumn />
          </div>
          <TabAndNav
            currentBook={currentBook}
            reviews_ref={reviews_tap_btn_ref}
            setReviewsLength={setReviewsLength}
          />
        </>
      );
    } else {
      return <Alert> no book exist </Alert>;
    }
  };

  return (
    <>
      <Banner
        title={currentBook ? currentBook.title : 'book details'}
        subtitle='products'
      />
      <section className='book-details-page my-5'>
        <div className='container'>
          <Render />
        </div>
      </section>
      <RelatedBooks />
    </>
  );
}

export default BooksDetails;
