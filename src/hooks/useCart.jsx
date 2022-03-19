import { useContext, useEffect, useState } from 'react';
import { CART, CartAPI } from '../api/Localhost';
import { Context as CouponContext } from '../context/coupon';

function useCart() {
  const SHIPPING_PRICE = 50;
  const coupon_context = useContext(CouponContext);
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
    api_get_cart();
  }, []);

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
