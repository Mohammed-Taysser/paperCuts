import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBookBySlug, getRelatedBooks } from '../../api/books.api';
import { diff_in_days, Stars } from '../../components/ManipulateData';
import { Context as AuthContext } from '../../context/auth';
import AddToCart from '../../components/AddToCart';
import AddToWishList from '../../components/AddToWishlist';
import Alert from '../../components/bootstrap/Alert';
import Spinner from '../../components/bootstrap/Spinner';
import InlineCategoryTags from '../../components/standalone/InlineCategoryTags';
import SectionTitle from '../../components/standalone/SectionTitle';
import TabAndNav from '../../components/TabAndNav';
import usePageTitle from '../../hooks/usePageTitle';
import BookList from '../../components/standalone/BookList';
import WithBanner from '../../layout/WithBanner';
import '../../assets/scss/pages/bookDetails.scss';

function BooksDetails() {
  const [, setPageTitle] = usePageTitle('Book Details');
  const { slug } = useParams();
  const auth_context = useContext(AuthContext);
  const [currentBook, setCurrentBook] = useState(null);
  const [isLoading, setIsLoading] = useState({
    books: true,
    relatedBooks: true,
  });
  const [loadingError, setLoadingError] = useState({
    books: null,
    relatedBooks: null,
  });
  const [relatedBooks, setRelatedBooks] = useState([]);

  useEffect(() => {
    api_get_book();
    api_get_related_books();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const api_get_book = async () => {
    await getBookBySlug(slug)
      .then((response) => {
        setCurrentBook(response.data);
        setPageTitle(response.data.title);
      })
      .catch((error) => {
        setLoadingError((loadError) => ({ ...loadError, books: error }));
      })
      .finally(() => {
        setIsLoading((load) => ({ ...load, books: false }));
      });
  };

  const api_get_related_books = async () => {
    await getRelatedBooks()
      .then((response) => {
        setRelatedBooks(response.data);
      })
      .catch((error) => {
        setLoadingError((loadError) => ({ ...loadError, books: error }));
      })
      .finally(() => {
        setIsLoading((load) => ({ ...load, relatedBooks: false }));
      });
  };

  const BookNewBadge = () => {
    if (currentBook.publishedAt) {
      const DAYS_NUMBER = 7;
      if (diff_in_days(new Date(), currentBook.publishedAt) < DAYS_NUMBER) {
        return (
          <small className='badge rounded-pill bg-warning mx-1'>new</small>
        );
      }
    }
    return <></>;
  };

  const BookBadgeSellerBadge = () => {
    if (currentBook.reviews) {
      const REVIEWS_NUMBER = 5;
      if (currentBook.reviews >= REVIEWS_NUMBER) {
        return (
          <small className='badge rounded-pill bg-info mx-1'>best seller</small>
        );
      }
    }
    return <></>;
  };

  const ShowCartBtn = () => {
    if (auth_context.isAuth) {
      return (
        <AddToCart currentBook={currentBook} userData={auth_context.userData} />
      );
    }
    return (
      <Alert sm>
        <Link to='/login' className='alert-link mx-1'>
          login
        </Link>
        to active add to cart
      </Alert>
    );
  };

  const BookDetailsColumn = () => {
    return (
      <div className='col-md-8 my-3'>
        <div className='wrapper'>
          <div className='d-flex align-items-start justify-content-between'>
            <span className='special-small-title'>
              publisher: {currentBook.publisher || 'not provide'}
            </span>
            {auth_context.isAuth && <AddToWishList currentBook={currentBook} />}
          </div>
          <div className='d-flex align-items-start'>
            <h1 className='h2 mb-2'>{currentBook.title} </h1>
            <BookNewBadge />
            <BookBadgeSellerBadge />
          </div>
          <div className='d-flex align-items-end'>
            {currentBook.stars && <Stars stars_length={currentBook.stars} />}
            <span className='small mx-4 text-muted special-small-title'>
              ({currentBook.reviews}reviews)
            </span>
          </div>
          <p className='mt-2 h4'>{currentBook.price}$</p>
          <p className='mt-3 text-muted'>{currentBook.info || 'no info'}</p>
          <ShowCartBtn />
          <InlineCategoryTags category={currentBook.category} />
          <div className='mt-3'>
            <div className='d-md-flex align-items-center'>
              <Link to={`/authors/${currentBook.author.username}`}>
                <img
                  src={currentBook.author.avatar}
                  alt={`${currentBook.author.name}`}
                  width='80'
                  height='80'
                  className='img-fluid rounded-circle border-aurora p-1 mb-2 mb-md-0'
                />
              </Link>
              <div className=' mx-3'>
                <h5 className='mb-1'>
                  <Link to={`/authors/${currentBook.author.username}`}>
                    {currentBook.author.name}
                  </Link>
                </h5>
                <h6 className='m-0 text-muted'>
                  {currentBook.author.username}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RelatedBooks = () => {
    if (isLoading.relatedBooks) {
      return <Spinner />;
    } else if (loadingError.relatedBooks) {
      return <Alert> Error While Loading Related Books </Alert>;
    } else if (relatedBooks && relatedBooks.length > 0) {
      return (
        <div className='my-5 pt-5'>
          <SectionTitle title='related books' subtitle='you may like' />
          <BookList books={relatedBooks} />
        </div>
      );
    } else {
      return <Alert> no books found </Alert>;
    }
  };

  const RenderBook = () => {
    if (isLoading.books) {
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
          <TabAndNav currentBook={currentBook} />
          <RelatedBooks />
        </>
      );
    } else {
      return <Alert> no book found </Alert>;
    }
  };

  return (
    <WithBanner
      title={currentBook ? currentBook.title : 'book details'}
      subtitle='products'
    >
      <section className='book-details-page my-5'>
        <div className='container'>
          <RenderBook />
        </div>
      </section>
    </WithBanner>
  );
}

export default BooksDetails;
