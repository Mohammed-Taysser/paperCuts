import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import BookList from '../../components/book-details/BookList';
import FilterForm from '../../components/book-details/FilterForm';
import Alert from '../../components/bootstrap/Alert';
import { SelectField } from '../../components/bootstrap/Form';
import { RowOfPlaceholderCard } from '../../components/bootstrap/Placeholder';
import SELECT_SORT_TYPES from '../../constants/books';
import usePageTitle from '../../hooks/usePageTitle';
import RightSidebar from '../../layout/paperCuts/RightSidebar.paperCuts';
import {
	fetchBookByQuery,
	sortAllBooks,
} from '../../redux/features/books.slice';

const RenderBooks = ({ booksState }) => {
	if (booksState.loading) {
		return <RowOfPlaceholderCard num={8} />;
	} else if (booksState.error) {
		return <Alert> {JSON.stringify(booksState.error)} </Alert>;
	} else if (booksState.books) {
		return <BookList books={booksState.books} />;
	} else {
		return <Alert> no book found </Alert>;
	}
};

function Books() {
	usePageTitle('Books');
	const dispatch = useDispatch();
	const booksState = useSelector((state) => state['books']['all']);
	const [searchParams, setSearchParams] = useSearchParams();
	const [sortType, setSortType] = useState('');

	useEffect(() => {
		dispatch(fetchBookByQuery({ query: searchParams }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams]);

	const onSortSelectChange = (evt) => {
		let sortValue = evt.target.value;

		dispatch(sortAllBooks(sortValue));

		setSortType(sortValue);

		let newSearchParams = new URLSearchParams(searchParams.toString());
		if (searchParams.has('sort')) {
			newSearchParams.set('sort', sortValue);
		} else {
			newSearchParams.append('sort', sortValue);
		}
		setSearchParams(newSearchParams);
	};

	return (
		<RightSidebar title='shop list' subtitle='products'>
			<FilterForm
				onSearchParamsChange={setSearchParams}
				searchParams={searchParams}
			/>
			<div className='filter-results d-md-flex justify-content-between align-items-center mb-4'>
				<span className='text-muted'>
					Showing{' '}
					{booksState.books && (
						<span className='text-aurora'> {booksState.books.length} </span>
					)}
					results
				</span>

				<div className=''>
					<SelectField
						className='w-auto'
						value={sortType}
						name='sort'
						onChange={onSortSelectChange}
						options={SELECT_SORT_TYPES}
					/>
				</div>
			</div>
			<RenderBooks booksState={booksState} />
		</RightSidebar>
	);
}

export default Books;
