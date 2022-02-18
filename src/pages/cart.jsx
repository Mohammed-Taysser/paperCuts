import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Banner from '../components/Banner';
import { BOOKS } from '../api/Localhost';

function Cart() {
  const [quantityNumber, setQuantityNumber] = useState(1);

  const onQuantityAdd = () => {
    if (quantityNumber >= 1) {
      setQuantityNumber(quantityNumber + 1);
    }
  };

  const onQuantityMinus = () => {
    if (quantityNumber > 1) {
      setQuantityNumber(quantityNumber - 1);
    }
  };

  const quantity_controls = () => {
    return (
      <div className='d-flex align-items-center qty-container'>
        <button className='btn-qty btn-qty-down' onClick={onQuantityAdd}>
          <FaPlus />
        </button>
        <input
          className='form-qty'
          type='number'
          name='quantity'
          value={quantityNumber}
          onChange={(e) => setQuantityNumber(parseInt(e.target.value, 10))}
        />
        <button className='btn-qty btn-qty-up' onClick={onQuantityMinus}>
          <FaMinus />
        </button>
      </div>
    );
  };

  const books_table = () => {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>book</th>
            <th scope='col'>Price</th>
            <th scope='col'>Quantity</th>
            <th scope='col'>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {BOOKS.map((book, index) => {
            return (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td className='td-title'>
                  <img
                    src={book.img}
                    alt={book.title}
                    className='img-fluid'
                    width={70}
                    height={100}
                  />
                  <Link to={`/books/${book.id}`} className='mx-2'>
                    {book.title}
                  </Link>
                </td>
                <td className='td-price'> {book.price}$ </td>
                <td className='td-quantity'>{quantity_controls()}</td>
                <td className='td-total'>{book.price * (index + 1)}$</td>
              </tr>
            );
          })}
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
          <div className='my-5'>
            <form className='row g-3'>
              <div className='col-auto'>
                <label htmlFor='coupon-input-id' className='visually-hidden'>
                  coupon
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='coupon-input-id'
                  placeholder='Coupon Code'
                  required
                />
              </div>
              <div className='col-auto'>
                <button type='submit' className='btn btn-aurora mb-3'>
                  Apply Coupon
                </button>
              </div>
            </form>
          </div>
          <div className='cart-total'>
            <h2 className='my-3'>Basket totals</h2>
            <div className='table-responsive'>
              <table className='table'>
                <tbody>
                  <tr>
                    <td>
                      <h6>Subtotal</h6>
                    </td>
                    <td>
                      <span> $174.00</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6>Shipping</h6>
                    </td>
                    <td>
                      <span> Shipping Flat rate: $79.00</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h6>Total</h6>
                    </td>
                    <td>
                      <span className='text-aurora'> $253.00</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Link to='/checkout' className='btn btn-aurora btn-lg mt-4'>
              process to checkout
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
