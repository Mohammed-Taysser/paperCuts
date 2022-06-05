import React, { useLayoutEffect, useState } from 'react';
import {
	getCartByBookId,
	createCartItem,
	deleteCartItem,
	updateCartQuantity,
} from '../api/cart.api';
import { BiEdit } from 'react-icons/bi';
import { BsCartPlus, BsCartDash } from 'react-icons/bs';
import Spinner from './bootstrap/Spinner';
import Quantity from './Quantity';
import Alert from './bootstrap/Alert';

function AddToCart(props) {
	const { currentBook } = props;
	const [loading, setLoading] = useState(true);
	const [quantity, setQuantity] = useState(1);
	const [message, setMessage] = useState(null);
	const [currentCart, setCurrentCart] = useState(null);

	useLayoutEffect(() => {
		api_get_cart();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const api_get_cart = () => {
		getCartByBookId(currentBook._id)
			.then((response) => {
				onCartItemsLoad(response.data);
			})
			.catch((error) => {
				setMessageByType('error', error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const onCartItemsLoad = (response_data) => {
		setCurrentCart(response_data);
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
		setLoading(true);
		let newBookData = { quantity, ...currentBook, bookId: currentBook._id };
		delete newBookData._id;
		createCartItem(newBookData)
			.then((response) => {
				setCurrentCart(response.data);
				setMessageByType('success', 'successfully added to cart');
			})
			.catch((error) => {
				setMessageByType('error', error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const onUpdateCartBook = () => {
		if (quantity !== currentCart.quantity) {
			setLoading(true);
			updateCartQuantity(currentCart._id, quantity)
				.then((response) => {
					setCurrentCart(response.data);
					setMessageByType('success', 'successfully updated');
				})
				.catch((error) => {
					setMessageByType('error', error.message);
				})
				.finally(() => {
					setLoading(false);
				});
		} else {
			setMessageByType('warn', 'no change');
		}
	};

	const onRemoveBtnClick = () => {
		setLoading(true);

		deleteCartItem(currentCart._id)
			.then(() => {
				setMessageByType('success', ' Success: Removed From Cart');
				setCurrentCart(null);
				setQuantity(1);
			})
			.catch((error) => {
				setMessageByType('error', error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const RenderAddToCartButton = () => {
		if (currentCart) {
			return (
				<>
					<button className="btn btn-aurora mx-4" onClick={onUpdateCartBook}>
						<BiEdit className="h5 m-0" /> Save
					</button>
					<button
						className="btn btn-outline-danger"
						type="button"
						onClick={onRemoveBtnClick}
					>
						<BsCartDash className="h5 m-0" /> Remove
					</button>
				</>
			);
		} else {
			return (
				<button className="btn btn-aurora mx-4" onClick={onAddToCartClick}>
					<BsCartPlus className="h5 m-0" /> Add To Cart
				</button>
			);
		}
	};

	if (loading) {
		return <Spinner />;
	} else {
		return (
			<form onSubmit={(evt) => evt.preventDefault()}>
				{message && (
					<Alert sm color={message.type}>
						{message.label}
					</Alert>
				)}
				<div className="d-flex my-3">
					<Quantity onQuantityChange={setQuantity} initQuantity={quantity} />
					<RenderAddToCartButton />
				</div>
			</form>
		);
	}
}

export default AddToCart;
