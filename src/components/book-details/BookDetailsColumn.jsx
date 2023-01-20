import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Stars } from '../ManipulateData';
import Alert from '../bootstrap/Alert';
import InlineCategoryTags from '../standalone/InlineCategoryTags';
import AddToCart from './AddToCart';
import AddToWishList from './AddToWishlist';
import { BookBadgeSellerBadge, BookNewBadge } from './BookBadge';

const BookDetailsColumn = () => {
	const booksState = useSelector((state) => state['books']['single']);
	const { isLoggedIn } = useSelector((state) => state['auth']);

	return (
		<div className='col-md-8 my-3'>
			<div className='wrapper'>
				<div className='d-flex align-items-start justify-content-between'>
					<span className='special-small-title'>
						publisher: {booksState.book.publisher || 'not provide'}
					</span>
					{isLoggedIn && <AddToWishList currentBook={booksState.book} />}
				</div>
				<div className='d-flex align-items-start'>
					<h1 className='h2 mb-2'>{booksState.book.title} </h1>
					<BookNewBadge booksState={booksState} />
					<BookBadgeSellerBadge booksState={booksState} />
				</div>
				<div className='d-flex align-items-end'>
					<Stars stars_length={booksState.book.stars} />
					<span className='small mx-4 text-muted special-small-title'>
						({booksState.book.reviews}reviews)
					</span>
				</div>
				<p className='mt-2 h4'>{booksState.book.price}$</p>
				<p className='mt-3 text-muted'>{booksState.book.info || 'no info'}</p>
				{isLoggedIn ? (
					<AddToCart currentBook={booksState.book} />
				) : (
					<Alert sm>
						<Link to='/login' className='alert-link mx-1'>
							login
						</Link>
						to active add to cart
					</Alert>
				)}
				<InlineCategoryTags category={booksState.book.category} />
				<div className='mt-3'>
					<div className='d-md-flex align-items-center'>
						<Link to={`/authors/${booksState.book.author.username}`}>
							<img
								src={booksState.book.author.avatar}
								alt={`${booksState.book.author.name}`}
								width='80'
								height='80'
								className='img-fluid rounded-circle border-aurora p-1 mb-2 mb-md-0'
							/>
						</Link>
						<div className=' mx-3'>
							<h5 className='mb-1'>
								<Link to={`/authors/${booksState.book.author.username}`}>
									{booksState.book.author.name}
								</Link>
							</h5>
							<h6 className='m-0 text-muted'>
								{booksState.book.author.username}
							</h6>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BookDetailsColumn;
