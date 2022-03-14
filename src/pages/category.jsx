import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import Spinner from '../components/bootstrap-component/Spinner';
import { CATEGORY, CategoryAPI } from '../api/Localhost';

function Category() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api_get_category();
  }, []);

  const api_get_category = async () => {
    await CategoryAPI.get('/')
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        setCategory(CATEGORY);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const CategoryList = () => {
    if (category.length > 0) {
      let category_items = category.map((cty) => {
        return (
          <div className='col-6 col-md-4 col-lg-3 my-3' key={cty.id}>
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
      });
      return (
        <div className='row justify-content-center align-items-center'>
          {category_items}
        </div>
      );
    }
    return <> no category </>;
  };

  const RenderCategories = () => {
    return loading ? <Spinner /> : <CategoryList />;
  };

  return (
    <>
      <Banner title='our category' subtitle='our space' />
      <section className='my-5 py-5'>
        <div className='container'>
          <RenderCategories />
        </div>
      </section>
    </>
  );
}

export default Category;
