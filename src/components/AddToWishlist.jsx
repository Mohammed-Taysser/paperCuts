import React, { useEffect, useState } from 'react';
import { WishlistAPI, get_wishlist_by_bookId } from '../api/Localhost';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Spinner from './bootstrap/Spinner';

function AddToWishList(props) {
  const { currentBook } = props;
  const [loading, setLoading] = useState(true);
  const [wishListItem, setWishListItem] = useState(null);

  useEffect(() => {
    init_get_wishlist_api();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const init_get_wishlist_api = () => {
    WishlistAPI.get(`?bookId=${currentBook.id}`)
      .then((response) => {
        if (response.data.length === 1) {
          setWishListItem(response.data[0]);
        }
      })
      .catch((error) => {
        let wishlist_item = get_wishlist_by_bookId(currentBook.id);
        if (wishlist_item) {
          setWishListItem(wishlist_item);
        } else {
          setWishListItem(null);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onAddBtnClick = (evt) => {
    evt.preventDefault();
    let item_data = {
      bookId: currentBook.id,
      title: currentBook.title,
      image: currentBook.image,
    };

    setLoading(true);

    WishlistAPI.post(`/`, item_data)
      .then((response) => {
        setWishListItem(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onRemoveBtnClick = (evt) => {
    evt.preventDefault();
    setLoading(true);
    WishlistAPI.delete(`/${wishListItem.id}`)
      .then((response) => {
        // console.log('');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const RenderButton = () => {
    return wishListItem ? (
      <a
        href='#remove-from-wishlist'
        className='css-tooltip'
        data-tooltip='remove from wishlist'
        onClick={onRemoveBtnClick}
      >
        <FaHeart className='h4 m-0' />
      </a>
    ) : (
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
  } else {
    return (
      <div>
        <RenderButton />
      </div>
    );
  }
}

export default AddToWishList;
