import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllAuthorWishlist } from '../../api/wishlist.api';
import { RowOfPlaceholderCard } from '../../components/bootstrap/Placeholder';
import Banner from '../../components/standalone/Banner';
import Alert from '../../components/bootstrap/Alert';
import usePageTitle from '../../hooks/usePageTitle';
import BookList from '../../components/standalone/BookList';

function Wishlist() {
  usePageTitle('Wishlist');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);

  useEffect(() => {
    api_get_wishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_wishlist = () => {
    getAllAuthorWishlist()
      .then((response) => {
        setWishlistItems(response.data);
      })
      .catch((error) => {
        setLoadingError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const RenderWishlist = () => {
    if (loading) {
      return <RowOfPlaceholderCard num={6} />;
    } else if (loadingError) {
      return <Alert>{loadingError}</Alert>;
    } else if (wishlistItems && wishlistItems.length > 0) {
      return <BookList books={wishlistItems} />;
    } else {
      return (
        <Alert>
          no items added yet. see
          <Link to='/books' className='alert-link mx-1'>
            books
          </Link>
          or
          <Link to='/category' className='alert-link mx-1'>
            category
          </Link>
        </Alert>
      );
    }
  };

  return (
    <>
      <Banner title='wishlist' subtitle='favorites' />
      <div className='container my-5 py-5'>
        <RenderWishlist />
      </div>
    </>
  );
}

export default Wishlist;
