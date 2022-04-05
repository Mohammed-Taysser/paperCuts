import { useContext, useEffect, useState } from 'react';
import { CartAPI, get_cart_by_userId } from '../api/Localhost';
import { Context as AuthContext } from '../context/auth';
import { Context as CouponContext } from '../context/coupon';

/**
 * hook for dealing with Cart items
 * @returns {Array}
 */
function useCart() {
  const SHIPPING_PRICE = 50;
  const coupon_context = useContext(CouponContext);
  const auth_context = useContext(AuthContext);
  const appliedCoupons = coupon_context.coupons || [];
  const [userCart, setUserCart] = useState({});
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [couponsPrice, setCouponsPrice] = useState(0);

  useEffect(() => {
    api_get_cart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let coupon_price = appliedCoupons.reduce((total, coupon) => {
      total += coupon.value;
      return total;
    }, 0);

    setCouponsPrice(coupon_price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coupon_context.coupons]);

  const api_get_cart = async () => {
    await CartAPI.get(`/?userId=${auth_context.userData.id}`)
      .then((response) => {
        onCartItemsLoad(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
        onCartItemsLoad(get_cart_by_userId(auth_context.userData.id));
      });
  };

  const onCartItemsLoad = (cart) => {
    if (cart && cart.items) {
      setUserCart(cart);
      init_data(cart.items);
    }
  };

  const init_data = (cart_items) => {
    let total_cart_price = 0;
    for (const book in cart_items) {
      if (Object.hasOwnProperty.call(cart_items, book)) {
        total_cart_price +=
          cart_items[book]['quantity'] * cart_items[book]['price'];
      }
    }

    let coupon_price = appliedCoupons.reduce((total, coupon) => {
      total += coupon.value;
      return total;
    }, 0);

    setCouponsPrice(coupon_price);
    setTotalCartPrice(total_cart_price);
  };

  return [SHIPPING_PRICE, couponsPrice, totalCartPrice, userCart, setUserCart];
}

export default useCart;
