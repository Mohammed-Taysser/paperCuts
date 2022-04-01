import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsCheck2Circle } from 'react-icons/bs';
import { CartAPI } from '../../api/Localhost';
import { Context as AuthContext } from '../../context/auth';
import Banner from '../../components/standalone/Banner';
import Quantity from '../../components/Quantity';
import CartCoupon from '../../components/CartCoupon';
import useCart from '../../hooks/useCart';
import Alert from '../../components/bootstrap/Alert';
import GetBookByCategory from '../../components/GetBookByCategory';
import SectionTitle from '../../components/standalone/SectionTitle';
import usePageTitle from '../../hooks/usePageTitle';

function Cart() {
  usePageTitle('Cart');
  const auth_context = useContext(AuthContext);
  const [SHIPPING_PRICE, COUPON_PRICE, TOTAL_CART_PRICE, CART_ITEMS] =
    useCart();
  const [isLoading, setIsLoading] = useState({});
  const [isSaved, setIsSaved] = useState({});

  const onQuantityChange = (quantity, bookId) => {
    setIsSaved({ ...isSaved, [bookId]: false });
    let current_book = { ...CART_ITEMS[bookId], quantity };
    set_quantity_api({ ...CART_ITEMS, [bookId]: current_book }, bookId);
  };

  const set_quantity_api = (items, bookId) => {
    setIsLoading({ ...isLoading, [bookId]: true });
    CartAPI.patch(`/${auth_context.userData.id}`, { items })
      .then((response) => {
        setIsSaved({ ...isSaved, [bookId]: true });
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
    let items_without_book = { ...CART_ITEMS };
    delete items_without_book[bookId];
    set_quantity_api(items_without_book, bookId);
  };

  const RenderTableBooksRows = () => {
    let cart_items_table = [],
      index = 0;
    for (const key in CART_ITEMS) {
      if (Object.hasOwnProperty.call(CART_ITEMS, key)) {
        index++;
        cart_items_table.push(
          <tr key={index}>
            <th scope='row'>{index}</th>
            <td className='td-title'>
              <img
                src={CART_ITEMS[key].image}
                alt={CART_ITEMS[key].title}
                className='img-fluid'
                width={70}
                height={100}
              />
              <Link to={`/books/${CART_ITEMS[key].slug}`} className='mx-2'>
                {CART_ITEMS[key].title}
              </Link>
            </td>
            <td className='td-price'> {CART_ITEMS[key].price}$ </td>
            <td className='td-quantity'>
              {isSaved[key] && (
                <small className='text-muted'>
                  <BsCheck2Circle className='h6 mb-1' /> updated
                </small>
              )}
              <Quantity
                loading={isLoading[key]}
                initQuantity={CART_ITEMS[key].quantity}
                onQuantityChange={(quantity) => onQuantityChange(quantity, key)}
              />
            </td>
            <td className='td-total'>
              {(CART_ITEMS[key].price * CART_ITEMS[key].quantity).toFixed(2)}$
            </td>
            <td className="td-price'">
              <button
                className='btn btn-sm btn-outline-danger text-center p-0 rounded-circle'
                onClick={() => delete_cart_api(key)}
                style={{ width: '25px', height: '25px' }}
              >
                X
              </button>
            </td>
          </tr>
        );
      }
    }

    return <>{cart_items_table}</>;
  };

  const RenderBooksTable = () => {
    if (Object.keys(CART_ITEMS).length > 0) {
      return <RenderTableBooksRows />;
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
          <RenderBooksTable />
        </tbody>
      </table>
    );
  };

  const BasketTable = () => {
    const total_to_pay = SHIPPING_PRICE + TOTAL_CART_PRICE - COUPON_PRICE;
    let show_price = null;
    if (total_to_pay > 0) {
      show_price = total_to_pay.toFixed(2);
    } else {
      show_price = (
        <>
          <small className='text-decoration-line-through'>
            {(SHIPPING_PRICE + TOTAL_CART_PRICE).toFixed(2)}
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
              <span> ${TOTAL_CART_PRICE.toFixed(2)}</span>
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
              {COUPON_PRICE > 0 && (
                <small className='text-warning ms-2'>(-{COUPON_PRICE})</small>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const Render = () => {
    if (CART_ITEMS && Object.keys(CART_ITEMS).length > 0) {
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
