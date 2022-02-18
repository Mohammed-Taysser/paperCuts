import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import { CATEGORY, CategoryAPI } from '../api/Localhost';
import JsonServerToast from '../components/JsonServerToast';

function Category() {
  const [category, setCategory] = useState(CATEGORY);
  const [jsonServerIsDown, setJsonServerIsDown] = useState(false);
  useEffect(() => {
    api_get_category();
  }, []);

  const api_get_category = async () => {
    await CategoryAPI.get('/')
      .then(function (response) {
        // handle success
        setJsonServerIsDown(false);
        setCategory(response.data);
      })
      .catch(function (error) {
        // handle error
        if (error.toString() === 'Error: Network Error') {
          setJsonServerIsDown(true);
        }
      })
      .then(function () {
        // always executed
      });
  };

  const category_list = () => {
    return (
      <>
        {category.map((cty) => {
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
        })}
      </>
    );
  };

  return (
    <>
      {jsonServerIsDown && <JsonServerToast />}
      <Banner title='our category' subtitle='our  space' />
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
