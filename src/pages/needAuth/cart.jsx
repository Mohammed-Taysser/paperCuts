import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCheck2Circle } from 'react-icons/bs';
import { CartAPI, get_cart_by_userId } from '../../api/Localhost';
import { Context as CouponContext } from '../../context/coupon';
import { Context as AuthContext } from '../../context/auth';
import Banner from '../../components/standalone/Banner';
import Quantity from '../../components/Quantity';
import CartCoupon from '../../components/CartCoupon';
import Alert from '../../components/bootstrap/Alert';
import GetBookByCategory from '../../components/GetBookByCategory';
import SectionTitle from '../../components/standalone/SectionTitle';
import usePageTitle from '../../hooks/usePageTitle';

const SHIPPING_PRICE = 50;

function Cart() {
  usePageTitle('Cart');
  const coupon_context = useContext(CouponContext);
  const auth_context = useContext(AuthContext);
  const appliedCoupons = coupon_context.coupons || [];
  const [userCart, setUserCart] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [isLoading, setIsLoading] = useState({});
  const [isSaved, setIsSaved] = useState({});

  useEffect(() => {
    api_get_cart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let coupon_price = appliedCoupons.reduce((total, coupon) => {
      total += coupon.value;
      return total;
    }, 0);

    setDiscount(coupon_price);
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
      calculateDiscountAndTotalPay(cart.items);
    }
  };

  const calculateDiscountAndTotalPay = (cart_items) => {
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

    setDiscount(coupon_price);
    setTotalPay(total_cart_price);
  };

  const onQuantityChange = (quantity, bookId) => {
    setIsSaved({ ...isSaved, [bookId]: false });
    let current_book = { ...userCart.items[bookId], quantity };
    set_quantity_api({ ...userCart.items, [bookId]: current_book }, bookId);
  };

  const set_quantity_api = (items, bookId) => {
    setIsLoading({ ...isLoading, [bookId]: true });
    CartAPI.patch(`/${userCart.id}`, { items })
      .then((response) => {
        setIsSaved({ ...isSaved, [bookId]: true });
        let newCartItems = { ...userCart.items };
        newCartItems[bookId].quantity = response.data.items[bookId].quantity;
        setUserCart({ ...userCart, items: newCartItems });
        calculateDiscountAndTotalPay(newCartItems);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading({ ...isLoading, [bookId]: false });
      });
  };

  const delete_cart_api = (bookId) => {
    setIsLoading({ ...isLoading, [bookId]: true });
    let items_without_book = { ...userCart.items };
    delete items_without_book[bookId];
    set_quantity_api(items_without_book, bookId);
  };

  const RenderBooksTableRows = () => {
    if (Object.keys(userCart.items).length > 0) {
      let cart_items_table = [],
        index = 0;
      for (const key in userCart.items) {
        if (Object.hasOwnProperty.call(userCart.items, key)) {
          index++;
          cart_items_table.push(
            <tr key={index}>
              <th scope='row'>{index}</th>
              <td className='td-title'>
                <img
                  src={userCart.items[key].image}
                  alt={userCart.items[key].title}
                  className='img-fluid'
                  width={70}
                  height={100}
                />
                <Link
                  to={`/books/${userCart.items[key].slug}`}
                  className='mx-2'
                >
                  {userCart.items[key].title}
                </Link>
              </td>
              <td className='td-price'> {userCart.items[key].price}$ </td>
              <td className='td-quantity'>
                {isSaved[key] && (
                  <small className='text-muted'>
                    <BsCheck2Circle className='h6 mb-1' /> updated
                  </small>
                )}
                <Quantity
                  loading={isLoading[key]}
                  initQuantity={userCart.items[key].quantity}
                  onQuantityChange={(quantity) =>
                    onQuantityChange(quantity, key)
                  }
                />
              </td>
              <td className='td-total'>
                {(
                  userCart.items[key].price * userCart.items[key].quantity
                ).toFixed(2)}
                $
              </td>
              <td className="td-price'">
                <button
                  className='btn-close'
                  onClick={() => delete_cart_api(key)}
                  type='button'
                ></button>
              </td>
            </tr>
          );
        }
      }

      return <>{cart_items_table}</>;
    } else {
      return (
        <tr>
          <td colSpan={6}>
            <h4 className='m-0'>no cart items found</h4>
          </td>
        </tr>
      );
    }
  };

  const BooksTable = () => {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>book</th>
            <th scope='col'>Price</th>
            <th scope='col'>Quantity</th>
            <th scope='col' colSpan={2}>
              Subtotal
            </th>
          </tr>
        </thead>
        <tbody>
          <RenderBooksTableRows />
        </tbody>
      </table>
    );
  };

  const BasketTable = () => {
    const total_to_pay = SHIPPING_PRICE + totalPay - discount;
    let show_price = null;
    if (total_to_pay > 0) {
      show_price = total_to_pay.toFixed(2);
    } else {
      show_price = (
        <>
          <small className='text-decoration-line-through'>
            {(SHIPPING_PRICE + totalPay).toFixed(2)}
          </small>
          <strong>Free</strong>
        </>
      );
    }
    return (
      <table className='table'>
        <tbody>
          <tr>
            <td>
              <h6>Subtotal</h6>
            </td>
            <td>
              <span> ${totalPay.toFixed(2)}</span>
            </td>
          </tr>
          <tr>
            <td>
              <h6>Shipping</h6>
            </td>
            <td>
              <span> Shipping Flat rate: ${SHIPPING_PRICE}</span>
            </td>
          </tr>
          <tr>
            <td>
              <h6>Total</h6>
            </td>
            <td>
              <span className='text-aurora'>${show_price}</span>
              {discount > 0 && (
                <small className='text-warning ms-2'>(-{discount})</small>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const Render = () => {
    if (userCart && userCart.items && Object.keys(userCart.items).length > 0) {
      return (
        <>
          <div className='table-responsive'>
            <BooksTable />
          </div>
          <CartCoupon />
          <div className='row'>
            <div className='col-md-6'>
              <div className='cart-total'>
                <h2 className='my-3'>Basket totals</h2>
                <div className='table-responsive'>
                  <BasketTable />
                </div>
                <Link to='/checkout' className='btn btn-aurora btn-lg mt-4'>
                  process to checkout
                </Link>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className='mb-5'>
            <Alert>no items exist</Alert>
          </div>
          <SectionTitle title='new released' subtitle='you my like' />
          <GetBookByCategory />
        </>
      );
    }
  };

  return (
    <>
      <Banner title='cart' subtitle='info' />
      <section className='cart-page my-5 py-5'>
        <div className='container'>
          <Render />
        </div>
      </section>
    </>
  );
}

export default Cart;
