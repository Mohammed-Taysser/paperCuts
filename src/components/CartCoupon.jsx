import React, { useContext, useState } from 'react';
import { CouponAPI, get_coupon_by_title } from '../api/Localhost';
import { Context as CouponContext } from '../context/coupon';
import { InputField } from './bootstrap/Form';

function CartCoupon(props) {
  const coupon_context = useContext(CouponContext);
  const [inputCouponValue, setInputCouponValue] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(
    coupon_context.coupons || []
  );
  const [couponErrorMessage, setCouponErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const api_get_coupon = async () => {
    setLoading(true);
    await CouponAPI.get(`?label=${inputCouponValue}`)
      .then((response) => {
        check_coupon_status(response.data[0]);
      })
      .catch((error) => {
        check_coupon_status(get_coupon_by_title(inputCouponValue));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onCouponInputChange = (evt) => {
    let input_value = evt.target.value;
    setInputCouponValue(input_value);

    if (input_value.length === 0) {
      evt.target.className = evt.target.className.replace('is-invalid', '');
    }
  };

  const check_coupon_status = (coupon_instance) => {
    if (coupon_instance) {
      let coupon_is_exist = appliedCoupon.find(
        (coupon) => coupon.id === coupon_instance.id
      );
      if (coupon_is_exist) {
        setCouponErrorMessage('Coupon already applied');
      } else {
        setCouponErrorMessage(null);
        let new_coupon = [...appliedCoupon, coupon_instance];
        setAppliedCoupon(new_coupon);
        coupon_context.setCoupons(new_coupon);
      }
    } else {
      setCouponErrorMessage('Coupon not exist or Misspelled');
    }
  };

  const onFormSubmitted = (evt) => {
    evt.preventDefault();
    setCouponErrorMessage(null);

    api_get_coupon();
  };

  const onClearCoupon = (coupon_id) => {
    let filtered_coupon = appliedCoupon.filter(
      (coupon) => coupon.id !== coupon_id
    );
    setAppliedCoupon(filtered_coupon);
    coupon_context.setCoupons(filtered_coupon);
  };

  const AppliedCoupons = () => {
    if (appliedCoupon.length > 0) {
      return (
        <div className='mt-3'>
          {appliedCoupon.map((coupon) => {
            return (
              <div
                className='alert alert-success alert-dismissible fade show p-1 small'
                role='alert'
                key={coupon.id}
              >
                <strong className='me-1'>{`${coupon.label}(${coupon.value}$)`}</strong>
                is applied
                <button
                  type='button'
                  className='btn-close p-2'
                  data-bs-dismiss='alert'
                  aria-label='Close'
                  onClick={() => onClearCoupon(coupon.id)}
                ></button>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className='my-5'>
      <form className='row g-3' onSubmit={onFormSubmitted}>
        <div className='col-auto'>
          <InputField
            className={couponErrorMessage && 'is-invalid'}
            value={inputCouponValue}
            placeholder='Coupon Code'
            label=''
            required
            name='coupon'
            onChange={onCouponInputChange}
            id='coupon-input-id'
            invalidFeedback={couponErrorMessage}
          />
          {loading && <div className='form-text'>loading....</div>}
          <AppliedCoupons />
        </div>
        <div className='col-auto'>
          <button type='submit' className='btn btn-aurora mb-3'>
            Apply Coupon
          </button>
        </div>
      </form>
    </div>
  );
}

export default CartCoupon;
