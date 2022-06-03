import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon, removeCoupon } from '../redux/features/cart.slice';
import { getCouponByLabel } from '../api/coupon.api';
import { InputField } from './bootstrap/Form';
import Spinner from './bootstrap/Spinner';

function CartCoupon() {
  const dispatch = useDispatch();
  const { coupons: appliedCoupons } = useSelector((state) => state['cart']);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onCouponInputChange = (evt) => {
    let input_value = evt.target.value;
    setInputValue(input_value);

    if (input_value.length === 0) {
      evt.target.className = evt.target.className.replace('is-invalid', '');
    }
  };

  const check_coupon_status = (responseData) => {
    if (responseData) {
      let existCoupon = appliedCoupons.find(
        (coupon) => coupon._id === responseData._id
      );
      if (existCoupon) {
        setErrorMessage('Coupon already applied');
      } else {
        setErrorMessage(null);
        dispatch(addCoupon(responseData));
      }
    } else {
      setErrorMessage('Coupon not exist or Misspelled');
    }
  };

  const onFormSubmitted = async (evt) => {
    evt.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    await getCouponByLabel(inputValue)
      .then((response) => {
        check_coupon_status(response.data);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const SingleCouponAlert = ({ coupon }) => {
    return (
      <div className='alert alert-success alert-dismissible fade show p-1 small'>
        <strong className='me-1'>{`${coupon.label}(${coupon.value}$)`}</strong>
        is applied
        <button
          type='button'
          className='btn-close p-2'
          onClick={() => dispatch(removeCoupon(coupon._id))}
        ></button>
      </div>
    );
  };

  const AppliedCoupons = () => {
    if (appliedCoupons.length > 0) {
      return (
        <div className='mt-3'>
          {appliedCoupons.map((coupon) => (
            <SingleCouponAlert coupon={coupon} key={coupon._id} />
          ))}
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
            className={errorMessage && 'is-invalid'}
            value={inputValue}
            placeholder='Coupon Code'
            label=''
            required
            name='coupon'
            onChange={onCouponInputChange}
            id='coupon-input-id'
            invalidFeedback={errorMessage}
          />
          <AppliedCoupons />
        </div>
        <div className='col-auto'>
          {loading ? (
            <Spinner />
          ) : (
            <button type='submit' className='btn btn-aurora mb-3'>
              Apply Coupon
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CartCoupon;
