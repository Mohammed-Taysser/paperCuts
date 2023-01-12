import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RowOfPlaceholderCard } from '../../components/bootstrap/Placeholder';
import Alert from '../../components/bootstrap/Alert';
import usePageTitle from '../../hooks/usePageTitle';
import WithBanner from '../../layout/paperCuts/WithBanner.paperCuts';
import BookList from '../../components/standalone/BookList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryBySlug } from '../../redux/features/category.slice';
import { fetchBookByQuery } from '../../redux/features/books.slice';

function CategoryDetails() {
	const [, setPageTitle] = usePageTitle('Category Details');
	const { slug } = useParams();
	const dispatch = useDispatch();
	const categoryState = useSelector((state) => state['category']['single']);
	const booksState = useSelector((state) => state['books']['all']);

	useEffect(() => {
		dispatch(fetchCategoryBySlug({ slug }));
		dispatch(fetchBookByQuery({ query: `category=${slug}` }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const RenderCategoryBooks = () => {
		if (booksState.loading) {
			return <RowOfPlaceholderCard num={6} />;
		} else if (booksState.error) {
			return <Alert>{JSON.stringify(booksState.error)}</Alert>;
		} else if (booksState.books && booksState.books.length > 0) {
			setPageTitle(categoryState.title);
			return <BookList books={booksState.books} />;
		} else {
			return <Alert> no books found </Alert>;
		}
	};

	return (
		<WithBanner
			title={categoryState.category ? categoryState.category.title : 'category'}
			subtitle='shop list'
		>
			<section className='my-5 py-5'>
				<div className='container '>
					<RenderCategoryBooks />
				</div>
			</section>
		</WithBanner>
	);
}

export default CategoryDetails;
