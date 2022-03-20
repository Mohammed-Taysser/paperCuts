import React, { useEffect, useContext, useState } from 'react';
import { WishlistAPI, get_wishlist_by_userId } from '../api/Localhost';
import { Context as AuthContext } from '../context/auth';
import SingleBook from '../components/single/SingleBook';
import Banner from '../components/Banner';
import Alert from '../components/bootstrap/Alert';
import Spinner from '../components/bootstrap/Spinner';

function Wishlist() {
  const auth_context = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api_get_wishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_wishlist = () => {
    WishlistAPI.get(`?userId=${auth_context.userData.id}`)
      .then((response) => {
        setWishlistItems(response.data);
      })
      .catch((err) => {
        setWishlistItems(get_wishlist_by_userId(auth_context.userData.id));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const Render = () => {
    if (loading) {
      return <Spinner />;
    }
    if (wishlistItems && wishlistItems.length > 0) {
      let wish_list_items = wishlistItems.map((item, index) => (
        <SingleBook book={item} key={index} />
      ));
      return (
        <div className='row justify-content-center'> {wish_list_items} </div>
      );
    } else {
      return <Alert>no items added yet</Alert>;
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
