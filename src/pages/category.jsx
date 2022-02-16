import React from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';

function Category() {
  const category_list = () => {
    const CATEGORY = [
      {
        id: 1,
        title: 'Action',
        img: 'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-1.jpg',
      },
      {
        id: 2,
        title: 'Art',
        img: 'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-2.jpg',
      },
      {
        id: 3,
        title: 'Best Sellers',
        img: 'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-3.jpg',
      },
      {
        id: 4,
        title: 'Design',
        img: 'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-4.jpg',
      },
      {
        id: 5,
        title: 'Fantasy',
        img: 'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-5.jpg',
      },
      {
        id: 6,
        title: 'History',
        img: 'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-6.jpg',
      },
      {
        id: 7,
        title: 'Home',
        img: 'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-7.jpg',
      },
      {
        id: 8,
        title: 'Love Stories',
        img: 'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-8.jpg',
      },
      {
        id: 9,
        title: 'New',
        img: 'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-9.jpg',
      },
    ];
    return (
      <>
        {CATEGORY.map((cat) => {
          return (
            <div className='col-sm-6 col-md-4 col-lg-3 my-3' key={cat.id}>
              <div className='card border-0 nice-shadow h-100 single-category'>
                <div className='img'>
                  <img src={cat.img} className='card-img-top' alt={cat.title} />
                </div>
                <div className='card-body'>
                  <h5 className='card-title m-0'>
                    <Link to={`/category/${cat.id}`} className='stretched-link'>
                      {cat.title}
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
