import React, { useContext, useLayoutEffect, useState } from 'react';
import { WishlistAPI, get_wishlist_by_userId } from '../api/Localhost';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Context as AuthContext } from '../context/auth';
import Spinner from './bootstrap/Spinner';

function AddToWishList(props) {
  const auth_context = useContext(AuthContext);
  const { currentBook } = props;
  const [loading, setLoading] = useState(true);
  const [userWishlist, setUserWishlist] = useState(null);
  const [currentWishlistItem, setCurrentWishlistItem] = useState(null);

  useLayoutEffect(() => {
    api_get_wishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_wishlist = () => {
    WishlistAPI.get(`?userId=${auth_context.userData.id}`)
      .then((response) => {
        if (response.data.length === 1) {
          onLoadWishlist(response.data[0]);
        }
      })
      .catch((error) => {
        console.log(error);
        let wishlist_item = get_wishlist_by_userId(auth_context.userData.id);
        if (wishlist_item) {
          onLoadWishlist(wishlist_item);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onLoadWishlist = (response_data) => {
    setUserWishlist(response_data);
    if (response_data.items) {
      if (response_data.items[currentBook.id]) {
        setCurrentWishlistItem(response_data.items[currentBook.id]);
      } else {
        setCurrentWishlistItem(null);
      }
    }
  };

  const onAddBtnClick = (evt) => {
    evt.preventDefault();
    setLoading(true);

    let newItemData = {
      title: currentBook.title,
      slug: currentBook.slug,
      image: currentBook.image,
      price: currentBook.price,
      stars: currentBook.stars,
      author: currentBook.author.name,
    };

    if (userWishlist) {
      let newWishlistItems = {
        ...userWishlist.items,
        [currentBook.id]: newItemData,
      };

      WishlistAPI.patch(`/${userWishlist.id}`, {
        items: newWishlistItems,
      })
        .then((response) => {
          onLoadWishlist(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      WishlistAPI.post(`/`, {
        userId: auth_context.userData.id,
        items: { [currentBook.id]: newItemData },
      })
        .then((response) => {
          onLoadWishlist(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onRemoveBtnClick = (evt) => {
    evt.preventDefault();
    setLoading(true);

    let newWishlist = { ...userWishlist.items };
    delete newWishlist[currentBook.id];

    WishlistAPI.patch(`/${userWishlist.id}`, { items: newWishlist })
      .then((response) => {
        onLoadWishlist(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const RenderButton = () => {
    if (currentWishlistItem) {
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
    } else {
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
    }
  };

  if (loading) {
    return <Spinner />;
  } else {
    return <RenderButton />;
  }
}

export default AddToWishList;
