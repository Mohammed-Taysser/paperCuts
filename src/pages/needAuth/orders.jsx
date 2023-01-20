import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { monthNames } from '../../components/ManipulateData';
import Banner from '../../components/standalone/Banner';
import Alert from '../../components/bootstrap/Alert';
import Spinner from '../../components/bootstrap/Spinner';
import OrdersImage from '../../assets/images/background/orders.jpg';
import usePageTitle from '../../hooks/usePageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrder } from '../../redux/features/orders.slice';

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

const calculateItemsNumber = (items) => {
	return items.reduce((prev, current) => {
		return prev + current.quantity;
	}, 0);
};

const OrdersTable = ({ orders }) => {
	if (orders && orders.length > 0) {
		return (
			<div className='table-responsive'>
				<table className='table text-center'>
					<thead>
						<tr>
							<th className='text-center'>order id</th>
							<th scope='col'>total</th>
							<th scope='col'>date</th>
							<th scope='col'>items number</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => {
							return (
								<tr key={order._id}>
									<td>
										<Link className='h5' to={`/orders/${order._id}`}>
											#{order._id}
										</Link>
									</td>
									<td>
										<span>
											{order.total.toFixed(2)}${' '}
											{order.total <= 0 && (
												<small className='text-warning mx-1'>(Free)</small>
											)}
										</span>
									</td>
									<td>
										<span>{getDate(order.date)}</span>
										<span className='mx-2'>{getTime(order.date)}</span>
									</td>
									<td>{calculateItemsNumber(order.items)}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	} else {
		return <Alert> no orders yet </Alert>;
	}
};

const RenderOrders = ({ ordersState }) => {
	if (ordersState.loading) {
		return <Spinner />;
	} else if (ordersState.error) {
		return <Alert>{JSON.stringify(ordersState.error)}</Alert>;
	} else if (ordersState.orders && ordersState.orders.length > 0) {
		return <OrdersTable orders={ordersState.orders} />;
	} else {
		return <Alert>no orders yet</Alert>;
	}
};

function Orders() {
	usePageTitle('Orders');
	const dispatch = useDispatch();
	const ordersState = useSelector((state) => state['orders']['all']);

	useLayoutEffect(() => {
		dispatch(fetchAllOrder());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Banner title='orders' subtitle='your choices' img={OrdersImage} />
			<section className='order-page'>
				<div className='container py-5'>
					<RenderOrders ordersState={ordersState} />
				</div>
			</section>
		</>
	);
}

export default Orders;
