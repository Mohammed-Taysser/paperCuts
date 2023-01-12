import React, { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import Alert from '../bootstrap/Alert';
import SingleBook from '../../components/single/SingleBook';
import SectionTitle from '../../components/standalone/SectionTitle';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLatestBooks } from '../../redux/features/books.slice';
import { RowOfPlaceholderCard } from '../bootstrap/Placeholder';

const RenderBooks = (props) => {
	const { books, loading, error } = props.bookState;
	if (loading) {
		return <RowOfPlaceholderCard />;
	} else if (books && books.length > 0) {
		return (
			<div className='row justify-content-center align-items-stretch'>
				{books.map((book) => (
					<SingleBook book={book} key={book._id} />
				))}
			</div>
		);
	} else if (error) {
		return <Alert>{JSON.stringify(error)}</Alert>;
	} else {
		return <></>;
	}
};

function LatestBooks() {
	const dispatch = useDispatch();
	const bookState = useSelector((state) => state['books']['latest']);

	useLayoutEffect(() => {
		// @ts-ignore
		dispatch(fetchLatestBooks());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<section className='latest-books py-5 my-5'>
			<SectionTitle subtitle='shop online' title='Latest books online' />
			<div className='container'>
				<RenderBooks bookState={bookState} />
			</div>
			<div className='text-center mt-4'>
				<Link to='/books' className='btn btn-aurora'>
					show more books
				</Link>
			</div>
		</section>
	);
}

export default LatestBooks;
