import React, { useState, useEffect } from 'react';
import { CategoryAPI, get_category_by_slug } from '../api/Localhost';
import { useParams } from 'react-router-dom';
import Banner from '../components/Banner';
import Alert from '../components/bootstrap/Alert';
import Spinner from '../components/bootstrap/Spinner';
import GetBookByCategory from '../components/GetBookByCategory';

function CategoryDetails() {
  const { slug } = useParams();
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api_get_category();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api_get_category = async () => {
    await CategoryAPI.get(`?slug=${slug}`)
      .then((response) => {
        if (response.data.length === 1) {
          setCurrentCategory(response.data[0]);
        }
      })
      .catch((error) => {
        let cty = get_category_by_slug(slug);
        if (cty) {
          setCurrentCategory(cty);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const BookList = () => {
    if (currentCategory) {
      return <GetBookByCategory getBy={currentCategory.id} />;
    }
    return <Alert>no category found</Alert>;
  };

  return (
    <>
      <Banner
        title={currentCategory ? currentCategory.title : 'category'}
        subtitle='shop list'
      />
      <section className='my-5 py-5'>
        <div className='container '>{loading ? <Spinner /> : <BookList />}</div>
      </section>
    </>
  );
}

export default CategoryDetails;
