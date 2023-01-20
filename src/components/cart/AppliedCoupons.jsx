import React from 'react';
import { useDispatch } from 'react-redux';
import { removeCoupon } from '../../redux/features/cart.slice';

const SingleCouponAlert = ({ coupon }) => {
	const dispatch = useDispatch();

	return (
		<div className='alert alert-success alert-dismissible fade show p-1 small'>
			<strong className='me-1'>{`${coupon.label}(${coupon.value}$)`}</strong>
			is applied
			<button
				type='button'
				className='btn-close p-2'
				title='remove coupon'
				onClick={() => dispatch(removeCoupon(coupon._id))}
			></button>
		</div>
	);
};

function AppliedCoupons({ coupons }) {
	if (coupons.length > 0) {
		return (
			<div className='mt-3'>
				{coupons.map((coupon) => (
					<SingleCouponAlert coupon={coupon} key={coupon._id} />
				))}
			</div>
		);
	} else {
		return <></>;
	}
}
export default AppliedCoupons;
