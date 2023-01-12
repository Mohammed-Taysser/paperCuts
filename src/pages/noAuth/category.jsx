import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from '../../components/bootstrap/Alert';
import { RowOfPlaceholderCard } from '../../components/bootstrap/Placeholder';
import usePageTitle from '../../hooks/usePageTitle';
import WithBanner from '../../layout/paperCuts/WithBanner.paperCuts';
import { fetchAllCategory } from '../../redux/features/category.slice';

const CategoryList = ({ category }) => {
	return (
		<div className='row justify-content-center align-items-center'>
			{category.map((cty) => {
				return (
					<div className='col-6 col-md-4 col-lg-3 my-3' key={cty._id}>
						<div className='card border-0 nice-shadow h-100 single-category p-4 pb-2'>
							<div className='img'>
								<img src={cty.img} className='card-img-top' alt={cty.title} />
							</div>
							<div className='card-body text-center'>
								<h5 className='card-title m-0'>
									<Link to={`/category/${cty.slug}`} className='stretched-link'>
										{cty.title}
									</Link>
								</h5>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

const RenderCategories = ({ categoryState }) => {
	if (categoryState.loading) {
		return <RowOfPlaceholderCard num={6} />;
	} else if (categoryState.error) {
		return <Alert> {JSON.stringify(categoryState.error)} </Alert>;
	} else if (categoryState.category && categoryState.category.length > 0) {
		return <CategoryList category={categoryState.category} />;
	} else {
		return <Alert> no category found </Alert>;
	}
};

function Category() {
	usePageTitle('Category');
	const dispatch = useDispatch();
	const categoryState = useSelector((state) => state['category']['all']);

	useEffect(() => {
		dispatch(fetchAllCategory());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<WithBanner title='our category' subtitle='our space'>
			<section className='my-5 py-5'>
				<div className='container'>
					<RenderCategories categoryState={categoryState} />
				</div>
			</section>
		</WithBanner>
	);
}

export default Category;
