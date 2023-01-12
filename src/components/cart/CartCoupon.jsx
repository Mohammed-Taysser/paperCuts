import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCoupon, fetchCouponByLabel } from '../../redux/features/cart.slice';
import { InputField } from '../bootstrap/Form';
import Spinner from '../bootstrap/Spinner';
import AppliedCoupons from './AppliedCoupons';

function CartCoupon() {
	const dispatch = useDispatch();
	const cartStatus = useSelector((state) => state['cart']);
	const [inputValue, setInputValue] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);
	const [isSearched, setIsSearched] = useState(false);

	useEffect(() => {
		if (isSearched) {
			checkCouponStatus(cartStatus.coupons.searched);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cartStatus.coupons.searched]);

	const onCouponInputChange = (evt) => {
		let input_value = evt.target.value;
		setInputValue(input_value);

		if (input_value.length === 0) {
			evt.target.className = evt.target.className.replace('is-invalid', '');
		}
	};

	const checkCouponStatus = (responseData) => {
		if (responseData) {
			let existCoupon = cartStatus.coupons.applied.find(
				(coupon) => coupon._id === responseData._id
			);
			if (existCoupon) {
				setErrorMessage('Coupon already applied');
			} else {
				setErrorMessage(null);
				dispatch(addCoupon(responseData));
				setInputValue('');
				setIsSearched(false);
			}
		} else {
			setErrorMessage('Coupon not exist or Misspelled');
		}
	};

	const onFormSubmitted = async (evt) => {
		evt.preventDefault();
		if (inputValue) {
			setErrorMessage(null);
			dispatch(fetchCouponByLabel({ label: inputValue }));
			setIsSearched(true);
		} else {
			setErrorMessage(`Coupon can't be empty`);
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
						name='coupon'
						onChange={onCouponInputChange}
						id='coupon-input-id'
						invalidFeedback={errorMessage}
					/>
					<AppliedCoupons coupons={cartStatus.coupons.applied} />
				</div>
				<div className='col-auto'>
					{cartStatus.coupons.loading ? (
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
