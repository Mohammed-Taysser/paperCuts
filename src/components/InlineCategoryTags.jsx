import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORY, CategoryAPI } from '../api/Localhost';
import Spinner from './bootstrap/Spinner';

const InlineCategoryTags = (props) => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      let filterd_category = CATEGORY.filter((cty) =>
        props.category.includes(cty.id)
      );

      if (filterd_category.length > 0) {
        let temp_cat = [];

        filterd_category.forEach((cty, index) => {
          temp_cat.push(
            <Link to={`/category/${cty.slug}`} key={index}>
              {cty.title}
            </Link>
          );
          if (filterd_category.length - 1 !== index) {
            temp_cat.push(' , ');
          }
        });
        return <>category: {temp_cat}</>;
      } else {
        return <small>no category</small>;
      }
    } else {
      return <small>no category</small>;
    }
  };
  return <Render />;
};

export default InlineCategoryTags;
