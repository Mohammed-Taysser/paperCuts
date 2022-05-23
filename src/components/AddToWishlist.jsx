import React, { useLayoutEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import {
  createWishlist,
  deleteWishlist,
  getWishlistByBookId,
} from '../api/wishlist.api';
import Alert from './bootstrap/Alert';
import Spinner from './bootstrap/Spinner';

function AddToWishList(props) {
  const { currentBook } = props;
  const [loading, setLoading] = useState(true);
  const [currentWishlist, setCurrentWishlist] = useState(null);
  const [loadingError, setLoadingError] = useState(null);

  useLayoutEffect(() => {
    api_get_wishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_wishlist = async () => {
    await getWishlistByBookId(currentBook._id)
      .then((response) => {
        setCurrentWishlist(response.data);
      })
      .catch((error) => {
        setLoadingError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onAddBtnClick = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    let bookData = {
      title: currentBook.title,
      bookId: currentBook._id,
      slug: currentBook.slug,
      image: currentBook.image,
      price: currentBook.price,
      stars: currentBook.stars,
      author: currentBook.author,
    };

    await createWishlist(bookData)
      .then((response) => {
        setCurrentWishlist(response.data);
      })
      .catch((error) => {
        setLoadingError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onRemoveBtnClick = (evt) => {
    evt.preventDefault();
    setLoading(true);

    deleteWishlist(currentWishlist._id)
      .then(() => {
        setCurrentWishlist(null);
      })
      .catch((error) => {
        setLoadingError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const RenderButton = () => {
    if (currentWishlist) {
      return (
        <a
          href='#remove-from-wishlist'
          className='css-tooltip'
          data-tooltip='remove from wishlist'
          onClick={onRemoveBtnClick}
        >
          <FaHeart className='h4 m-0' />
        </a>
      );
    }
    return (
      <a
        href='#add-to-wishlist'
        className='css-tooltip'
        data-tooltip='add to wishlist'
        onClick={onAddBtnClick}
      >
        <FaRegHeart className='h4 m-0' />
      </a>
    );
  };

  if (loading) {
    return <Spinner />;
  } else if (loadingError) {
    return <Alert sm>{loadingError}</Alert>;
  } else {
    return <RenderButton />;
  }
}

export default AddToWishList;
