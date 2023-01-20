import React from 'react';
import { useSelector } from 'react-redux';

const BasketTable = () => {
	const cartState = useSelector((state) => state['cart']);

	return (
		<div className='table-responsive'>
			<table className='table'>
				<tbody>
					<tr>
						<td>
							<h6>Subtotal</h6>
						</td>
						<td>
							<span> ${cartState.subtotal.toFixed(2)}</span>
						</td>
					</tr>
					<tr>
						<td>
							<h6>Shipping</h6>
						</td>
						<td>
							<span> Shipping Flat rate: ${cartState.shipping}</span>
						</td>
					</tr>
					<tr>
						<td>
							<h6>Total</h6>
						</td>
						<td>
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

export default BasketTable;
