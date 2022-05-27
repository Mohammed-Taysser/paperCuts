import React, { useLayoutEffect, useState } from 'react';
import { getAllAuthorCart, deleteAllAuthorCart } from '../../api/cart.api';
import { createOrder } from '../../api/order.api';
import { useNavigate } from 'react-router-dom';
import { calculateAmount } from '../../redux/features/cart.slice';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../../components/standalone/Banner';
import CartCoupon from '../../components/CartCoupon';
import BillingForm from '../../components/BillingForm';
import usePageTitle from '../../hooks/usePageTitle';
import Spinner from '../../components/bootstrap/Spinner';
import Alert from '../../components/bootstrap/Alert';

function Checkout() {
	const dispatch = useDispatch();
	usePageTitle('Checkout');
	const navigate = useNavigate();
	const {
		shipping,
		discount,
		total: totalPay,
	} = useSelector((state) => state['cart']);
	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState({ cart: true, order: false });
	const [errors, setErrors] = useState({});
	const [loadingError, setLoadingError] = useState({ cart: null, order: null });

	useLayoutEffect(() => {
		api_get_cart();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const api_get_cart = () => {
		getAllAuthorCart()
			.then((response) => {
				setCartItems(response.data);
				dispatch(calculateAmount(response.data));
			})
			.catch((error) => {
				setLoadingError((err) => ({ ...err, cart: error.message }));
			})
			.finally(() => {
				setLoading((load) => ({ ...load, cart: false }));
			});
	};

	const api_set_order = async (data) => {
		setLoading((load) => ({ ...load, order: true }));

		try {
			const deletedCart = await deleteAllAuthorCart();
			const createdOrder = await createOrder({
				...data,
				items: cartItems,
				total: totalPay + shipping + discount,
			});
			if (deletedCart && createdOrder) {
				navigate(`/orders/${createdOrder.data._id}`);
			}
		} catch (error) {
			setLoadingError((err) => ({ ...err, order: error.message }));
		} finally {
			setLoading((load) => ({ ...load, order: false }));
		}
	};

	const show_price = () => {
		const total_to_pay = shipping + totalPay - discount;

		if (total_to_pay > 0) {
			return total_to_pay.toFixed(2);
		} else {
			return (
				<>
					<small className="text-decoration-line-through">
						{(shipping + totalPay).toFixed(2)}
					</small>{' '}
					<strong>Free</strong>
				</>
			);
		}
	};

	const onFormSubmit = (data) => {
		setErrors({});

		api_set_order(data);
	};

	const CartItemsRows = () => {
		if (cartItems && cartItems && cartItems.length > 0) {
			const rows = cartItems.map((item) => {
				return (
					<tr key={item._id}>
						<td className="text-center">
							<span className="text-aurora">{item.quantity}</span>
						</td>
						<td>{item.title}</td>
						<td> ${(item.quantity * item.price).toFixed(2)}</td>
					</tr>
				);
			});
			return <>{rows}</>;
		} else {
			return <></>;
		}
	};

	const OrderTable = () => {
		return (
			<div className="table-responsive">
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Product</th>
							<th scope="col">Subtotal</th>
						</tr>
					</thead>
					<tbody>
						<CartItemsRows />
						<tr>
							<td>Subtotal</td>
							<td colSpan={2}> ${totalPay.toFixed(2)}</td>
						</tr>
						<tr>
							<td>Shipping</td>
							<td colSpan={2}>Flat rate: ${shipping}</td>
						</tr>
						<tr>
							<td>Coupons</td>
							<td colSpan={2}>${discount}</td>
						</tr>
						<tr>
							<td>Total</td>
							<td colSpan={2}>
								<span className="text-aurora">${show_price()}</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	};

	const RenderCartInfo = () => {
		if (loading.cart) {
			return <Spinner />;
		} else if (loadingError.cart) {
			return <Alert>{loading.cart}</Alert>;
		} else if (cartItems && cartItems.length > 0) {
			return <OrderTable />;
		} else {
			return <Alert>no cart items yet</Alert>;
		}
	};

	return (
		<>
			<Banner title="Checkout" subtitle="info" />
			<section className="checkout-page my-5 py-5">
				<div className="container">
					<div className="billing-details">
						<div className="row justify-content-center">
							<div className="col-md-10">
								<CartCoupon />
								<RenderCartInfo />
								<h1 className="mt-5">Billing details</h1>
								{loadingError.order ? (
									<Alert>{loadingError.order}</Alert>
								) : (
									<BillingForm
										loading={loading}
										onFormSubmit={onFormSubmit}
										errors={errors}
										setErrors={setErrors}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Checkout;
