import React, { useLayoutEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategory } from '../../redux/features/category.slice';
import Alert from '../bootstrap/Alert';
import Spinner from '../bootstrap/Spinner';

function CategoryTags(props) {
	const dispatch = useDispatch();
	const categoryState = useSelector((state) => state['category']['all']);
	const [usedCategory, setUsedCategory] = useState(props.userCategory);
	const [availableCategory, setAvailableCategory] = useState([]);

	useLayoutEffect(() => {
		dispatch(fetchAllCategory());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useLayoutEffect(() => {
		if (
			!categoryState.loading &&
			categoryState.category &&
			!categoryState.error
		) {
			onCategoryLoad();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [categoryState.category]);

	const onCategoryLoad = () => {
		let user_category = [],
			available_category = [];

		categoryState.category.forEach((cty) => {
			if (usedCategory.find((user_cty) => user_cty.slug === cty.slug)) {
				user_category.push(cty);
			} else {
				available_category.push(cty);
			}
		});

		setUsedCategory(user_category);
		setAvailableCategory(available_category);
	};

	const onDeleteCategoryClick = (clicked_cty) => {
		let new_category = usedCategory.filter(
			(cty) => cty.slug !== clicked_cty.slug
		);
		setUsedCategory(new_category);
		setAvailableCategory([...availableCategory, clicked_cty]);
		props.onCategoryChange(new_category);
	};

	const onAddCategoryClick = (clicked_cty) => {
		setAvailableCategory((availableCty) =>
			availableCty.filter((cty) => cty.slug !== clicked_cty.slug)
		);

		let new_user_category = [...usedCategory, clicked_cty];
		setUsedCategory(new_user_category);
		props.onCategoryChange(new_user_category);
	};

	const GetUserCategory = () => {
		if (usedCategory.length > 0) {
			let temp_user_category = usedCategory.map((cty) => {
				return (
					<div
						className='badge rounded-pill bg-aurora d-flex justify-content-between align-items-center m-1'
						key={cty.slug}
					>
						<span>{cty.title}</span>
						<MdClose
							className='h6 my-0 ms-1 cursor-pointer'
							onClick={() => onDeleteCategoryClick(cty)}
						/>
					</div>
				);
			});

			return <div className='d-flex flex-wrap'>{temp_user_category}</div>;
		} else {
			return <Alert sm>no category chosen</Alert>;
		}
	};

	const GetAvailableCategory = () => {
		if (availableCategory.length > 0) {
			let available_category = availableCategory.map((cty) => {
				return (
					<span
						className='badge rounded-pill bg-aurora m-1 cursor-pointer'
						key={cty.slug}
						onClick={() => onAddCategoryClick(cty)}
					>
						{cty.title}
					</span>
				);
			});

			return <div className='d-flex flex-wrap'>{available_category}</div>;
		} else {
			return <Alert sm>no category available</Alert>;
		}
	};

	if (categoryState.loading) {
		return <Spinner />;
	} else if (categoryState.error) {
		return <Alert sm>{JSON.stringify(categoryState.error)}</Alert>;
	} else if (categoryState.category && categoryState.category.length > 0) {
		return (
			<>
				<div className='col-md-6 my-3  '>
					<h6 className='my-3'>{props.label}</h6>
					<GetUserCategory />
				</div>
				<div className='col-md-6 my-3 '>
					<h6 className='my-3'>available categories</h6>
					<GetAvailableCategory />
				</div>
			</>
		);
	} else {
		return <Alert sm>no category found</Alert>;
	}
}

CategoryTags.defaultProps = {
	onCategoryChange: (data) => console.log(data),
	label: 'choose category',
};

export default CategoryTags;
