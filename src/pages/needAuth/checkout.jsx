import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BillingForm from '../../components/BillingForm';
import Alert from '../../components/bootstrap/Alert';
import Spinner from '../../components/bootstrap/Spinner';
import Banner from '../../components/standalone/Banner';
import usePageTitle from '../../hooks/usePageTitle';
import { fetchAllCartItems } from '../../redux/features/cart.slice';
import { createOrder, placeOrder } from '../../redux/features/orders.slice';

const OrderTable = ({ cartState }) => {
	return (
		<div className='table-responsive'>
			<table className='table'>
				<thead>
					<tr>
						<th scope='col' className='text-center' colSpan={3}>
							Product
						</th>
						<th scope='col'>Subtotal</th>
					</tr>
					<tr>
						<td className='text-center'>quantity</td>
						<td>title</td>
						<td>price</td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{cartState.items.map((item) => {
						return (
							<tr key={item._id}>
								<td className='text-center'>
									<span className='text-aurora'>{item.quantity}</span>
								</td>
								<td>{item.title}</td>
								<td>{item.price}</td>
								<td> ${(item.quantity * item.price).toFixed(2)}</td>
							</tr>
						);
					})}
					<tr>
						<td colSpan={4} className='p-4'></td>
					</tr>
					<tr>
						<td>Subtotal</td>
						<td colSpan={3}> ${cartState.subtotal.toFixed(2)}</td>
					</tr>
					<tr>
						<td>Shipping</td>
						<td colSpan={3}>Flat rate: ${cartState.shipping}</td>
					</tr>
					<tr>
						<td>Coupons</td>
						<td colSpan={3}>${cartState.discount}</td>
					</tr>
					<tr>
						<td>Total</td>
						<td colSpan={3}>
							<span className='text-aurora'>
								$
								{cartState.subtotal + cartState.shipping - cartState.discount >
								0 ? (
									(
										cartState.subtotal +
										cartState.shipping -
										cartState.discount
									).toFixed(2)
								) : (
									<>
										<small className='text-decoration-line-through'>
											{(cartState.subtotal + cartState.shipping).toFixed(2)}
										</small>{' '}
										<strong>Free</strong>
									</>
								)}
							</span>
							{cartState.discount > 0 && (
								<small className='text-warning ms-2'>
									(-{cartState.discount})
								</small>
							)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

function Checkout() {
	const dispatch = useDispatch();
	usePageTitle('Checkout');
	const navigate_to = useNavigate();
	const cartState = useSelector((state) => state['cart']);
	const orderState = useSelector((state) => state['orders']['single']);
	const { placeOrder: isPlaceOrder } = useSelector((state) => state['orders']);
	const [errors, setErrors] = useState({});

	useLayoutEffect(() => {
		dispatch(fetchAllCartItems());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isPlaceOrder) {
			dispatch(placeOrder());
			navigate_to(`/orders/${orderState.order._id}`);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderState]);

	const onFormSubmit = (formData) => {
		setErrors({});

		const total =
			cartState.subtotal + cartState.shipping - cartState.discount > 0
				? cartState.subtotal + cartState.shipping - cartState.discount
				: 0;

		dispatch(
			createOrder({
				data: {
					...formData,
					items: cartState.items,
					total,
				},
			})
		);
	};

	const RenderCartInfo = () => {
		if (cartState.loading) {
			return <Spinner />;
		} else if (cartState.error) {
			return <Alert>{JSON.stringify(cartState.error)}</Alert>;
		} else if (cartState.items && cartState.items.length > 0) {
			return <OrderTable cartState={cartState} />;
		} else {
			return <Alert>no cart items yet</Alert>;
		}
	};

	const RenderBillingForm = () => {
		if (orderState.loading) {
			return <Spinner />;
		} else if (orderState.error) {
			return <Alert>{JSON.stringify(orderState.error)}</Alert>;
		} else if (cartState.items.length > 0) {
			return (
				<>
					<h1 className='mt-5'>Billing details</h1>
					<BillingForm
						loading={orderState.loading}
						onFormSubmit={onFormSubmit}
						errors={errors}
						setErrors={setErrors}
					/>
				</>
			);
		} else {
			return <Alert>no Cart items</Alert>;
		}
	};

	const RenderMainContent = () => {
		if (cartState.loading) {
			return <Spinner />;
		} else if (cartState.error) {
			return <Alert>{JSON.stringify(cartState.error)}</Alert>;
		} else if (cartState.items && cartState.items.length > 0) {
			return (
				<>
					<RenderCartInfo />
					<RenderBillingForm />
				</>
			);
		} else {
			return <Alert>no cart items yet</Alert>;
		}
	};

	return (
		<>
			<Banner title='Checkout' subtitle='info' />
			<section className='checkout-page my-5 py-5'>
				<div className='container'>
					<div className='billing-details'>
						<div className='row justify-content-center'>
							<div className='col-md-10'>
								<RenderMainContent />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Checkout;
