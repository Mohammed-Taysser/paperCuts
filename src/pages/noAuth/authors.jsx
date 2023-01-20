import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../../components/bootstrap/Alert';
import { RowOfPlaceholderCard } from '../../components/bootstrap/Placeholder';
import SingleAuthor from '../../components/single/SingleAuthor';
import usePageTitle from '../../hooks/usePageTitle';
import WithBanner from '../../layout/paperCuts/WithBanner.paperCuts';
import { fetchAllAuthor } from '../../redux/features/author.slice';

function Authors() {
	usePageTitle('Authors');
	const dispatch = useDispatch();
	const authorsState = useSelector((state) => state['authors']['all']);

	useEffect(() => {
		dispatch(fetchAllAuthor())
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);


	const AuthorsList = () => {
		let authors_list = authorsState.authors.map((author) => (
			<SingleAuthor key={author._id} author={author} />
		));
		return (
			<div className="row justify-content-center align-items-center">
				{authors_list}
			</div>
		);
	};

	const RenderAuthors = () => {
		if (authorsState.loading) {
			return <RowOfPlaceholderCard num={8} />;
		} else if (authorsState.error) {
			return <Alert> {JSON.stringify(authorsState.error)} </Alert>;
		} else if (authorsState.authors && authorsState.authors.length > 0) {
			return <AuthorsList />;
		} else {
			return <Alert> no author found </Alert>;
		}
	};

	return (
		<WithBanner title="authors" subtitle="info">
			<section className="my-5 py-5">
				<div className="container">
					<RenderAuthors />
				</div>
			</section>
		</WithBanner>
	);
}

export default Authors;
