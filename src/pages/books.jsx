import React from 'react';
import { Link } from 'react-router-dom';
import { FaCog, FaSearch } from 'react-icons/fa';
import Banner from '../components/Banner';
import SingleBook from '../components/SingleBook';
import { BOOKS } from '../api/Localhost';

function Books() {
  const book_list = () => {
    return BOOKS.map((book) => {
      return <SingleBook book={book} key={book.id} col={4} />;
    });
  };

  const category_list = () => {
    const CATEGORY = [
      { label: 'Action', count: 12 },
      { label: 'Art', count: 3 },
      { label: 'Best Sellers', count: 12 },
      { label: 'Design', count: 2 },
      { label: 'Fantasy', count: 5 },
      { label: 'History', count: 1 },
      { label: 'Home', count: 7 },
      { label: 'Love Stories', count: 8 },
      { label: 'New', count: 20 },
    ];
    return (
      <ul className='list-unstyled'>
        {CATEGORY.map((cat) => {
          return (
            <li className='special-small-title my-2' key={cat.label}>
              <Link to='/'>
                {cat.label}
                <small className='text-muted'>({cat.count})</small>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  const top_five_of_week = () => {
    const TOP_5 = [
      {
        title: 'Master Hamster Trip',
        img: 'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-1.jpg',
      },
      {
        title: 'Master Hamster Trip',
        img: 'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-2.jpg',
      },
      {
        title: 'Master Hamster Trip',
        img: 'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-3.jpg',
      },
      {
        title: 'Master Hamster Trip',
        img: 'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-4.jpg',
      },
      {
        title: 'Master Hamster Trip',
        img: 'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/books/img/img-5.jpg',
      },
    ];
    return TOP_5.map((book, index) => {
      return (
        <Link to='' key={index}>
          <img
            src={book.img}
            alt={book.title}
            className='m-1 img-fluid d-inline-block'
            width={50}
            height={120}
          />
        </Link>
      );
    });
  };

  return (
    <>
      <Banner title='shop list' subtitle='products' />
      <section className='py-5 my-5'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9 my-3'>
              <section className='mb-3'>
                <form className='row g-3' action='/books'>
                  <div className='col-md-8'>
                    <label htmlFor='search-query' className='visually-hidden'>
                      search
                    </label>
                    <input
                      type='search'
                      className='form-control'
                      id='search-query'
                      placeholder='Search'
                      name='query'
                    />
                  </div>
                  <div className='col-auto'>
                    <button type='submit' className='btn btn-aurora mb-3'>
                      <FaSearch /> Search
                    </button>
                  </div>
                  <div className='col-auto ms-auto'>
                    <button
                      type='button'
                      className='btn btn-outline-aurora mb-3'
                      data-bs-toggle='collapse'
                      data-bs-target='#filter-collapse'
                      aria-expanded='false'
                      aria-controls='filter-collapse'
                    >
                      <FaCog /> Filters
                    </button>
                  </div>
                  <div className='col-12'>
                    <div className='collapse' id='filter-collapse'>
                      <div className='card card-body'>
                        <div className='row g-3'>
                          <div className='col-md-6 my-3'>
                            <div className='d-flex justify-content-between'>
                              <label
                                htmlFor='start-price-filter-range'
                                className='form-label'
                              >
                                start price range
                              </label>
                              <span>10</span>
                            </div>
                            <input
                              type='range'
                              className='form-range'
                              id='start-price-filter-range'
                            />
                          </div>
                          <div className='col-md-6 my-3'>
                            <div className='d-flex justify-content-between'>
                              <label
                                htmlFor='end-price-filter-range'
                                className='form-label'
                              >
                                end price range
                              </label>
                              <span>10</span>
                            </div>
                            <input
                              type='range'
                              className='form-range'
                              id='end-price-filter-range'
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </section>
              <div className='filter-results d-md-flex justify-content-between align-items-center mb-4'>
                <span className='text-muted'> Showing 1-12 of 53 results </span>
                <div className=''>
                  <select
                    className='form-select w-auto'
                    aria-label='choose sort type'
                    defaultValue={'sort'}
                  >
                    <option value='choose sort type'>choose sort type</option>
                    <option value={'popular'}>sort by popularity</option>
                    <option value={'latest'}>sort by latest</option>
                    <option value={'rating'}>sort by average rating</option>
                    <option value={'price-asc'}>
                      sort by price low to height
                    </option>
                    <option value={'price-desc'}>
                      sort by price height to low
                    </option>
                  </select>
                </div>
              </div>
              <div className='row justify-content-center align-items-center'>
                {book_list()}
              </div>
            </div>
            <div className='col-lg-3 my-3'>
              <div className='ms-lg-3'>
                <section className='category-section'>
                  <h4 className='mb-3'>categories</h4>
                  {category_list()}
                </section>
                <section className='top-five-section mt-4'>
                  <h4 className='mb-3'>Top 5 of the week</h4>
                  {top_five_of_week()}
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Books;
