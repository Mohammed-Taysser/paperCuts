import { useContext, useEffect, useState } from 'react';
import { CART, CartAPI } from '../api/Localhost';
import { Context as CouponContext } from '../context/coupon';
import useJsonServerToast from '../context/IsJsonServerDown';

function useCart() {
  const SHIPPING_PRICE = 50;
  const coupon_context = useContext(CouponContext);
  const is_jsonServer_down = useContext(useJsonServerToast);
  const [cartItems, setCartItems] = useState(CART);

  const appliedCoupons = coupon_context.coupons || [];

  const TOTAL_CART_PRICE = cartItems.reduce((total, book) => {
    total += book.price * book.quantity;
    return total;
  }, 0);

  const COUPON_PRICE = appliedCoupons.reduce((total, coupon) => {
    total += coupon.value;
    return total;
  }, 0);

  useEffect(() => {
    if (is_jsonServer_down) {
      setCartItems(CART);
    } else {
      api_get_cart();
    }
  }, [is_jsonServer_down]);

  const api_get_cart = async () => {
    await CartAPI.get('/')
      .then((response) => {
        setCartItems(response.data);
      })
      .catch((error) => {
        setCartItems(CART);
      });
  };

  return [SHIPPING_PRICE, COUPON_PRICE, TOTAL_CART_PRICE, cartItems];
}

export default useCart;
