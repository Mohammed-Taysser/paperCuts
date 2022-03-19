import React, { useContext, useEffect, useState } from 'react';
import { CouponAPI, get_coupon_by_title } from '../api/Localhost';
import { Context as CouponContext } from '../context/coupon';
import { InputField } from './bootstrap/Form';

function CartCoupon(props) {
  const coupon_context = useContext(CouponContext);
  const [oldCoupon, setOldCoupon] = useState('');
  const [newCoupon, setNewCoupon] = useState('');
  const [currentCoupon, setCurrentCoupon] = useState(null);
  const [applyCoupon, setApplyCoupon] = useState(coupon_context.coupons || []);
  const [couponErrorMessage, setCouponErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    check_coupon_status(currentCoupon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCoupon]);

  const api_get_coupon_by_title = async (coupon_title) => {
    setLoading(true);
    await CouponAPI.get(`?title=${coupon_title}`)
      .then((response) => {
        if (response.data.length === 1) {
          setCurrentCoupon(response.data[0]);
        } else {
          couponErrorMessage('Coupon not exist or Misspelled');
        }
      })
      .catch((error) => {
        setCurrentCoupon(get_coupon_by_title(coupon_title));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onCouponInputChange = (evt) => {
    let input_value = evt.target.value;
    setNewCoupon(input_value);

    if (input_value.length === 0) {
      evt.target.className = evt.target.className.replace('is-invalid', '');
      setCouponErrorMessage(null);
      setCurrentCoupon(null);
      setNewCoupon('');
    }
  };

  const onAddCoupon = (evt) => {
    evt.preventDefault();
    setCouponErrorMessage(null);
    if (newCoupon !== oldCoupon) {
      api_get_coupon_by_title(newCoupon);
    }
    setOldCoupon(newCoupon);
  };

  const check_coupon_status = (coupon_instance) => {
    if (newCoupon) {
      if (coupon_instance) {
        let coupon_is_exist = applyCoupon.some(
          (coupon) => coupon.id === coupon_instance.id
        );
        if (coupon_is_exist) {
          setCouponErrorMessage('Coupon already applied');
        } else {
          setCouponErrorMessage(null);
          let new_coupon = [...applyCoupon, coupon_instance];
          setApplyCoupon(new_coupon);
          coupon_context.setCoupons(new_coupon);
          setNewCoupon('');
          setCurrentCoupon(null);
        }
      } else {
        setCouponErrorMessage('Coupon not exist or Misspelled');
      }
    }
  };

  const onClearCoupon = (coupon_id) => {
    let new_coupon = applyCoupon.filter((coupon) => coupon.id !== coupon_id);
    setApplyCoupon(new_coupon);
    coupon_context.setCoupons(new_coupon);
  };

  const AppliedCoupons = () => {
    if (applyCoupon.length > 0) {
      return (
        <div className='mt-3'>
          {applyCoupon.map((coupon) => {
            return (
              <div
                className='alert alert-success alert-dismissible fade show p-1 small'
                role='alert'
                key={coupon.id}
              >
                <strong className='me-1'>{`${coupon.title}(${coupon.value}$)`}</strong>
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
      <form className='row g-3' onSubmit={onAddCoupon}>
        <div className='col-auto'>
          <InputField
            className={couponErrorMessage && 'is-invalid'}
            value={newCoupon}
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
