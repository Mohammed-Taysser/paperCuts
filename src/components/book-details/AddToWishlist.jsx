import React, { useLayoutEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Alert from '../bootstrap/Alert';
import Spinner from '../bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import {
	addBookToWishlist,
	fetchWishlistByBookId,
	removeBookFromWishlist,
} from '../../redux/features/wishlist.slice';

function AddToWishList(props) {
	const { currentBook } = props;
	const dispatch = useDispatch();
	const wishlistState = useSelector((state) => state['wishlist']['single']);

	useLayoutEffect(() => {
		dispatch(fetchWishlistByBookId({ id: currentBook._id }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onAddBtnClick = async (evt) => {
		evt.preventDefault();
		const bookData = {
			title: currentBook.title,
			bookId: currentBook._id,
			slug: currentBook.slug,
			image: currentBook.image,
			price: currentBook.price,
			stars: currentBook.stars,
			author: currentBook.author,
		};

		dispatch(addBookToWishlist({ bookData }));
	};

	const onRemoveBtnClick = (evt) => {
		evt.preventDefault();
		dispatch(removeBookFromWishlist({ wishlistId: wishlistState.item._id }));
	};

	const RenderButton = () => {
		if (wishlistState.item && wishlistState.item.bookId === currentBook._id) {
			return (
				<a
					href='#remove-from-wishlist'
					className='css-tooltip'
					data-tooltip='remove from wishlist'
					onClick={onRemoveBtnClick}
				>
					<FaHeart className='h4 m-0' />
				</a>
			);
		}
		return (
			<a
				href='#add-to-wishlist'
				className='css-tooltip'
				data-tooltip='add to wishlist'
				onClick={onAddBtnClick}
			>
				<FaRegHeart className='h4 m-0' />
			</a>
		);
	};

	if (wishlistState.loading) {
		return <Spinner />;
	} else if (wishlistState.error) {
		return <Alert sm>{JSON.stringify(wishlistState.error)}</Alert>;
	} else {
		return <RenderButton />;
	}
}

export default AddToWishList;
