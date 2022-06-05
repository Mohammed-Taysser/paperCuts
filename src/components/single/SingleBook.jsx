import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { onImageNotLoad, Stars } from '../ManipulateData';
import AddToWishList from '../AddToWishlist';
import '../../assets/scss/components/singleBook.scss';

/**
 * @use `withWishlist` to enable add or remove from wishlist
 * @use `md` to change md bootstrap grid system as media query
 * @param {Object} props Object of setting (book, withWishlist, md)
 * @returns  JSX
 */
function SingleBook(props) {
	const { book, withWishlist, md } = props;
	const { token: reduxToken } = useSelector((state) => state['auth']);

	return (
		<div className={`col-sm-6 col-md-${md} my-3`}>
			<div className="card border-0 nice-shadow h-100 single-book">
				{reduxToken && withWishlist && (
					<div
						className="position-absolute top-0 end-0 m-2"
						style={{ zIndex: 2 }}
					>
						<AddToWishList currentBook={book} />
					</div>
				)}
				<div className="img">
					<img
						src={book.image}
						className="card-img-top"
						onError={onImageNotLoad}
						alt={book.title}
					/>
				</div>
				<div className="card-body">
					<h5 className="card-title">
						<Link to={`/books/${book.slug}`} className="">
							{book.title}
						</Link>
					</h5>
					<Link
						className="text-muted h6"
						to={`/authors/${book.author.username}`}
					>
						{book.author.name}
					</Link>
					<h6 className="d-md-flex justify-content-between mt-2">
						<span className="text-aurora">{book.price}$</span>
						<span className="d-block d-md-inline">
							{<Stars stars_length={book.stars} />}
						</span>
					</h6>
				</div>
			</div>
		</div>
	);
}

SingleBook.defaultProps = {
	md: 3,
	book: {},
};

export default SingleBook;
