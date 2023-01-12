import React from 'react';
import Alert from '../bootstrap/Alert';
import SingleBook from '../single/SingleBook';

function BookList(props) {
	const { books, outerClass } = props;
	if (books && books.length > 0) {
		let books_list = books.map((book) => (
			<SingleBook book={book} key={book._id} />
		));
		return (
			<div
				className={`row justify-content-center align-items-center align-items-stretch ${outerClass}`}
			>
				{books_list}
			</div>
		);
	} else {
		return <Alert>no available books found</Alert>;
	}
}

BookList.defaultProps = {
	books: [],
	outerClass: '',
};

export default BookList;
