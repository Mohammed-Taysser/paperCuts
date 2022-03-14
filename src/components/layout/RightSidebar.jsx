import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../components/Banner';
import { CATEGORY, TOP_FIVE } from '../../api/Localhost';
import JsonServerToast from '../../context/IsJsonServerDown';

function RightSidebar(props) {
  const is_jsonServer_down = useContext(JsonServerToast);
  const [categories, setCategories] = useState(CATEGORY);

  useEffect(() => {
    initRender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is_jsonServer_down]);

  const initRender = () => {
    if (is_jsonServer_down) {
      setCategories(CATEGORY);
    }
  };

  const CategoryList = () => {
    return (
      <ul className='list-unstyled'>
        {categories.map((cat, index) => {
          return (
            <li className='special-small-title my-2' key={index}>
              <Link to={`/category/${cat.slug}`}>
                {cat.title}
                <small className='text-muted'>({cat.books.length})</small>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  const TopFiveOfWeek = () => {
    let top_5 = TOP_FIVE.map((book, index) => {
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

  const Sidebar = () => {
    return (
      <div className='ms-lg-3'>
        <section className='category-section'>
          <h4 className='mb-3'>categories</h4>
          <CategoryList />
        </section>
        <section className='top-five-section mt-4'>
          <h4 className='mb-3'>Top 5 of the week</h4>
          <TopFiveOfWeek />
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
