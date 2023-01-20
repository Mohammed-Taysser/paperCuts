import React from 'react';
import SingleBook from '../single/SingleBook';
import Alert from '../bootstrap/Alert';

const BookList = ({ books }) => {
	if (books && books.length > 0) {
		let book_list = books.map((book) => {
			return <SingleBook book={book} key={book._id} />;
		});

		return (
			<div className='row justify-content-center align-items-stretch'>
				{book_list}
			</div>
		);
	}
	return <Alert>No Books Found try another search params</Alert>;
};

export default BookList;
