import React, { useState } from 'react';
import Banner from '../components/Banner';
import CartCoupon from '../components/CartCoupon';
import useCart from '../hooks/useCart';
import { OrderAPI } from '../api/Localhost';
import { useNavigate } from 'react-router-dom';
import BillingForm from '../components/BillingForm';

function Checkout() {
  const navigate = useNavigate();
  const [SHIPPING_PRICE, COUPON_PRICE, TOTAL_CART_PRICE, cartItems] = useCart();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);

  const api_set_order = async () => {
    setLoading(true);
    let calculate_total_price =
        SHIPPING_PRICE + TOTAL_CART_PRICE - COUPON_PRICE,
      total_price = calculate_total_price > 0 ? calculate_total_price : 0;

    const order_detail = {
      ...formData,
      cartItems,
      total: total_price,
      date: new Date(),
    };
    await OrderAPI.post(`/`, order_detail)
      .then((response) => {
        navigate(`/orders/${response.data.id}`);
      })
      .catch((error) => {
        // handle error
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const show_price = () => {
    const total_to_pay = SHIPPING_PRICE + TOTAL_CART_PRICE - COUPON_PRICE;

    if (total_to_pay > 0) {
      return total_to_pay.toFixed(2);
    } else {
      return (
        <>
          <small className='text-decoration-line-through'>
            {(SHIPPING_PRICE + TOTAL_CART_PRICE).toFixed(2)}
          </small>{' '}
          <strong>Free</strong>
        </>
      );
    }
  };

  const is_empty = () => {
    if (formData) {
      let without_note = formData
      delete without_note.additionalNote
      return !Object.values(without_note).every(
        (val) => val !== null && val !== ''
      );
    } else {
      return true;
    }
  };

  const onFormSubmit = (data) => {
    setFormData(data)
    if(!is_empty()){
      api_set_order();
    }
  };

  const CartItemsRows = () => {
    if (cartItems.length > 0) {
      return cartItems.map((item) => {
        return (
          <tr key={item.id}>
            <td className='text-center'>
              <span className='text-aurora'>{item.quantity}</span>
            </td>
            <td>{item.title}</td>
            <td> ${(item.quantity * item.price).toFixed(2)}</td>
          </tr>
        );
      });
    } else {
      return <></>;
    }
  };

  const OrderTable = () => {
    return (
      <div className='table-responsive'>
        <table className='table'>
          <thead>
            <tr>
              <td className='text-center'>quantity</td>
              <th scope='col'>Product</th>
              <th scope='col'>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <CartItemsRows />
            <tr>
              <td colSpan={2}>Subtotal</td>
              <td> ${TOTAL_CART_PRICE.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan={2}>Shipping</td>
              <td>Flat rate: ${SHIPPING_PRICE}</td>
            </tr>
            <tr>
              <td colSpan={2}>Coupons</td>
              <td>${COUPON_PRICE}</td>
            </tr>
            <tr>
              <td colSpan={2}>Total</td>
              <td>
                <span className='text-aurora'>${show_price()}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <Banner title='Checkout' subtitle='info' />
      <section className='checkout-page my-5 py-5'>
        <div className='container'>
          <div className='billing-details'>
            <div className='row justify-content-center'>
              <div className='col-md-10'>
                <CartCoupon />
                <OrderTable />
                <h1 className='mt-5'>Billing details</h1>
                <BillingForm loading={loading} onFormSubmit={onFormSubmit} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;
