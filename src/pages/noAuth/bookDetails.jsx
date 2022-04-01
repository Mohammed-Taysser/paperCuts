import React, { useEffect, useRef, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BooksAPI, get_book_by_slug } from '../../api/Localhost';
import AboutAuthor from '../../components/AboutAuthor';
import AddToCart from '../../components/AddToCart';
import AddToWishList from '../../components/AddToWishlist';
import Banner from '../../components/standalone/Banner';
import Alert from '../../components/bootstrap/Alert';
import Spinner from '../../components/bootstrap/Spinner';
import GetBookByCategory from '../../components/GetBookByCategory';
import InlineCategoryTags from '../../components/InlineCategoryTags';
import { diff_in_days, Stars } from '../../components/ManipulateData';
import { Context as AuthContext } from '../../context/auth';
import SectionTitle from '../../components/standalone/SectionTitle';
import TabAndNav from '../../components/TabAndNav';
import usePageTitle from '../../hooks/usePageTitle';

function BooksDetails() {
  const [, setPageTitle] = usePageTitle('Book Details');
  let { slug } = useParams();
  const auth_context = useContext(AuthContext);
  const reviews_tap_btn_ref = useRef(null);
  const [currentBook, setCurrentBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api_get_book();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const api_get_book = async () => {
    await BooksAPI.get(`?slug=${slug}`)
      .then((response) => {
        if (response.data.length === 1) {
          setCurrentBook(response.data[0]);
          setPageTitle(response.data[0].title);
        }
      })
      .catch((error) => {
        let temp_book = get_book_by_slug(slug);
        if (temp_book) {
          setCurrentBook(temp_book);
          setPageTitle(temp_book.title);
        }
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
            {auth_context.isAuth && <AddToWishList currentBook={currentBook} />}
          </div>
          <div className='d-flex align-items-start'>
            <h1 className='h2 mb-2'>{currentBook.title} </h1>
            <BookBadge />
          </div>
          <div className='d-flex align-items-end'>
            <Stars stars_length={currentBook.stars} />
            <a
              className='small mx-4 text-muted special-small-title'
              href='#reviews'
              onClick={onReviewButtonClick}
            >
              (reviews)
            </a>
          </div>
          <p className='mt-2 h4'>{currentBook.price}$</p>
          <p className='mt-3 text-muted'>{currentBook.info}</p>
          {auth_context.isAuth && (
            <AddToCart
              currentBook={currentBook}
              userData={auth_context.userData}
            />
          )}
          <InlineCategoryTags category={currentBook.category} />
          <AboutAuthor id={currentBook.author.id} />
        </div>
      </div>
    );
  };

  const RelatedBooks = () => {
    return (
      <div className='my-5 pt-5'>
        <SectionTitle title='related books' subtitle='you may like' />
        <GetBookByCategory getBy={currentBook.category} />
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
          />
          <RelatedBooks />
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
    </>
  );
}

export default BooksDetails;
