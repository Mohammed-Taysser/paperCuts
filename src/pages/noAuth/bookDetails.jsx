import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../components/bootstrap/Alert';
import Spinner from '../../components/bootstrap/Spinner';
import TabAndNav from '../../components/book-details/TabAndNav';
import usePageTitle from '../../hooks/usePageTitle';
import WithBanner from '../../layout/paperCuts/WithBanner.paperCuts';
import { fetchBook, fetchRelatedBooks } from '../../redux/features/books.slice';
import RelatedBooks from '../../components/book-details/RelatedBooks';
import BookDetailsColumn from '../../components/book-details/BookDetailsColumn';
import { onImageNotLoad } from '../../components/ManipulateData';

const RenderBook = ({ booksState, setPageTitle }) => {
	if (booksState.loading) {
		return <Spinner />;
	} else if (booksState.error) {
		return <Alert> {JSON.stringify(booksState.error)} </Alert>;
	} else if (booksState.book) {
		setPageTitle(booksState.book.title);
		return (
			<>
				<div className='row justify-content-center'>
					<div className='col-md-4 my-3'>
						<div className='img-container'>
							<img
								src={booksState.book.image}
								alt={booksState.book.title}
								className='img-fluid'
								onError={onImageNotLoad}
							/>
						</div>
					</div>
					<BookDetailsColumn />
				</div>
				<TabAndNav currentBook={booksState.book} />
				<RelatedBooks />
			</>
		);
	} else {
		return <Alert> no book found </Alert>;
	}
};

function BooksDetails() {
	const dispatch = useDispatch();
	const { slug } = useParams();
	const [, setPageTitle] = usePageTitle('Book Details');
	const booksState = useSelector((state) => state['books']['single']);

	useEffect(() => {
		dispatch(fetchBook({ slug }));
		dispatch(fetchRelatedBooks());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [slug]);

	return (
		<WithBanner
			title={booksState.book ? booksState.book.title : 'book details'}
			subtitle='products'
		>
			<section className='book-details-page my-5'>
				<div className='container'>
					<RenderBook booksState={booksState} setPageTitle={setPageTitle} />
				</div>
			</section>
		</WithBanner>
	);
}

export default BooksDetails;
