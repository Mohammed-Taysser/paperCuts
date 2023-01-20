import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from '../../components/bootstrap/Alert';
import Spinner from '../../components/bootstrap/Spinner';
import Banner from '../../components/standalone/Banner';
import { fetchTop5Books } from '../../redux/features/books.slice';
import { fetchAllCategory } from '../../redux/features/category.slice';

function RightSidebar(props) {
	const dispatch = useDispatch();
	const categoryState = useSelector((state) => state['category']['all']);
	const booksState = useSelector((state) => state['books']['top5']);

	useEffect(() => {
		dispatch(fetchAllCategory());
		dispatch(fetchTop5Books());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const CategoryList = () => {
		if (categoryState.loading) {
			return <Spinner />;
		} else if (categoryState.error) {
			return <Alert sm> {JSON.stringify(categoryState.error)} </Alert>;
		} else if (categoryState.category && categoryState.category.length > 0) {
			return (
				<ul className='list-unstyled'>
					{categoryState.category.map((cat) => {
						return (
							<li className='special-small-title my-2' key={cat._id}>
								<Link to={`/category/${cat.slug}`}>{cat.title}</Link>
							</li>
						);
					})}
				</ul>
			);
		} else {
			return <Alert sm> no category found </Alert>;
		}
	};

	const TopFiveOfWeek = () => {
		if (booksState.loading) {
			return <Spinner />;
		} else if (booksState.error) {
			return <Alert> {JSON.stringify(booksState.error)}</Alert>;
		} else if (booksState.books && booksState.books.length > 0) {
			return (
				<>
					{booksState.books.map((book, index) => {
						return (
							<Link to={`/books/${book.slug}`} key={index}>
								<img
									src={book.image}
									alt={book.title}
									className='m-1 img-fluid d-inline-block'
									width={50}
									height={120}
								/>
							</Link>
						);
					})}
				</>
			);
		} else {
			return <Alert sm> no books found </Alert>;
		}
	};

	const Sidebar = () => {
		return (
			<div className='ms-lg-3'>
				<section className='category-section'>
					<h4 className='mb-3'>categories</h4>
					<CategoryList />
				</section>
				<section className='top-five-section mt-4'>
					<h4 className='mb-3'>Top 5 of the week</h4>
					<TopFiveOfWeek />
				</section>
			</div>
		);
	};

	return (
		<>
			<Banner title={props.title} subtitle={props.subtitle} />
			<section className='py-5 my-5'>
				<div className='container'>
					<div className='row justify-content-center'>
						<div className='col-lg-9 my-3'>{props.children}</div>
						<div className='col-lg-3 my-3'>
							<Sidebar />
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default RightSidebar;
