import React from 'react';
import Banner from '../components/Banner';

function Checkout() {
  return (
    <>
      <Banner title='Checkout' subtitle='info' />
      <section className='checkout-page my-5 py-5'>
        <div className='container'>
          <div className='billing-details'>
            <div className='row justify-content-center'>
              <div className='col-md-10'>
                <div className='my-3'>
                  <form className='row g-3'>
                    <div className='col-auto'>
                      <label
                        htmlFor='coupon-input-id'
                        className='visually-hidden'
                      >
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
                <h1>Billing details</h1>
                <form action=''>
                  <div className='row justify-content-center'>
                    <div className='col-md-6 my-3'>
                      <label
                        htmlFor='first_name-input-id'
                        className='form-label'
                      >
                        first name<span className='text-danger'>*</span>
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='first_name-input-id'
                        placeholder='first name'
                        required
                      />
                    </div>
                    <div className='col-md-6 my-3'>
                      <label
                        htmlFor='last_name-input-id'
                        className='form-label'
                      >
                        last name<span className='text-danger'>*</span>
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='last_name-input-id'
                        placeholder='last name'
                        required
                      />
                    </div>
                    <div className='col-md-6 my-3'>
                      <label
                        htmlFor='company_name-input-id'
                        className='form-label'
                      >
                        Company name
                        <span className='text-muted'>(optional)</span>
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='company_name-input-id'
                        placeholder='company name'
                        required
                      />
                    </div>
                    <div className='col-md-6 my-3'>
                      <label htmlFor='country-input-id' className='form-label'>
                        country<span className='text-danger'>*</span>
                      </label>
                      <select
                        className='form-select'
                        id='country-input-id'
                        aria-label='country select'
                        defaultValue={'select country'}
                      >
                        <option>select country</option>
                        <option value='1'>One</option>
                        <option value='2'>Two</option>
                        <option value='3'>Three</option>
                      </select>
                    </div>
                    <div className='col-md-6 my-3'>
                      <label htmlFor='address-input-id' className='form-label'>
                        address<span className='text-danger'>*</span>
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='address-input-id'
                        placeholder='address'
                        required
                      />
                    </div>
                    <div className='col-md-2 col-4 my-3'>
                      <label htmlFor='town-input-id' className='form-label'>
                        town<span className='text-danger'>*</span>
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='town-input-id'
                        placeholder='town'
                        required
                      />
                    </div>
                    <div className='col-md-2 col-4 my-3'>
                      <label htmlFor='state-input-id' className='form-label'>
                        state<span className='text-danger'>*</span>
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='state-input-id'
                        placeholder='state'
                        required
                      />
                    </div>
                    <div className='col-md-2 col-4 my-3'>
                      <label htmlFor='zip-input-id' className='form-label'>
                        zip<span className='text-danger'>*</span>
                      </label>
                      <input
                        type='text'
                        className='form-control'
                        id='zip-input-id'
                        placeholder='zip'
                        required
                      />
                    </div>
                    <div className='col-md-6 my-3'>
                      <label htmlFor='phone-input-id' className='form-label'>
                        phone<span className='text-danger'>*</span>
                      </label>
                      <input
                        type='tel'
                        className='form-control'
                        id='phone-input-id'
                        placeholder='phone'
                        required
                      />
                    </div>
                    <div className='col-md-6 my-3'>
                      <label htmlFor='email-input-id' className='form-label'>
                        email address<span className='text-danger'>*</span>
                      </label>
                      <input
                        type='email'
                        className='form-control'
                        id='email-input-id'
                        placeholder='email address'
                        required
                      />
                    </div>
                  </div>
                </form>
                <div className='order-details mt-4'>
                  <div className='table-responsive'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'>Product</th>
                          <th scope='col'>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Fantasy Storytelling X 6</td>
                          <td> $174.00</td>
                        </tr>
                        <tr>
                          <td>Subtotal</td>
                          <td> $174.00</td>
                        </tr>
                        <tr>
                          <td>Shipping</td>
                          <td>Flat rate: $79.00</td>
                        </tr>
                        <tr>
                          <td>Total</td>
                          <td> $1740.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className='mt-4'>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='payment-method'
                        id='payment-method-cash'
                      />
                      <label
                        className='form-check-label'
                        htmlFor='payment-method-cash'
                      >
                        Cash on delivery
                      </label>
                    </div>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='payment-method'
                        id='payment-method-master-card'
                        checked
                      />
                      <label
                        className='form-check-label'
                        htmlFor='payment-method-master-card'
                      >
                        master card
                      </label>
                    </div>
                    <hr />
                    <div className='small text-muted'>
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our privacy policy.
                    </div>
                    <button className='btn btn-aurora btn-lg mt-3'>
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;
