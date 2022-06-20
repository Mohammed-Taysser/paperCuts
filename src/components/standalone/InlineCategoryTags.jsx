import React from 'react';
import { Link } from 'react-router-dom';

const InlineCategoryTags = (props) => {
  const { category } = props;
  let tags = [],
    separator = ' , ';

  category.forEach((cty, index) => {
    let tag = (
      <Link to={`/category/${cty.slug}`} key={index}>
        {cty.title}
      </Link>
    );
    tags.push(tag, separator);
  });
  // Remove Last Comma
  tags.pop();
  return <> {tags} </>;
};

InlineCategoryTags.defaultProps = {
  category: [],
};

export default InlineCategoryTags;
