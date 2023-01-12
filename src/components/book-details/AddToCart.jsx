import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { BsCartDash, BsCartPlus } from 'react-icons/bs';
import {
	createCartItem,
	deleteCartItem,
	getCartByBookId,
	updateCartQuantity,
} from '../../api/cart.api';
import Quantity from '../Quantity';
import Alert from '../bootstrap/Alert';
import Spinner from '../bootstrap/Spinner';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItemByBookId } from '../../redux/features/cart.slice';

function AddToCart(props) {
	const { currentBook } = props;
	const dispatch = useDispatch();
	const cartState = useSelector((state) => state['cart']['single']);
	// const [loading, setLoading] = useState(true);
	const [quantity, setQuantity] = useState(1);
	const [message, setMessage] = useState(null);
	// const [currentCart, setCurrentCart] = useState(null);

	useLayoutEffect(() => {
		dispatch(fetchCartItemByBookId({id:currentBook._id}));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if(cartState.item){onCartItemsLoad(cartState.item)}
	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cartState.item])
	


	const onCartItemsLoad = (response_data) => {
		// setCurrentCart(response_data);
		if (response_data) {
			setQuantity(response_data.quantity);
			setMessageByType('success', 'In cart');
		}
	};

	const setMessageByType = (type, label = '') => {
		switch (type) {
			case 'success':
				setMessage({
					type: 'success',
					label: <>{label}</>,
				});
				break;
			case 'error':
				setMessage({
					type: 'danger',
					label: <>{label}</>,
				});
				break;

			case 'warn':
				setMessage({
					type: 'warning',
					label: <>{label}</>,
				});
				break;
			default:
				break;
		}
	};

	const onAddToCartClick = () => {
		// setLoading(true);
		let newBookData = { quantity, ...currentBook, bookId: currentBook._id };
		delete newBookData._id;
		createCartItem(newBookData)
			.then((response) => {
				// setCurrentCart(response.data);
				setMessageByType(
					'success',
					<>
						successfully added to{' '}
						<Link to='/cart' className='alert-link'>
							cart
						</Link>
					</>
				);
			})
			.catch((error) => {
				setMessageByType('error', error.message);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	const onUpdateCartBook = () => {
		// if (quantity !== currentCart.quantity) {
		// 	setLoading(true);
		// 	updateCartQuantity(currentCart._id, quantity)
		// 		.then((response) => {
		// 			setCurrentCart(response.data);
		// 			setMessageByType('success', 'successfully updated');
		// 		})
		// 		.catch((error) => {
		// 			setMessageByType('error', error.message);
		// 		})
		// 		.finally(() => {
		// 			setLoading(false);
		// 		});
		// } else {
		// 	setMessageByType('warn', 'no change');
		// }
	};

	const onRemoveBtnClick = () => {
		// setLoading(true);

		deleteCartItem(cartState.item._id)
			.then(() => {
				setMessageByType('success', ' Success: Removed From Cart');
				// setCurrentCart(null);
				setQuantity(1);
			})
			.catch((error) => {
				setMessageByType('error', error.message);
			})
			.finally(() => {
				// setLoading(false);
			});
	};

	const RenderAddToCartButton = () => {
		if (cartState.item) {
			return (
				<>
					<button className='btn btn-aurora mx-4' onClick={onUpdateCartBook}>
						<BiEdit className='h5 m-0' /> Save
					</button>
					<button
						className='btn btn-outline-danger'
						type='button'
						onClick={onRemoveBtnClick}
					>
						<BsCartDash className='h5 m-0' /> Remove
					</button>
				</>
			);
		} else {
			return (
				<button className='btn btn-aurora mx-4' onClick={onAddToCartClick}>
					<BsCartPlus className='h5 m-0' /> Add To Cart
				</button>
			);
		}
	};

	if (cartState.loading) {
		return <Spinner />;
	}else if(cartState.error){
	return <Alert>{JSON.stringify(cartState.error)}</Alert>} 
	
	else {
		return (
			<form onSubmit={(evt) => evt.preventDefault()}>
				{message && (
					<Alert sm color={message.type}>
						{message.label}
					</Alert>
				)}
				<div className='d-flex my-3'>
					<Quantity onQuantityChange={setQuantity} initQuantity={quantity} />
					<RenderAddToCartButton />
				</div>
			</form>
		);
	}
}

export default AddToCart;
