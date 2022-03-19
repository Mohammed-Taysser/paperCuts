import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import { CartAPI } from '../api/Localhost';
import Quantity from '../components/Quantity';
import CartCoupon from '../components/CartCoupon';
import useCart from '../hooks/useCart';

function Cart() {
  const [SHIPPING_PRICE, COUPON_PRICE, TOTAL_CART_PRICE, cartItems] = useCart();
  const [loading, setLoading] = useState(false);

  const onQuantityChange = (quantity, book_id) => {
    set_quantity_api(quantity, book_id);
  };

  const set_quantity_api = (quantity, book_id) => {
    setLoading(true);
    CartAPI.patch(`/${book_id}`, { quantity })
      .then((response) => {
        console.log('changed');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const delete_cart_api = (book_id) => {
    setLoading(true);
    CartAPI.delete(`/${book_id}`)
      .then((response) => {
        // console.log('changed');
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const books_table = () => {
    let cart_items_table = cartItems.map((book, index) => {
      return (
        <tr key={index}>
          <th scope='row'>{index + 1}</th>
          <td className='td-title'>
            <img
              src={book.image}
              alt={book.title}
              className='img-fluid'
              width={70}
              height={100}
            />
            <Link to={`/books/${book.slug}`} className='mx-2'>
              {book.title}
            </Link>
          </td>
          <td className='td-price'> {book.price}$ </td>
          <td className='td-quantity'>
            <Quantity
              loading={loading}
              initQuantity={book.quantity}
              onQuantityChange={(quantity) =>
                onQuantityChange(quantity, book.id)
              }
            />
          </td>
          <td className='td-total'>
            {(book.price * book.quantity).toFixed(2)}$
          </td>
          <td className="td-price'">
            <button
              className='btn btn-sm btn-outline-danger text-center p-0 rounded-circle'
              onClick={() => delete_cart_api(book.id)}
              style={{ width: '25px', height: '25px' }}
            >
              X
            </button>
          </td>
        </tr>
      );
    });

    const render_book_table = () => {
      if (cartItems.length > 0) {
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
        <tbody>{render_book_table()}</tbody>
      </table>
    );
  };

  const basket_table = () => {
    const total_to_pay = SHIPPING_PRICE + TOTAL_CART_PRICE - COUPON_PRICE;
    let show_price = null;
    if (total_to_pay > 0) {
      show_price = total_to_pay.toFixed(2);
    } else {
      show_price = (
        <>
          <small className='text-decoration-line-through'>
            {(SHIPPING_PRICE + TOTAL_CART_PRICE).toFixed(2)}
          </small>{' '}
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

  return (
    <>
      <Banner title='cart' subtitle='info' />
      <section className='cart-page my-5 py-5'>
        <div className='container'>
          <div className='table-responsive'>{books_table()}</div>
          <CartCoupon />
          <div className='row'>
            <div className='col-md-6'>
              <div className='cart-total'>
                <h2 className='my-3'>Basket totals</h2>
                <div className='table-responsive'>{basket_table()}</div>
                <Link to='/checkout' className='btn btn-aurora btn-lg mt-4'>
                  process to checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
