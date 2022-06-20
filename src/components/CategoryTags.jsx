import React, { useLayoutEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { getAllCategory } from '../api/category.api';
import Spinner from './bootstrap/Spinner';
import Alert from './bootstrap/Alert';

function CategoryTags(props) {
	const { onCategoryChange, label, userCategory } = props;
	const [allCategory, setAllCategory] = useState([]);
	const [usedCategory, setUsedCategory] = useState(userCategory);
	const [availableCategory, setAvailableCategory] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [loadingError, setLoadingError] = useState(null);

	useLayoutEffect(() => {
		getAllCategory()
			.then((response) => {
				onCategoryLoad(response.data);
			})
			.catch((error) => {
				setLoadingError(error.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onCategoryLoad = (categories) => {
		setAllCategory(categories);

		let user_category = [],
			available_category = [];

		categories.forEach((cty) => {
			if (userCategory.find((user_cty) => user_cty.slug === cty.slug)) {
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
		onCategoryChange(new_category);
	};

	const onAddCategoryClick = (clicked_cty) => {
		setAvailableCategory((availableCty) =>
			availableCty.filter((cty) => cty.slug !== clicked_cty.slug)
		);

		let new_user_category = [...usedCategory, clicked_cty];
		setUsedCategory(new_user_category);
		onCategoryChange(new_user_category);
	};

	const GetUserCategory = () => {
		if (usedCategory.length > 0) {
			let temp_user_category = usedCategory.map((cty) => {
				return (
					<div
						className="badge rounded-pill bg-aurora d-flex justify-content-between align-items-center m-1"
						key={cty.slug}
					>
						<span>{cty.title}</span>
						<MdClose
							className="h6 my-0 ms-1 cursor-pointer"
							onClick={() => onDeleteCategoryClick(cty)}
						/>
					</div>
				);
			});

			return <div className="d-flex flex-wrap">{temp_user_category}</div>;
		} else {
			return <Alert sm>no category chosen</Alert>;
		}
	};

	const GetAvailableCategory = () => {
		if (availableCategory.length > 0) {
			let available_category = availableCategory.map((cty) => {
				return (
					<span
						className="badge rounded-pill bg-aurora m-1 cursor-pointer"
						key={cty.slug}
						onClick={() => onAddCategoryClick(cty)}
					>
						{cty.title}
					</span>
				);
			});

			return <div className="d-flex flex-wrap">{available_category}</div>;
		} else {
			return <Alert sm>no category available</Alert>;
		}
	};

	const Render = () => {
		if (isLoading) {
			return <Spinner />;
		} else if (loadingError) {
			return <Alert sm>{loadingError}</Alert>;
		} else if (allCategory && allCategory.length > 0) {
			return (
				<>
					<div className="col-md-6 my-3  ">
						<h6 className="my-3">{label}</h6>
						<GetUserCategory />
					</div>
					<div className="col-md-6 my-3 ">
						<h6 className="my-3">available categories</h6>
						<GetAvailableCategory />
					</div>
				</>
			);
		} else {
			return <Alert sm>no category found</Alert>;
		}
	};

	return <Render />;
}

CategoryTags.defaultProps = {
	onCategoryChange: (data) => console.log(data),
	label: 'choose category',
	userCategory: [],
};

export default CategoryTags;
