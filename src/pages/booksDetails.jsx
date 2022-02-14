import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa';
import 'bootstrap/js/src/tab';
import Banner from '../components/Banner';
import { BOOKS, RELATED_BOOKS } from '../api/Localhost';
import { capitalize, Stars } from '../components/ManipulateData';
import StarRating from '../components/StarRate';
import SectionTitle from '../components/SectionTitle';
import SingleBook from '../components/SingleBook';

function BooksDetails() {
  const [selectType, setSelectType] = useState('choose book type');
  const [quantityNumber, setQuantityNumber] = useState(1);
  let params = useParams(),
    current_book = {};

  BOOKS.forEach((book) => {
    if (book.id.toString() === params.id) {
      current_book = book;
    }
  });

  const onQuantityAdd = () => {
    if (quantityNumber >= 1) {
      setQuantityNumber(quantityNumber + 1);
    }
  };

  const onQuantityMinus = () => {
    if (quantityNumber > 1) {
      setQuantityNumber(quantityNumber - 1);
    }
  };

  const quantity_controls = () => {
    return (
      <div className='d-flex align-items-center qty-container'>
        <button className='btn-qty btn-qty-down' onClick={onQuantityAdd}>
          <FaPlus />
        </button>
        <input
          className='form-qty'
          type='number'
          name='quantity'
          value={quantityNumber}
          onChange={(e) => setQuantityNumber(parseInt(e.target.value, 10))}
        />
        <button className='btn-qty btn-qty-up' onClick={onQuantityMinus}>
          <FaMinus />
        </button>
      </div>
    );
  };

  const category_list = () => {
    return current_book.category.map((category) => {
      return (
        <React.Fragment key={category}>
          <Link to=''>{category}</Link>
          {`  `}
        </React.Fragment>
      );
    });
  };

  const image_side = () => {
    return (
      <div className='col-md-4 my-3'>
        <div className='img-container'>
          <img
            src={current_book.img}
            alt={current_book.title}
            className='img-fluid'
          />
        </div>
      </div>
    );
  };

  const snippet_details = () => {
    return (
      <>
        <p className='special-small-title m-0'>author: {current_book.author}</p>
        <small className='special-small-title text-muted'>
          publisher: {current_book.publisher}
        </small>
        <h1 className='h2 mb-2'>{current_book.title}</h1>
        <div className='d-flex align-items-end'>
          {<Stars stars_length={current_book.stars} />}
          <a
            className='small mx-4 text-muted special-small-title'
            href='#reviews'
          >
            (1 customer reviews)
          </a>
        </div>
        <p className='mt-2 h4'>{current_book.price}$</p>
        <p className='mt-3 text-muted'>{current_book.short_info}</p>
      </>
    );
  };

  const book_types = () => {
    return (
      <select
        className='form-select w-auto'
        aria-label='choose book type'
        defaultValue={selectType}
        onChange={(e) => setSelectType(e.target.value)}
      >
        <option value='choose book type'>choose book type</option>
        {current_book.types.map((type) => {
          return (
            <option value={type} key={type}>
              {type}
            </option>
          );
        })}
      </select>
    );
  };

  const author_snippet = () => {
    return (
      <div className='author-section mt-5'>
        <div className='d-flex align-items-center'>
          <img
            src={
              'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/authors/img/avatar-1.png'
            }
            alt={current_book.author}
            width='100'
            height='100'
            className='img-fluid rounded-circle border-aurora p-1'
          />
          <div className=' mx-3'>
            <h4 className='mb-1'>
              <Link to=''>{current_book.author}</Link>
            </h4>
            <p className='m-0'>some text about author here</p>
          </div>
        </div>
      </div>
    );
  };

  const book_details_side = () => {
    return (
      <div className='col-md-8 my-3'>
        <div className='wrapper'>
          {snippet_details()}
          {book_types()}
          <div className='d-flex mt-3'>
            {quantity_controls()}
            <button className='btn btn-aurora mx-4'>Add To Cart</button>
          </div>
          <div className='mt-3'>category: {category_list()}</div>
          {author_snippet()}
        </div>
      </div>
    );
  };

  const additional_information_table = () => {
    return (
      <div className='table-responsive'>
        <table className='table table-bordered'>
          <tbody>
            <tr>
              <th scope='row'>language</th>
              <td>{current_book.language}</td>
            </tr>
            <tr>
              <th scope='row'>pages</th>
              <td>{current_book.pages}</td>
            </tr>
            <tr>
              <th scope='row'>pdf Size</th>
              <td>{current_book.pdfSize} MB</td>
            </tr>
            <tr>
              <th scope='row'>published date</th>
              <td>{current_book.publishedAt}</td>
            </tr>
            <tr>
              <th scope='row'>types</th>
              <td>{current_book.types.toString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const leave_review = () => {
    return (
      <div className='row justify-content-center mt-5'>
        <div className='col-md-8'>
          <div className='let-comments'>
            <div className='d-flex justify-content-between'>
              <h2 className='mb-3'>Add a review</h2>
              <div className='text-warning'>
                <StarRating />
              </div>
            </div>
            <form action=''>
              <div className='mb-3'>
                <label
                  htmlFor='comment-username-id'
                  className='form-label d-none'
                >
                  username
                </label>
                <input
                  type='text'
                  className='form-control'
                  id='comment-username-id'
                  placeholder='Username'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='comment-email-id' className='form-label d-none'>
                  Email address
                </label>
                <input
                  type='email'
                  className='form-control'
                  id='comment-email-id'
                  placeholder='Email'
                />
              </div>
              <div className='mb-3'>
                <label
                  htmlFor='comment-text-area-id'
                  className='form-label d-none'
                >
                  Comment
                </label>
                <textarea
                  className='form-control'
                  id='comment-text-area-id'
                  rows={3}
                  placeholder='Comment'
                ></textarea>
              </div>
              <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  role='switch'
                  id='save-data-id'
                />
                <label
                  className='form-check-label text-muted small'
                  htmlFor='save-data-id'
                >
                  Save my name, email for next time I comment.
                </label>
              </div>
              <button type='submit' className='btn btn-aurora mt-4'>
                Save Review
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const additional_information_reviews = () => {
    return (
      <>
        <div className='reviews-section mt-5'>
          <div className='d-md-flex align-items-center'>
            <img
              src={
                'https://cdn.jsdelivr.net/gh/Mohammed-Taysser/rakm1@master/paperCuts/authors/img/avatar-1.png'
              }
              alt={current_book.author}
              width='100'
              height='100'
              className='img-fluid rounded-circle border-aurora p-1'
            />
            <div className='w-100 mx-3'>
              <div className='d-md-flex justify-content-between'>
                <div className=''>
                  <Link to='' className='mb-1 h4'>
                    {current_book.author}
                  </Link>
                  <small className='special-small-title text-muted mx-md-3 d-block d-md-inline-block'>
                    August 12, 2019
                  </small>
                </div>
                <div className=''>
                  <Stars />
                </div>
              </div>
              <p className='mb-0 mt-2 text-muted'>
                whether governments can and should counteract increasing
                childlessness, how the phenomenon differs across social strata
                and the role economic uncertainties play important demographic
                and sociological trend.
              </p>
            </div>
          </div>
        </div>
        {leave_review()}
      </>
    );
  };

  const BOOK_DETAILS_TABS = [
    {
      label: 'description',
      children: <p className='text-muted m-0'>{current_book.info}</p>,
    },
    {
      label: 'additional information',
      children: additional_information_table(),
    },
    { label: 'reviews', children: additional_information_reviews() },
  ];

  const book_details_nav = () => {
    return (
      <ul
        className='nav nav-pills justify-content-center'
        id='additional-details-tabs'
        role='tablist'
      >
        {BOOK_DETAILS_TABS.map((tap, index) => {
          return (
            <li className='nav-item' role='presentation' key={index}>
              <button
                className={`nav-link ${index === 0 ? 'active' : ''}`}
                id={`${tap.label.replace(' ', '-')}-tap`}
                data-bs-toggle='pill'
                data-bs-target={`#${tap.label.replace(' ', '-')}-container`}
                type='button'
                role='tab'
                aria-controls={`${tap.label.replace(' ', '-')}-container`}
                aria-selected='true'
              >
                {capitalize(tap.label)}
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  const book_details_content = () => {
    return (
      <div className='tab-content' id='additional-details-tabsContent'>
        {BOOK_DETAILS_TABS.map((tap, index) => {
          return (
            <div
              className={`tab-pane fade ${index === 0 ? 'active show' : ''}`}
              id={`${tap.label.replace(' ', '-')}-container`}
              role='tabpanel'
              key={index}
              aria-labelledby={`${tap.label.replace(' ', '-')}-tap`}
            >
              <div className='row justify-content-center'>
                <div className='col-md-10'>
                  <div className='content p-1 mt-3'>{tap.children}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const related_products = () => {
    return RELATED_BOOKS.map((book) => {
      return <SingleBook book={book} key={book.id} />;
    });
  };

  return (
    <>
      <Banner title={current_book.title} subtitle='products' />
      <section className='book-details-page my-5'>
        <div className='container'>
          <div className='row justify-content-center'>
            {image_side()} {book_details_side()}
          </div>
          <div className='additional-details my-5'>
            {book_details_nav()}
            {book_details_content()}
          </div>
        </div>
      </section>
      <section className='related-books my-5 pt-4'>
        <div className='container'>
          <SectionTitle title='related products' subtitle='you may like' />
          <div className='row justify-content-center'>{related_products()}</div>
        </div>
      </section>
    </>
  );
}

export default BooksDetails;
