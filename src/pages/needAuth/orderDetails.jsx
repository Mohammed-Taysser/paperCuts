import React, { useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCartByOrderId } from '../../api/order.api';
import { monthNames } from '../../components/ManipulateData';
import { FaBox, FaShippingFast } from 'react-icons/fa';
import { MdDoneAll } from 'react-icons/md';
import Banner from '../../components/standalone/Banner';
import Spinner from '../../components/bootstrap/Spinner';
import Alert from '../../components/bootstrap/Alert';
import OrdersImage from '../../assets/images/background/orders.jpg';
import usePageTitle from '../../hooks/usePageTitle';
import '../../assets/scss/pages/paperCuts/orderDetails.scss';

function OrderDetails() {
	const { id: orderId } = useParams();
	usePageTitle('Order #' + orderId);
	const [currentOrder, setCurrentOrder] = useState(null);
	const [loading, setLoading] = useState(true);
	const [loadingError, setLoadingError] = useState(null);

	useLayoutEffect(() => {
		api_get_order();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const api_get_order = async () => {
		await getCartByOrderId(orderId)
			.then((response) => {
				setCurrentOrder(response.data);
			})
			.catch((error) => {
				setLoadingError(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const time_details = (current_date) => {
		let hours = current_date.getHours(),
			minutes = current_date.getMinutes(),
			mid = 'am';

		if (hours === 0) {
			hours = 12;
		} else if (hours > 12) {
			hours = hours % 12;
			mid = 'pm';
		}

		return `${hours}:${minutes} ${mid}`;
	};

	const formatDate = (date) => {
		let current_date = new Date(date);

		return `${current_date.getDay()} ${
			monthNames[current_date.getMonth()]
		} ${current_date.getFullYear()} , ${time_details(current_date)}`;
	};

	const OrderTable = () => {
		let cartItems = currentOrder.items.map((book) => {
			return (
				<tr key={book}>
					<td className="text-center">
						<span className="text-aurora">{book.quantity}</span>
					</td>
					<td>{book.title}</td>
					<td>{`$${(book.quantity * book.price).toFixed(2)}`}</td>
				</tr>
			);
		});

		return (
			<div className="table-responsive">
				<table className="table">
					<thead>
						<tr>
							<td className="text-center">quantity</td>
							<th scope="col">Product</th>
							<th scope="col">Subtotal</th>
						</tr>
					</thead>
					<tbody>
						{cartItems}
						<tr>
							<td colSpan={2}>Total</td>
							<td>
								<span className="text-aurora">
									${currentOrder.total.toFixed(2)}
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	};

	const PersonalTable = () => {
		return (
			<div className="table-responsive my-3">
				<table className="table">
					<tbody>
						<tr>
							<td style={{ minWidth: '150px' }}>full name</td>
							<td>
								<span>{currentOrder.fullName}</span>
							</td>
						</tr>
						<tr>
							<td>country</td>
							<td>
								<span>{currentOrder.country}</span>
							</td>
						</tr>
						<tr>
							<td>address</td>
							<td>
								<span>{currentOrder.address}</span>
							</td>
						</tr>
						<tr>
							<td>phone</td>
							<td>
								<span>{currentOrder.phone}</span>
							</td>
						</tr>
						<tr>
							<td>date</td>
							<td>
								<span className="">{formatDate(currentOrder.date)}</span>
							</td>
						</tr>
						<tr>
							<td>notes</td>
							<td>
								{currentOrder.note ? (
									<span>{currentOrder.note}</span>
								) : (
									<span className="text-muted">not provided</span>
								)}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	};

	const OrderProgress = () => {
		return (
			<div className="mb-5 pb-5">
				<div className="order-progress">
					<span className="progress-line "></span>
					<span className="progress-line "></span>
					<div
						className={`progress-icon ${
							currentOrder.progress === 'placed' ? 'active' : ''
						}`}
						data-content="Order Placed"
					>
						<span>
							<FaBox />
						</span>
					</div>
					<div
						className={`progress-icon ${
							currentOrder.progress === 'transit' ? 'active' : ''
						}`}
						data-content="In Transit"
					>
						<span>
							<FaShippingFast />
						</span>
					</div>
					<div
						className={`progress-icon ${
							currentOrder.progress === 'completed' ? 'active' : ''
						}`}
						data-content="Completed"
					>
						<span>
							<MdDoneAll />
						</span>
					</div>
				</div>
			</div>
		);
	};

	const Render = () => {
		if (loading) {
			return <Spinner />;
		} else if (loadingError) {
			return <Alert>{loadingError}</Alert>;
		} else if (currentOrder) {
			return (
				<>
					<OrderProgress />
					<PersonalTable />
					<OrderTable />
				</>
			);
		} else {
			return <Alert>no order found</Alert>;
		}
	};

	return (
		<>
			<Banner
				title={currentOrder ? `order#${currentOrder._id}` : 'order details'}
				subtitle="order details"
				img={OrdersImage}
			/>
			<section className="my-5 py-5">
				<div className="container">{loading ? <Spinner /> : <Render />}</div>
			</section>
		</>
	);
}

export default OrderDetails;
