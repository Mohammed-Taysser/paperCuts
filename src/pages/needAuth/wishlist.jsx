import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { WishlistAPI, get_wishlist_by_userId } from '../../api/Localhost';
import { Context as AuthContext } from '../../context/auth';
import SingleBook from '../../components/single/SingleBook';
import Banner from '../../components/Banner';
import Alert from '../../components/bootstrap/Alert';
import { RowOfPlaceholderCard } from '../../components/bootstrap/Placeholder';
import usePageTitle from '../../hooks/usePageTitle';

function Wishlist() {
  usePageTitle('Wishlist');
  const auth_context = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api_get_wishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_wishlist = () => {
    WishlistAPI.get(`?userId=${auth_context.userData.id}`)
      .then((response) => {
        if (response.data.length === 1) {
          setWishlistItems(response.data[0].items);
        } else {
          setWishlistItems({});
        }
      })
      .catch((err) => {
        let temp_items = get_wishlist_by_userId(auth_context.userData.id);
        if (temp_items) {
          setWishlistItems(temp_items.items);
        } else {
          setWishlistItems({});
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const Render = () => {
    if (loading) {
      return <RowOfPlaceholderCard num={6} />;
    }
    if (wishlistItems && Object.keys(wishlistItems).length > 0) {
      let wish_list_items = [];

      for (const bookId in wishlistItems) {
        if (Object.hasOwnProperty.call(wishlistItems, bookId)) {
          wish_list_items.push(
            <SingleBook
              book={{ ...wishlistItems[bookId], id: bookId }}
              key={bookId}
            />
          );
        }
      }

      return (
        <div className='row justify-content-center'> {wish_list_items} </div>
      );
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
        <Render />
      </div>
    </>
  );
}

export default Wishlist;
