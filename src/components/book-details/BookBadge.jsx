import React from 'react';
import { diff_in_days } from '../ManipulateData';

const BookNewBadge = ({ booksState }) => {
	if (booksState.book.publishedAt) {
		const DAYS_NUMBER = 7;
		if (diff_in_days(new Date(), booksState.book.publishedAt) < DAYS_NUMBER) {
			return <small className='badge rounded-pill bg-warning mx-1'>new</small>;
		}
	}
	return <></>;
};

const BookBadgeSellerBadge = ({ booksState }) => {
	if (booksState.book.reviews) {
		const REVIEWS_NUMBER = 5;
		if (booksState.book.reviews >= REVIEWS_NUMBER) {
			return (
				<small className='badge rounded-pill bg-info mx-1'>best seller</small>
			);
		}
	}
	return <></>;
};

export { BookNewBadge, BookBadgeSellerBadge };
