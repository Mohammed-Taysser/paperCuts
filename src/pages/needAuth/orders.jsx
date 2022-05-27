import React, { useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllAuthorOrders } from '../../api/order.api';
import { monthNames } from '../../components/ManipulateData';
import Banner from '../../components/standalone/Banner';
import Alert from '../../components/bootstrap/Alert';
import Spinner from '../../components/bootstrap/Spinner';
import OrdersImage from '../../assets/images/background/orders.jpg';
import usePageTitle from '../../hooks/usePageTitle';

function Orders() {
	usePageTitle('Orders');
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadingError, setLoadingError] = useState(null);

	useLayoutEffect(() => {
		api_get_orders();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const api_get_orders = async () => {
		await getAllAuthorOrders()
			.then((response) => {
				setOrders(response.data);
			})
			.catch((error) => {
				setLoadingError(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const getDate = (date) => {
		let current_date = new Date(date);

		return `${current_date.getDay()} ${
			monthNames[current_date.getMonth()]
		} ${current_date.getFullYear()}`;
	};

	const getTime = (date) => {
		let current_date = new Date(date),
			hours = current_date.getHours(),
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

	const OrdersTable = () => {
		if (orders && orders.length > 0) {
			return (
				<div className="table-responsive">
					<table className="table text-center">
						<thead>
							<tr>
								<td className="text-center">order id</td>
								<th scope="col">total</th>
								<th scope="col">date</th>
								<th scope="col">items number</th>
							</tr>
						</thead>
						<tbody>
							<OrdersRow />
						</tbody>
					</table>
				</div>
			);
		} else {
			return <Alert> no orders yet </Alert>;
		}
	};

	const OrdersRow = () => {
		let orders_items = orders.map((order, index) => {
			return (
				<tr key={order._id}>
					<td>
						<Link className="h5" to={`/orders/${order._id}`}>
							#{index + 1}
						</Link>
					</td>
					<td>
						<span>{order.total.toFixed(2)}$</span>
					</td>
					<td>
						<span>{getDate(order.date)}</span>
						<span className="mx-2">{getTime(order.date)}</span>
					</td>
					<td>{order.items.length}</td>
				</tr>
			);
		});

		return <>{orders_items}</>;
	};

	const RenderOrders = () => {
		if (loading) {
			return <Spinner />;
		} else if (loadingError) {
			return <Alert>{loadingError}</Alert>;
		} else if (orders && orders.length > 0) {
			return <OrdersTable />;
		} else {
			return <Alert>no orders yet</Alert>;
		}
	};

	return (
		<>
			<Banner title="orders" subtitle="your choices" img={OrdersImage} />
			<section className="order-page">
				<div className="container py-5">
					<RenderOrders />
				</div>
			</section>
		</>
	);
}

export default Orders;
