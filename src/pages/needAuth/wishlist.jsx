import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from '../../components/bootstrap/Alert';
import { RowOfPlaceholderCard } from '../../components/bootstrap/Placeholder';
import Banner from '../../components/standalone/Banner';
import BookList from '../../components/standalone/BookList';
import usePageTitle from '../../hooks/usePageTitle';
import { fetchAllWishlist } from '../../redux/features/wishlist.slice';

function Wishlist() {
	usePageTitle('Wishlist');
	const dispatch = useDispatch();
	const wishlistState = useSelector((state) => state['wishlist']['all']);

	useEffect(() => {
		dispatch(fetchAllWishlist());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const RenderWishlist = () => {
		if (wishlistState.loading) {
			return <RowOfPlaceholderCard num={6} />;
		} else if (wishlistState.error) {
			return <Alert>{JSON.stringify(wishlistState.error)}</Alert>;
		} else if (wishlistState.items && wishlistState.items.length > 0) {
			return <BookList books={wishlistState.items} />;
		} else {
			return (
				<Alert>
					no items added yet. see
					<Link to='/books' className='alert-link mx-1'>
						books
					</Link>
					or
					<Link to='/category' className='alert-link mx-1'>
						category
					</Link>
				</Alert>
			);
		}
	};

	return (
		<>
			<Banner title='wishlist' subtitle='favorites' />
			<div className='container my-5 py-5'>
				<RenderWishlist />
			</div>
		</>
	);
}

export default Wishlist;
