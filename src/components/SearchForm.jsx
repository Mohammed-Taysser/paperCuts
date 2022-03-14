import React, { useState } from 'react';
import { FaCog, FaSearch } from 'react-icons/fa';
import StarRate from '../components/StarRate';

function SearchForm(props) {
  const { books, setFilteredBooks, filteredBooks } = props;

  const initData = () => {
    let temp_max_price = [],
      temp_min_price = [];
    filteredBooks.forEach((book) => {
      temp_max_price.push(book.price);
      temp_min_price.push(book.price);
    });
    let minPrice = Math.max(...new Set(temp_max_price)),
      maxPrice = Math.min(...new Set(temp_min_price));
    return { minPrice, maxPrice };
  };

  const { MIN_PRICE, MAX_PRICE } = initData();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    sort: '',
    startPrice: null,
    endPrice: null,
    stars: 0,
  });

  const SelectType = () => {
    const SELECT_TYPES = [
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
          onChange={onSelectChange}
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
    let new_book = books;
    evt.preventDefault();
    if (formData['stars'] > 0) {
      new_book = new_book.filter((book) => book.stars === formData['stars']);
    }
    if (formData['startPrice'] !== null) {
      new_book = new_book.filter(
        (book) => book.price >= parseFloat(formData['startPrice'])
      );
    }
    if (formData['endPrice'] !== null) {
      new_book = new_book.filter(
        (book) => book.price <= parseFloat(formData['endPrice'])
      );
    }
    if (formData['title'] !== '') {
      new_book = new_book.filter(
        (book) => book.title.search(formData['title']) !== -1
      );
    }
    if (formData['author'] !== '') {
      new_book = new_book.filter(
        (book) => book.author.name.search(formData['author']) !== -1
      );
    }

    setFilteredBooks(new_book);
  };

  const onStarNumberChange = (star_number) => {
    setFormData({ ...formData, stars: star_number });
  };

  const onInputChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const onSelectChange = (evt) => {
    let new_book = filteredBooks,
      sort_value = evt.target.value,
      sort_function = null;
    switch (sort_value) {
      case 'price':
        sort_function = (a, b) => a.price > b.price;
        break;
      case 'reviews':
        sort_function = (a, b) => a.reviews.length > b.reviews.length;
        break;
      case 'price-desc':
        sort_function = (a, b) => a.price < b.price;
        break;
      case 'stars':
        sort_function = (a, b) => a.stars < b.stars;
        break;
      case 'date':
      default:
        sort_function = (a, b) => {
          let a_date = new Date(a.date),
            b_date = new Date(b.date);
          return a_date.getTime() > b_date.getTime();
        };
        break;
    }
    new_book.sort(sort_function);

    setFormData({ ...formData, [evt.target.name]: sort_value });
    setFilteredBooks([...new_book]);
  };

  return (
    <>
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
                    <StarRate
                      onClick={onStarNumberChange}
                      length={formData['stars']}
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
                      min={MIN_PRICE}
                      max={MAX_PRICE}
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
                      min={MIN_PRICE}
                      name='endPrice'
                      max={MAX_PRICE}
                      onChange={onInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
      <div className='filter-results d-md-flex justify-content-between align-items-center mb-4'>
        <span className='text-muted'>
          Showing <span className='text-aurora'> {filteredBooks.length} </span>
          results
        </span>
        <SelectType />
      </div>
    </>
  );
}

export default SearchForm;
