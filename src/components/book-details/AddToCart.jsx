import React, { useEffect, useState } from 'react';
import { BsCartPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	addCartItem,
	fetchCartItemByBookId,
} from '../../redux/features/cart.slice';
import Quantity from '../Quantity';
import Alert from '../bootstrap/Alert';
import Spinner from '../bootstrap/Spinner';

function AddToCart(props) {
	const { currentBook } = props;
	const dispatch = useDispatch();
	const cartState = useSelector((state) => state['cart']['single']);
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		dispatch(fetchCartItemByBookId({ id: currentBook._id }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onAddToCartClick = () => {
		let newBookData = { quantity, ...currentBook, bookId: currentBook._id };
		delete newBookData._id;
		dispatch(addCartItem({ data: newBookData }));
	};

	if (cartState.loading) {
		return <Spinner />;
	} else if (cartState.error) {
		return <Alert>{JSON.stringify(cartState.error)}</Alert>;
	} else if (cartState.item) {
		return (
			<Alert sm color='success'>
				already added to{' '}
				<Link to='/cart' className='alert-link'>
					cart
				</Link>
			</Alert>
		);
	} else {
		return (
			<form onSubmit={(evt) => evt.preventDefault()}>
				<div className='d-flex my-3'>
					<Quantity onQuantityChange={setQuantity} initQuantity={quantity} />
					<button className='btn btn-aurora mx-4' onClick={onAddToCartClick}>
						<BsCartPlus className='h5 m-0' /> Add To Cart
					</button>
				</div>
			</form>
		);
	}
}

export default AddToCart;
