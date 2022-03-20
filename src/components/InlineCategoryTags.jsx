import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORY, CategoryAPI } from '../api/Localhost';
import Spinner from './bootstrap/Spinner';

const InlineCategoryTags = (props) => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    api_get_category();
  }, []);

  const api_get_category = () => {
    CategoryAPI.get('/')
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        setCategory(CATEGORY);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const Render = () => {
    if (loading) {
      return <Spinner />;
    }

    if (category.length > 0) {
      let category_items = [];

      category.forEach((cty, index) => {
        if (props.category.includes(cty.id)) {
          category_items.push(
            <Link to={`/category/${cty.slug}`} key={index}>
              {cty.title}
            </Link>
          );
          category_items.push(' , ');
        }
      });

      category_items.pop();

      return <>category: {category_items}</>;
    } else {
      return <small>no category</small>;
    }
  };
  return <Render />;
};

export default InlineCategoryTags;
