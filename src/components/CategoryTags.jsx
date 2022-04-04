import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { CATEGORY, CategoryAPI } from '../api/Localhost';
import Spinner from './bootstrap/Spinner';
import Alert from './bootstrap/Alert';

function CategoryTags(props) {
  const { onCategoryChange, label } = props;
  const [apiCategory, setApiCategory] = useState([]);
  const [userCategory, setUserCategory] = useState(props.userCategory || []);
  const [availableCategory, setAvailableCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api_get_category();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_category = () => {
    CategoryAPI.get('/')
      .then((response) => {
        onCategoryLoad(response.data);
      })
      .catch((error) => {
        onCategoryLoad(CATEGORY);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onCategoryLoad = (categories) => {
    setApiCategory(categories);

    let user_category = [],
      available_category = [];

    categories.forEach((cty) => {
      if (userCategory.includes(cty.id)) {
        user_category.push(cty.id);
      } else {
        available_category.push(cty.id);
      }
    });

    setUserCategory(user_category);
    setAvailableCategory(available_category);
  };

  const onDeleteCategoryClick = (categoryId) => {
    let new_category = userCategory.filter((cty) => cty !== categoryId);
    setUserCategory(new_category);
    setAvailableCategory([...availableCategory, categoryId]);
    onCategoryChange(new_category);
  };

  const onAddCategoryClick = (clickedCategory) => {
    setAvailableCategory(
      availableCategory.filter((cty) => cty !== clickedCategory)
    );

    let new_category = [...userCategory, clickedCategory];
    setUserCategory(new_category);
    onCategoryChange(new_category);
  };

  const getCategoryTitle = (categoryId) => {
    return apiCategory.find((cty) => cty.id === categoryId).title;
  };

  const GetUserCategory = () => {
    if (userCategory.length > 0) {
      let temp_user_category = userCategory.map((cty) => {
        return (
          <div
            className='badge rounded-pill bg-aurora d-flex justify-content-between align-items-center m-1'
            key={cty}
          >
            <span>{getCategoryTitle(cty)}</span>
            <MdClose
              className='h6 my-0 ms-1 cursor-pointer'
              onClick={() => onDeleteCategoryClick(cty)}
            />
          </div>
        );
      });

      return <div className='d-flex flex-wrap'>{temp_user_category}</div>;
    } else {
      return (
        <Alert className='py-1 d-inline-block small'>
          <p className='m-0'>no category chosen</p>
        </Alert>
      );
    }
  };

  const GetAvailableCategory = () => {
    if (availableCategory.length > 0) {
      let available_category = availableCategory.map((cty) => {
        return (
          <span
            className='badge rounded-pill bg-aurora m-1 cursor-pointer'
            key={cty}
            onClick={() => onAddCategoryClick(cty)}
          >
            {getCategoryTitle(cty)}
          </span>
        );
      });

      return <div className='d-flex flex-wrap'>{available_category}</div>;
    } else {
      return (
        <Alert className='py-1 d-inline-block small'>
          <p className='m-0'>no category available</p>
        </Alert>
      );
    }
  };

  const Render = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (apiCategory && apiCategory.length > 0) {
      return (
        <>
          <h6 className='my-3'>{label}</h6>
          <GetUserCategory />
          <h6 className='my-3'>available categories</h6>
          <GetAvailableCategory />
        </>
      );
    } else {
      return (
        <Alert className='p-1 small'>
          <p className='m-0'>no category found</p>
        </Alert>
      );
    }
  };

  return <Render />;
}

CategoryTags.defaultProps = {
  onCategoryChange: (data) => console.log(data),
  label: 'choose category',
};

export default CategoryTags;
