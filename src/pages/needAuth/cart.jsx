import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from '../../components/bootstrap/Alert';
import Spinner from '../../components/bootstrap/Spinner';
import BasketTable from '../../components/cart/BasketTable';
import BooksTable from '../../components/cart/BooksTable';
import CartCoupon from '../../components/cart/CartCoupon';
import Banner from '../../components/standalone/Banner';
import usePageTitle from '../../hooks/usePageTitle';
import { fetchAllCartItems } from '../../redux/features/cart.slice';

const Render = ({ cartState }) => {
	if (cartState.loading) {
		return <Spinner />;
	} else if (cartState.error) {
		return <Alert>{JSON.stringify(cartState.error)}</Alert>;
	} else if (cartState.items && cartState.items.length > 0) {
		return (
			<>
				<BooksTable />
				<CartCoupon />
				<div className='row'>
					<div className='col-md-6'>
						<div className='cart-total'>
							<h2 className='my-3'>Basket totals</h2>
							<BasketTable />
							<Link to='/checkout' className='btn btn-aurora btn-lg mt-4'>
								process to checkout
							</Link>
						</div>
					</div>
				</div>
			</>
		);
	} else {
		return (
			<Alert>
				no items added yet. see
				<Link to='/books' className='alert-link mx-1'>
					books
				</Link>
				or
				<Link to='/category' className='alert-link mx-1'>
					category
				</Link>
			</Alert>
		);
	}
};

function Cart() {
	usePageTitle('Cart');
	const dispatch = useDispatch();
	const cartState = useSelector((state) => state['cart']);

	useLayoutEffect(() => {
		dispatch(fetchAllCartItems());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Banner title='cart' subtitle='info' />
			<section className='cart-page my-5 py-5'>
				<div className='container'>
					<Render cartState={cartState} />
				</div>
			</section>
		</>
	);
}

export default Cart;
