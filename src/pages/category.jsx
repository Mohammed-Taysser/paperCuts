import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import useJsonServerToast from '../context/IsJsonServerDown';
import { CATEGORY, CategoryAPI } from '../api/Localhost';

function Category() {
  const is_jsonServer_down = useContext(useJsonServerToast);
  const [category, setCategory] = useState(CATEGORY);

  useEffect(() => {
    if (is_jsonServer_down) {
      setCategory(CATEGORY);
    } else {
      api_get_category();
    }
  }, []);

  const api_get_category = async () => {
    await CategoryAPI.get('/')
      .then(function (response) {
        // handle success
        setCategory(response.data);
      })
      .catch(function (error) {
        // handle error
      })
      .then(function () {
        // always executed
      });
  };

  const category_list = () => {
    return category.map((cty) => {
      return (
        <div className='col-6 col-md-4 col-lg-3 my-3' key={cty.id}>
          <div className='card border-0 nice-shadow h-100 single-category p-4 pb-2'>
            <div className='img'>
              <img src={cty.img} className='card-img-top' alt={cty.title} />
            </div>
            <div className='card-body text-center'>
              <h5 className='card-title m-0'>
                <Link to={`/category/${cty.id}`} className='stretched-link'>
                  {cty.title}
                </Link>
              </h5>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Banner title='our category' subtitle='our space' />
      <section className='my-5 py-5'>
        <div className='container'>
          <div className='row justify-content-center align-items-center'>
            {category_list()}
          </div>
        </div>
      </section>
    </>
  );
}

export default Category;
