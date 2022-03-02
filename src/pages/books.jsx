import React, { useState, useContext, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCog, FaSearch } from 'react-icons/fa';
import Banner from '../components/Banner';
import SingleBook from '../components/SingleBook';
import StarRate from '../components/StarRate';
import { BOOKS, BooksAPI, CATEGORY, TOP_FIVE } from '../api/Localhost';
import useJsonServerToast from '../context/IsJsonServerDown';

function Books() {
  const LIMIT = 9;
  const is_jsonServer_down = useContext(useJsonServerToast);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const [categories, setCategories] = useState(CATEGORY);
  const [books, setBooks] = useState(BOOKS);
  const [topFive, setTopFive] = useState(TOP_FIVE);

  const [authorSearch, setAuthorSearch] = useState('');
  const [titleSearch, setTitleSearch] = useState('');
  const [sortType, setSortType] = useState('choose sort type');
  const [startPriceRange, setStartPriceRange] = useState(1);
  const [endPriceRange, setEndPriceRange] = useState(null);
  const [starsNumber, setStarsNumber] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationLinkObject, setPaginationLinkObject] = useState('');
  const [paginationObject, setPaginationObject] = useState({});

  useEffect(() => {
    if (is_jsonServer_down) {
      setBooks(BOOKS);
      setCategories(CATEGORY);
      setTopFive(TOP_FIVE);
    } else {
      api_get_books(`?_limit=${LIMIT}&_page=${currentPageNumber}`);
    }
  }, [is_jsonServer_down]);

  useEffect(() => {
    if (paginationLinkObject) {
      let temp = paginationLinkObject.split(',').map((item) => item.split(';'));
      let factor_data_params = {};
      temp.forEach((item) => {
        if (item.length > 1) {
          let get_page_number = new URLSearchParams(item[0].slice(2, -1));
          factor_data_params[item[1].slice(6, -1)] =
            get_page_number.get('_page');
        }
      });
      setPaginationObject(factor_data_params);
    }
  }, [paginationLinkObject]);

  useEffect(() => {
    api_get_books(
      `?${searchParams.toString()}&_limit=${LIMIT}&_page=${currentPageNumber}`
    );
  }, [currentPageNumber]);

  const api_get_books = async (url) => {
    await BooksAPI.get(url)
      .then((response) => {
        // handle success
        setBooks(response.data);
        setPaginationLinkObject(response.headers.link);
      })
      .catch((error) => {
        // handle error
        setBooks(BOOKS);
        setCategories(CATEGORY);
        setTopFive(TOP_FIVE);
      });
  };

  const book_list = () => {
    return books.map((book) => {
      return (
        <SingleBook
          book={{
            id: book.id,
            title: book.title,
            img: book.img,
            author: book.author.name,
            price: book.price,
            stars: book.stars,
          }}
          key={book.id}
          col={4}
        />
      );
    });
  };

  const category_list = () => {
    return (
      <ul className='list-unstyled'>
        {categories.map((cat, index) => {
          return (
            <li className='special-small-title my-2' key={index}>
              <Link to={`/category/${cat.id}`}>
                {cat.title}
                <small className='text-muted'>({cat.books.length})</small>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  const top_five_of_week = () => {
    return topFive.map((book, index) => {
      return (
        <Link to={`/books/${book.id}`} key={index}>
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

  const select_type = () => {
    const select_types = [
      {
        label: 'choose sort type',
        value: '',
      },
      {
        label: 'sort by popularity',
        value: 'reviews',
      },
      {
        label: 'sort by latest',
        value: 'publishedAt',
      },
      {
        label: 'sort by average rating',
        value: 'stars',
      },
      // {
      //   label: 'sort by price low to height',
      //   value: 'price',
      // },
      // {
      //   label: 'sort by price height to low',
      //   value: 'price-desc',
      // },
    ];
    return (
      <select
        className='form-select w-auto'
        aria-label='choose sort type'
        defaultValue={sortType}
        name='_sort'
        onChange={(e) => {
          onInputChange(e, setSortType);
        }}
      >
        {select_types.map((item) => {
          return (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    );
  };

  const onFiltersFormSubmit = (evt) => {
    evt.preventDefault();
    const all_search_query = new URLSearchParams();
    searchParams.forEach((value, key) => {
      all_search_query.set(key, value);
    });
    setSearchParams(all_search_query);
    api_get_books(
      `?${searchParams.toString()}&_limit=${LIMIT}&_page=${currentPageNumber}`
    );
  };

  const onStarNumberChange = (star_number) => {
    setStarsNumber(star_number);
    searchParams.set('stars', star_number);
  };

  const onInputChange = (evt, set_function) => {
    let input_value = evt.target.value;
    set_function(input_value);
    searchParams.set(evt.target.name, input_value);
  };

  const onClearFilterClick = () => {
    setTitleSearch('');
    setAuthorSearch('');
    setSortType('choose sort type');
    setStartPriceRange(1);
    setEndPriceRange(null);
    setStarsNumber(null);
    setSearchParams({});
    setCurrentPageNumber(1);
  };

  const get_pagination = () => {
    return (
      books.length >= LIMIT && (
        <nav aria-label='Page navigation example'>
          <ul className='pagination justify-content-center'>
            {paginationObject.prev && (
              <li className='page-item'>
                <button
                  className='page-link'
                  onClick={(e) => setCurrentPageNumber(paginationObject.prev)}
                >
                  Previous
                </button>
              </li>
            )}
            <li className='page-item disabled'>
              <button className='page-link'>
                page {currentPageNumber} of {paginationObject.last}
              </button>
            </li>
            {paginationObject.next && (
              <li className='page-item'>
                <button
                  className='page-link'
                  onClick={(e) => setCurrentPageNumber(paginationObject.next)}
                >
                  Next
                </button>
              </li>
            )}
          </ul>
        </nav>
      )
    );
  };

  return (
    <>
      <Banner title='shop list' subtitle='products' />
      <section className='py-5 my-5'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-9 my-3'>
              <section className='mb-3'>
                <form
                  className='row g-3'
                  action='/books'
                  onSubmit={onFiltersFormSubmit}
                >
                  <div className='col-md-8'>
                    <label
                      htmlFor='search-book-query'
                      className='visually-hidden'
                    >
                      Search by Book Title
                    </label>
                    <input
                      type='search'
                      className='form-control'
                      id='search-book-query'
                      placeholder='Search by Book Title'
                      name='title_like'
                      value={titleSearch}
                      onChange={(e) => {
                        onInputChange(e, setTitleSearch);
                      }}
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
                        <div className='row g-3 justify-content-center align-items-center'>
                          <div className='col-md-4 my-3'>
                            <label
                              htmlFor='search-by-author'
                              className='visually-hidden'
                            >
                              Search by Book Author
                            </label>
                            <input
                              type='search'
                              className='form-control'
                              id='search-by-author'
                              placeholder='Search by Book Author'
                              name='author.name_like'
                              value={authorSearch}
                              onChange={(e) => {
                                onInputChange(e, setAuthorSearch);
                              }}
                            />
                          </div>
                          <div className='col-md-4 my-3'>
                            <div className='d-flex justify-content-between'>
                              <label
                                htmlFor='start-price-filter-range'
                                className='form-label'
                              >
                                start price range
                              </label>
                              <span>
                                {startPriceRange !== null
                                  ? startPriceRange
                                  : 'not set'}
                              </span>
                            </div>
                            <input
                              type='range'
                              name='price_gte'
                              className='form-range'
                              id='start-price-filter-range'
                              min={1}
                              max={1000}
                              onChange={(e) => {
                                onInputChange(e, setStartPriceRange);
                              }}
                            />
                          </div>
                          <div className='col-md-4 my-3'>
                            <div className='d-flex justify-content-between'>
                              <label
                                htmlFor='end-price-filter-range'
                                className='form-label'
                              >
                                end price range
                              </label>
                              <span>
                                {endPriceRange !== null
                                  ? endPriceRange
                                  : 'not set'}
                              </span>
                            </div>
                            <input
                              type='range'
                              className='form-range'
                              id='end-price-filter-range'
                              min={1}
                              name='price_lte'
                              max={1000}
                              onChange={(e) => {
                                onInputChange(e, setEndPriceRange);
                              }}
                            />
                          </div>
                          <div className='col-md-4 my-3'>
                            <StarRate
                              onClick={onStarNumberChange}
                              length={starsNumber}
                            />
                          </div>
                          <div className='col-12 my-3 text-center'>
                            <button
                              className='btn btn-aurora'
                              onClick={onFiltersFormSubmit}
                            >
                              Apply Filter
                            </button>
                            <button
                              className='btn btn-outline-danger mx-3'
                              onClick={onClearFilterClick}
                            >
                              Clear Filters
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </section>
              <div className='filter-results d-md-flex justify-content-between align-items-center mb-4'>
                <span className='text-muted'>
                  Showing <span className='text-aurora'> {books.length} </span>
                  results
                </span>
                <div className=''>{select_type()}</div>
              </div>
              <div className='row justify-content-center align-items-stretch'>
                {book_list()}
              </div>
              <div className='mt-5'>{get_pagination()}</div>
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
