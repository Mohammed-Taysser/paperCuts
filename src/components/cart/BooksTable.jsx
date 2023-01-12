import React from 'react';
import Quantity from '../Quantity';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteCartItem,
	updateCartItem,
} from '../../redux/features/cart.slice';

const BooksTable = () => {
	const dispatch = useDispatch();
	const cartState = useSelector((state) => state['cart']);

	return (
		<div className='table-responsive'>
			<table className='table'>
				<thead>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>book</th>
						<th scope='col'>Price</th>
						<th scope='col'>Quantity</th>
						<th scope='col' colSpan={2}>
							Subtotal
						</th>
					</tr>
				</thead>
				<tbody>
					{cartState.items.map((item, index) => {
						return (
							<tr key={item._id}>
								<th scope='row'>{index + 1}</th>
								<td className='td-title'>
									<img
										src={item.image}
										alt={item.title}
										className='img-fluid'
										width={70}
										height={100}
									/>
									<Link to={`/books/${item.slug}`} className='mx-2'>
										{item.title}
									</Link>
								</td>
								<td className='td-price'> {item.price}$ </td>
								<td className='td-quantity'>
									<Quantity
										initQuantity={item.quantity}
										onQuantityChange={(quantity) =>
											dispatch(updateCartItem({ cartId: item._id, quantity }))
										}
									/>
								</td>
								<td className='td-total'>
									{(item.price * item.quantity).toFixed(2)}$
								</td>
								<td className="td-price'">
									<button
										className='btn-close'
										title='remove from cart'
										onClick={() =>
											dispatch(deleteCartItem({ cartId: item._id }))
										}
										type='button'
									></button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default BooksTable;
