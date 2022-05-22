import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategory } from '../api/category';
import { getTop5 } from '../api/books';
import Spinner from '../components/bootstrap/Spinner';
import Banner from '../components/standalone/Banner';
import Alert from '../components/bootstrap/Alert';

function RightSidebar(props) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState({
    category: true,
    top5: true,
  });
  const [loadingError, setLoadingError] = useState({
    category: null,
    top5: null,
  });
  const [top5, setTop5] = useState([]);

  useEffect(() => {
    get_category_api();
    get_top5_api();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const get_category_api = () => {
    getAllCategory()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        setLoadingError({ ...loadingError, category: error.data });
      })
      .finally(() => {
        setLoading((load) => ({ ...load, category: false }));
      });
  };

  const get_top5_api = () => {
    getTop5()
      .then((response) => {
        setTop5(response.data);
      })
      .catch((error) => {
        setLoadingError({ ...loadingError, top5: error.data });
      })
      .finally(() => {
        setLoading((load) => ({ ...load, top5: false }));
      });
  };

  const CategoryList = () => {
    return (
      <ul className='list-unstyled'>
        {categories.map((cat, index) => {
          return (
            <li className='special-small-title my-2' key={index}>
              <Link to={`/category/${cat.slug}`}>{cat.title}</Link>
            </li>
          );
        })}
      </ul>
    );
  };

  const RenderCategoryList = () => {
    if (loading.category) {
      return <Spinner />;
    } else if (loadingError.category) {
      return <Alert sm> {loadingError.category} </Alert>;
    } else if (categories && categories.length > 0) {
      return <CategoryList />;
    } else {
      return <Alert> no category found </Alert>;
    }
  };

  const TopFiveOfWeek = () => {
    let top_5 = top5.map((book, index) => {
      return (
        <Link to={`/books/${book.slug}`} key={index}>
          <img
            src={book.image}
            alt={book.title}
            className='m-1 img-fluid d-inline-block'
            width={50}
            height={120}
          />
        </Link>
      );
    });
    return <>{top_5}</>;
  };

  const RenderTopFiveOfWeek = () => {
    if (loading.top5) {
      return <Spinner />;
    } else if (loadingError.top5) {
      return <Alert> {loadingError.top5}</Alert>;
    } else if (top5 && top5.length > 0) {
      return <TopFiveOfWeek />;
    } else {
      return <Alert sm> no books found </Alert>;
    }
  };

  const Sidebar = () => {
    return (
      <div className='ms-lg-3'>
        <section className='category-section'>
          <h4 className='mb-3'>categories</h4>
          <RenderCategoryList />
        </section>
        <section className='top-five-section mt-4'>
          <h4 className='mb-3'>Top 5 of the week</h4>
          <RenderTopFiveOfWeek />
        </section>
      </div>
    );
  };

  return (
    <>
      <Banner title={props.title} subtitle={props.subtitle} />
      <section className='py-5 my-5'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9 my-3'>{props.children}</div>
            <div className='col-lg-3 my-3'>
              <Sidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default RightSidebar;
