import React, { useState, useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaCog, FaSearch } from 'react-icons/fa';
import SingleBook from '../components/SingleBook';
import StarRate from '../components/StarRate';
import { BOOKS, BooksAPI } from '../api/Localhost';
import useJsonServerToast from '../context/IsJsonServerDown';
import RightSidebar from '../components/layout/RightSidebar';
import Pagination from '../components/Pagination';

const INIT_FORM_DATA = {
  title: '',
  author: '',
  query: '',
  sort: '',
  startPrice: 1,
  endPrice: null,
  stars: 0,
};

function Books() {
  const LIMIT = 9;
  const is_jsonServer_down = useContext(useJsonServerToast);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const [books, setBooks] = useState(BOOKS);
  const [formData, setFormData] = useState(INIT_FORM_DATA);
  const [paginationHeaderSting, setPaginationHeaderSting] = useState('');

  useEffect(() => {
    if (is_jsonServer_down) {
      setBooks(BOOKS);
    } else {
      api_get_books(`?${searchParams.toString()}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [is_jsonServer_down]);

  useEffect(() => {
    if (pageNumber !== parseInt(searchParams.get('_page'))) {
      let search_params_str = `?${searchParams.toString()}`;
      search_params_str = search_params_str
        .replace('title', 'title_like')
        .replace('author', 'author.name_like')
        .replace('startPrice', 'price_gte')
        .replace('query', 'q')
        .replace('price-desc', 'price&order=desc')
        .replace('endPrice', 'price_lte');
      api_get_books(`${search_params_str}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const api_get_books = async (url) => {
    await BooksAPI.get(url)
      .then((response) => {
        setBooks(response.data);
        if (response.headers.link) {
          setPaginationHeaderSting(response.headers.link);
        } else {
          setPaginationHeaderSting('');
        }
      })
      .catch((error) => {
        setBooks(BOOKS);
      });
  };

  const BookList = () => {
    let book_list = books.map((book) => {
      return <SingleBook book={book} key={book.id} col={4} />;
    });

    return (
      <div className='row justify-content-center align-items-stretch'>
        {book_list}
      </div>
    );
  };

  const SelectType = () => {
    const SELECT_TYPES = [
      {
        label: 'choose sort type',
        value: 'choose sort type',
      },
      {
        label: 'sort by popularity',
        value: 'reviews',
      },
      {
        label: 'sort by latest',
        value: 'date',
      },
      {
        label: 'sort by average rating',
        value: 'stars',
      },
      {
        label: 'sort by price low to height',
        value: 'price',
      },
      {
        label: 'sort by price height to low',
        value: 'price-desc',
      },
    ];
    return (
      <div className=''>
        <select
          className='form-select w-auto'
          aria-label='choose sort type'
          defaultValue={formData['sort']}
          name='sort'
          onChange={onInputChange}
        >
          {SELECT_TYPES.map((item) => {
            return (
              <option value={item.value} key={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    const new_search_query = new URLSearchParams();
    for (const key in formData) {
      if (Object.hasOwnProperty.call(formData, key)) {
        if (formData[key] !== INIT_FORM_DATA[key]) {
          new_search_query.set(key, formData[key]);
        }
      }
    }
    new_search_query.set('_page', pageNumber.toString());
    new_search_query.set('_limit', LIMIT.toString());

    let search_params_str = `?${new_search_query.toString()}`;
    search_params_str = search_params_str
      .replace('title', 'title_like')
      .replace('author', 'author.name_like')
      .replace('startPrice', 'price_gte')
      .replace('query', 'q')
      .replace('price-desc', 'price&order=desc')
      .replace('endPrice', 'price_lte');
    setSearchParams(search_params_str);
    api_get_books(search_params_str);
  };

  const onStarNumberChange = (star_number) => {
    setFormData({ ...formData, stars: star_number });
  };

  const onInputChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const onClearFilterClick = () => {
    setFormData(INIT_FORM_DATA);
    setSearchParams({});
    setPageNumber(1);
  };

  return (
    <>
      <RightSidebar title='shop list' subtitle='products'>
        <section className='mb-3'>
          <form className='row g-3' action='/books' onSubmit={onFormSubmit}>
            <div className='col-md-8'>
              <label htmlFor='search-book-query' className='visually-hidden'>
                Search by Book Title
              </label>
              <input
                type='search'
                className='form-control'
                id='search-book-query'
                placeholder='Search by Book Title'
                name='title'
                value={formData['title']}
                onChange={onInputChange}
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
                    <div className='col-md-6 my-3'>
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
                        name='author'
                        value={formData['author']}
                        onChange={onInputChange}
                      />
                    </div>
                    <div className='col-md-6 my-3'>
                      <label
                        htmlFor='search-by-text'
                        className='visually-hidden'
                      >
                        Search by any text
                      </label>
                      <input
                        type='search'
                        className='form-control'
                        id='search-by-text'
                        placeholder='Search by any text'
                        name='query'
                        value={formData['query']}
                        onChange={onInputChange}
                      />
                    </div>
                    <div className='col-md-6 my-3'>
                      <div className='d-flex justify-content-between'>
                        <label
                          htmlFor='start-price-filter-range'
                          className='form-label'
                        >
                          start price range
                        </label>
                        <span>
                          {formData['startPrice'] !== null
                            ? formData['startPrice']
                            : 'not set'}
                        </span>
                      </div>
                      <input
                        type='range'
                        name='startPrice'
                        className='form-range'
                        id='start-price-filter-range'
                        min={1}
                        max={1000}
                        onChange={onInputChange}
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
                        <span>
                          {formData['endPrice'] !== null
                            ? formData['endPrice']
                            : 'not set'}
                        </span>
                      </div>
                      <input
                        type='range'
                        className='form-range'
                        id='end-price-filter-range'
                        min={formData['startPrice']}
                        name='endPrice'
                        max={2000}
                        onChange={onInputChange}
                      />
                    </div>
                    <div className='col-md-4 my-3'>
                      <StarRate
                        onClick={onStarNumberChange}
                        length={formData['stars']}
                      />
                    </div>
                    <div className='col-12 my-3 text-center'>
                      <button type='submit' className='btn btn-aurora'>
                        Apply Filter
                      </button>
                      <button
                        type='reset'
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
          <SelectType />
        </div>
        <BookList />
        {books.length && (
          <Pagination
            onPageNumberChange={setPageNumber}
            headerString={paginationHeaderSting}
          />
        )}
      </RightSidebar>
    </>
  );
}

export default Books;
