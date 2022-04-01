import React, { useEffect, useState } from 'react';
import { FaCog, FaSearch } from 'react-icons/fa';
import { InputField } from './bootstrap/Form';
import StarRate from './StarRate';

function SearchForm(props) {
  const { onSearchParamsChange, searchParams } = props;
  const [initData, setInitData] = useState({
    title: searchParams.get('title') || '',
    sort: searchParams.get('sort') || '',
    stars: searchParams.get('stars') || 1,
    author: searchParams.get('author') || '',
    startPrice: searchParams.get('startPrice') || null,
    endPrice: searchParams.get('endPrice') || null,
  });
  const [formData, setFormData] = useState({});
  const [debouncedFormData, setDebouncedFormData] = useState({});

  useEffect(() => {
    initFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedFormData(formData);
    }, 1000);
    return () => {
      clearTimeout(timerId);
    };
  }, [formData]);

  useEffect(() => {
    if (Object.keys(debouncedFormData).length > 0) {
      onSearchParamsChange(debouncedFormData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedFormData]);

  const initFormData = () => {
    let init_data = {};
    if (searchParams.get('title')) {
      init_data['title'] = searchParams.get('title');
    }
    if (searchParams.get('author')) {
      init_data['author'] = searchParams.get('author');
    }
    if (searchParams.get('stars')) {
      init_data['stars'] = searchParams.get('stars');
    }
    if (searchParams.get('endPrice')) {
      init_data['endPrice'] = searchParams.get('endPrice');
    }
    if (searchParams.get('startPrice')) {
      init_data['startPrice'] = searchParams.get('startPrice');
    }
    setFormData(init_data);
  };

  const onStarNumberChange = (star_number) => {
    setFormData({ ...formData, stars: star_number });
    setInitData({ ...initData, stars: star_number });
  };

  const onInputChange = (evt) => {
    setInitData({ ...initData, [evt.target.name]: evt.target.value });

    let newFormData = { ...formData, [evt.target.name]: evt.target.value };
    if (evt.target.value === '') {
      delete newFormData[evt.target.name];
    }
    setFormData(newFormData);
  };

  const onClearFilterClick = () => {
    setFormData({});
    setInitData({
      title: '',
      sort: '',
      stars: 1,
      author: '',
      startPrice: null,
      endPrice: null,
    });
    setDebouncedFormData({});
    onSearchParamsChange({});
  };
  const onFormSubmit = (evt) => {
    evt.preventDefault();
    setDebouncedFormData(formData);
  };

  return (
    <section className='mb-3'>
      <form className='row g-3' action='/books' onSubmit={onFormSubmit}>
        <InputField
          outer='col-md-8'
          id='search-book-query'
          label='search by book title'
          labelClassName='visually-hidden'
          placeholder='Search by Book Title'
          name='title'
          value={initData['title']}
          onChange={onInputChange}
        />

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
                <InputField
                  outer='col-md-6 my-3'
                  id='search-by-author'
                  label='Search by Book Author'
                  labelClassName='visually-hidden'
                  placeholder='Search by Book Author'
                  name='author'
                  value={initData['author']}
                  onChange={onInputChange}
                />

                <div className='col-md-6 my-3'>
                  <StarRate
                    onClick={onStarNumberChange}
                    length={initData['stars']}
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
                    <small>
                      {initData['startPrice'] !== null
                        ? initData['startPrice']
                        : 'not set'}
                    </small>
                  </div>
                  <input
                    type='range'
                    name='startPrice'
                    className='form-range'
                    id='start-price-filter-range'
                    min={0}
                    max={100}
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
                    <small>
                      {initData['endPrice'] !== null
                        ? initData['endPrice']
                        : 'not set'}
                    </small>
                  </div>
                  <input
                    type='range'
                    className='form-range'
                    id='end-price-filter-range'
                    min={0}
                    name='endPrice'
                    max={100}
                    onChange={onInputChange}
                  />
                </div>
                <div className='col-12 my-3'>
                  <button
                    className='btn btn-outline-danger'
                    type='button'
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
  );
}

export default SearchForm;
