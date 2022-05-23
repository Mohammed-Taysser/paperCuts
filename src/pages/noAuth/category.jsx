import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategory } from '../../api/category.api';
import { RowOfPlaceholderCard } from '../../components/bootstrap/Placeholder';
import Alert from '../../components/bootstrap/Alert';
import usePageTitle from '../../hooks/usePageTitle';
import WithBanner from '../../layout/WithBanner';

function Category() {
  usePageTitle('Category');
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    api_get_category();
  }, []);

  const api_get_category = async () => {
    await getAllCategory()
      .then((response) => {
        setCategory(response.data);
      })
      .catch(() => {
        setLoadingError(true);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const CategoryList = () => {
    let category_items = category.map((cty) => {
      return (
        <div className='col-6 col-md-4 col-lg-3 my-3' key={cty._id}>
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
  };

  const RenderCategories = () => {
    if (loading) {
      return <RowOfPlaceholderCard num={6} />;
    } else if (loadingError) {
      return <Alert> Error While Loading category </Alert>;
    } else if (category && category.length > 0) {
      return <CategoryList />;
    } else {
      return <Alert> no category found </Alert>;
    }
  };

  return (
    <WithBanner title='our category' subtitle='our space'>
      <section className='my-5 py-5'>
        <div className='container'>
          <RenderCategories />
        </div>
      </section>
    </WithBanner>
  );
}

export default Category;
