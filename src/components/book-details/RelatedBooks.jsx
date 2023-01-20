import React from 'react';
import { RowOfPlaceholderCard } from '../bootstrap/Placeholder';
import Alert from '../bootstrap/Alert';
import SectionTitle from '../standalone/SectionTitle';
import BookList from '../standalone/BookList';
import { useSelector } from 'react-redux';

function RelatedBooks() {
	const relatedBooksState = useSelector((state) => state['books']['related']);

	if (relatedBooksState.loading) {
		return <RowOfPlaceholderCard />;
	} else if (relatedBooksState.error) {
		return <Alert> {JSON.stringify(relatedBooksState.error)} </Alert>;
	} else if (relatedBooksState.books && relatedBooksState.books.length > 0) {
		return (
			<div className='my-5 pt-5'>
				<SectionTitle title='related books' subtitle='you may like' />
				<BookList books={relatedBooksState.books} />
			</div>
		);
	} else {
		return <Alert> no books found </Alert>;
	}
}

export default RelatedBooks;
