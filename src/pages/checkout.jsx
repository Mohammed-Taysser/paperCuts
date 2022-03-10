import React, { useContext, useState } from 'react';
import Banner from '../components/Banner';
import CartCoupon from '../components/CartCoupon';
import useCart from '../hooks/useCart';
import { FaCcMastercard } from 'react-icons/fa';
import { FcInTransit } from 'react-icons/fc';
import { BsPaypal } from 'react-icons/bs';
import { RiVisaFill } from 'react-icons/ri';
import { OrderAPI } from '../api/Localhost';
import { useNavigate } from 'react-router-dom';
import JsonServerToast from '../context/IsJsonServerDown';

function Checkout() {
  const INIT_VALUES = {
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    address: '',
    town: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    additionalNote: '',
    paymentMethod: 'masterCard',
  };

  const navigate = useNavigate();
  const [SHIPPING_PRICE, COUPON_PRICE, TOTAL_CART_PRICE, cartItems] = useCart();
  const [formData, setFormData] = useState(INIT_VALUES);
  const is_jsonServer_down = useContext(JsonServerToast);

  const api_set_order = async () => {
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
        // handle success
        navigate(`/orders/${response.data.id}`);
      })
      .catch((error) => {
        // handle error
      })
      .then(() => {
        // always executed
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

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    if (!is_jsonServer_down) {
      api_set_order();
    }
  };

  const onInputChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
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
              <td> ${TOTAL_CART_PRICE}</td>
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

  const PaymentMethod = () => {
    return (
      <div className='mt-4'>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='radio'
            name='paymentMethod'
            id='payment-method-cash'
            value='cash'
            onChange={onInputChange}
            checked={formData['paymentMethod'] === 'cash' ? true : false}
          />
          <label className='form-check-label' htmlFor='payment-method-cash'>
            <FcInTransit className='h4 my-0 me-2 ' />
            Cash on delivery
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='radio'
            name='paymentMethod'
            id='payment-method-master-card'
            value='masterCard'
            onChange={onInputChange}
            checked={formData['paymentMethod'] === 'masterCard' ? true : false}
          />
          <label
            className='form-check-label'
            htmlFor='payment-method-master-card'
          >
            <FaCcMastercard className='h4 my-0 me-2 ' />
            master card
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='radio'
            name='paymentMethod'
            id='payment-method-visa'
            value='visa'
            onChange={onInputChange}
            checked={formData['paymentMethod'] === 'visa' ? true : false}
          />
          <label className='form-check-label' htmlFor='payment-method-visa'>
            <RiVisaFill className='h4 my-0 me-2 ' />
            visa
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='radio'
            name='paymentMethod'
            id='payment-method-paypal'
            value='paypal'
            onChange={onInputChange}
            checked={formData['paymentMethod'] === 'paypal' ? true : false}
          />
          <label className='form-check-label' htmlFor='payment-method-paypal'>
            <BsPaypal className='h4 my-0 me-2 ' />
            paypal
          </label>
        </div>
        <hr />
        <div className='small text-muted'>
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </div>
        <button
          className='btn btn-aurora btn-lg mt-3'
          type='submit'
          disabled={is_jsonServer_down}
        >
          Place Order
        </button>
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
                <h1>Billing details</h1>

                <form onSubmit={onFormSubmit}>
                  <div className='row justify-content-center'>
                    <div className='col-md-6 my-3'>
                      <label
                        htmlFor='firstName-input-id'
                        className='form-label require'
                      >
                        first name
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='firstName-input-id'
                        placeholder='first name'
                        name='firstName'
                        value={formData['firstName']}
                        required
                        onChange={onInputChange}
                      />
                    </div>

                    <div className='col-md-6 my-3'>
                      <label
                        htmlFor='lastName-input-id'
                        className='form-label require'
                      >
                        last name
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='lastName-input-id'
                        placeholder='last name'
                        name='lastName'
                        value={formData['lastName']}
                        required
                        onChange={onInputChange}
                      />
                    </div>

                    <div className='col-md-6 my-3'>
                      <label
                        htmlFor='companyName-input-id'
                        className='form-label'
                      >
                        company name
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='companyName-input-id'
                        placeholder='company name'
                        name='companyName'
                        value={formData['companyName']}
                        onChange={onInputChange}
                      />
                    </div>

                    <div className='col-md-6 my-3'>
                      <label
                        htmlFor='country-input-id'
                        className='form-label require'
                      >
                        Country
                      </label>
                      <select
                        className='form-select'
                        id='country-input-id'
                        aria-label='country select'
                        value={formData['country']}
                        name='country'
                        required
                        onChange={onInputChange}
                      >
                        <option value='egypt'>Egypt</option>
                        <option value='india'>India</option>
                        <option value='usa'>USA</option>
                      </select>
                    </div>

                    <div className='col-md-6 my-3'>
                      <label
                        htmlFor='address-input-id'
                        className='form-label require'
                      >
                        address
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='address-input-id'
                        placeholder='address'
                        required
                        name='address'
                        value={formData['address']}
                        onChange={onInputChange}
                      />
                    </div>

                    <div className='col-md-2 col-4 my-3'>
                      <label htmlFor='town-input-id' className='form-label'>
                        town
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='town-input-id'
                        placeholder='town'
                        name='town'
                        value={formData['town']}
                        onChange={onInputChange}
                      />
                    </div>

                    <div className='col-md-2 col-4 my-3'>
                      <label htmlFor='state-input-id' className='form-label'>
                        state
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='state-input-id'
                        placeholder='state'
                        name='state'
                        value={formData['state']}
                        onChange={onInputChange}
                      />
                    </div>

                    <div className='col-md-2 col-4 my-3'>
                      <label htmlFor='zip-input-id' className='form-label'>
                        zip
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='zip-input-id'
                        placeholder='zip'
                        name='zip'
                        value={formData['zip']}
                        onChange={onInputChange}
                      />
                    </div>
                    <div className='col-md-6 my-3'>
                      <label
                        htmlFor='phone-input-id'
                        className='form-label require'
                      >
                        phone
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='phone-input-id'
                        placeholder='phone'
                        required
                        name='phone'
                        value={formData['phone']}
                        onChange={onInputChange}
                      />
                    </div>
                    <div className='col-md-6 my-3'>
                      <label
                        htmlFor='email-input-id'
                        className='form-label require'
                      >
                        email
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='email-input-id'
                        placeholder='email'
                        required
                        name='email'
                        value={formData['email']}
                        onChange={onInputChange}
                      />
                    </div>

                    <div className='col-md-12 my-3'>
                      <label htmlFor='additional-note' className='form-label'>
                        additional note
                      </label>
                      <textarea
                        className='form-control'
                        id='additional-note'
                        value={formData['additionalNote']}
                        name='additionalNote'
                        onChange={onInputChange}
                        placeholder='additional note'
                        rows={3}
                      ></textarea>
                    </div>
                  </div>
                  <div className='order-details mt-4'>
                    <OrderTable />
                    <PaymentMethod />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;
