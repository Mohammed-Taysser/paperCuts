import React from 'react';
import { Link } from 'react-router-dom';

const CategoryTags = (props) => {
  const { category } = props;

  if (category.length > 0) {
    let temp_cat = [];

    category.forEach((cty, index) => {
      temp_cat.push(
        <Link to={`/category/${cty.id}`} key={index}>
          {cty.label}
        </Link>
      );
      if (category.length - 1 !== index) {
        temp_cat.push(' , ');
      }
    });
    return <div className='mt-3'>category: {temp_cat}</div>;
  }
  return <div className='mt-3'>no category</div>;
};

CategoryTags.defaultProps = {
  category: [],
};

export default CategoryTags;
