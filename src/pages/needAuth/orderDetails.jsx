import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { monthNames } from '../../components/ManipulateData';
import { FaBox, FaShippingFast } from 'react-icons/fa';
import { MdDoneAll } from 'react-icons/md';
import Banner from '../../components/standalone/Banner';
import Spinner from '../../components/bootstrap/Spinner';
import Alert from '../../components/bootstrap/Alert';
import OrdersImage from '../../assets/images/background/orders.jpg';
import usePageTitle from '../../hooks/usePageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrder } from '../../redux/features/orders.slice';

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

const OrderTable = ({ order }) => {
	let cartItems = order.items.map((book) => {
		return (
			<tr key={book._id}>
				<td className='text-center'>
					<span className='text-aurora'>{book.quantity}</span>
				</td>
				<td>{book.title}</td>
				<td>${book.price}</td>
				<td>{`$${(book.quantity * book.price).toFixed(2)}`}</td>
			</tr>
		);
	});

	return (
		<div className='table-responsive'>
			<table className='table'>
				<thead>
					<tr>
						<th className='text-center'>quantity</th>
						<th scope='col'>Product</th>
						<th scope='col'>Price</th>
						<th scope='col'>Subtotal</th>
					</tr>
				</thead>
				<tbody>
					{cartItems}
					<tr>
						<td colSpan={3}>Total</td>
						<td>
							<span className='text-aurora'>${order.total.toFixed(2)}</span>
							{order.total <= 0 && (
								<small className='text-warning mx-1'>(Free)</small>
							)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

const PersonalTable = ({ order }) => {
	return (
		<div className='table-responsive my-3'>
			<table className='table'>
				<tbody>
					<tr>
						<td style={{ minWidth: '150px' }}>full name</td>
						<td>
							<span>{order.fullName}</span>
						</td>
					</tr>
					<tr>
						<td>country</td>
						<td>
							<span>{order.country}</span>
						</td>
					</tr>
					<tr>
						<td>address</td>
						<td>
							<span>{order.address}</span>
						</td>
					</tr>
					<tr>
						<td>phone</td>
						<td>
							<span>{order.phone}</span>
						</td>
					</tr>
					<tr>
						<td>date</td>
						<td>
							<span className=''>{formatDate(order.date)}</span>
						</td>
					</tr>
					<tr>
						<td>notes</td>
						<td>
							{order.note ? (
								<span>{order.note}</span>
							) : (
								<span className='text-muted'>not provided</span>
							)}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

const OrderProgress = ({ order }) => {
	return (
		<div className='mb-5 pb-5'>
			<div className='order-progress'>
				<span className='progress-line '></span>
				<span className='progress-line '></span>
				<div
					className={`progress-icon ${
						order.progress === 'placed' ? 'active' : ''
					}`}
					data-content='Order Placed'
				>
					<span>
						<FaBox />
					</span>
				</div>
				<div
					className={`progress-icon ${
						order.progress === 'transit' ? 'active' : ''
					}`}
					data-content='In Transit'
				>
					<span>
						<FaShippingFast />
					</span>
				</div>
				<div
					className={`progress-icon ${
						order.progress === 'completed' ? 'active' : ''
					}`}
					data-content='Completed'
				>
					<span>
						<MdDoneAll />
					</span>
				</div>
			</div>
		</div>
	);
};

const Render = ({ orderState }) => {
	if (orderState.loading) {
		return <Spinner />;
	} else if (orderState.error) {
		return <Alert>{JSON.stringify(orderState.error)}</Alert>;
	} else if (orderState.order) {
		return (
			<>
				<OrderProgress order={orderState.order} />
				<PersonalTable order={orderState.order} />
				<OrderTable order={orderState.order} />
			</>
		);
	} else {
		return <Alert>no order found</Alert>;
	}
};

function OrderDetails() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const orderState = useSelector((state) => state['orders']['single']);
	usePageTitle('Order #' + id);

	useEffect(() => {
		dispatch(fetchOrder({ id }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Banner
				title={
					orderState.order ? `order#${orderState.order._id}` : 'order details'
				}
				subtitle='order details'
				img={OrdersImage}
			/>
			<section className='my-5 py-5'>
				<div className='container'>
					{orderState.loading ? (
						<Spinner />
					) : (
						<Render orderState={orderState} />
					)}
				</div>
			</section>
		</>
	);
}

export default OrderDetails;
